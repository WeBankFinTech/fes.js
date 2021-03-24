import {
    defineComponent,
    ref,
    watch,
    computed,
    onBeforeUnmount,
    onMounted,
} from "vue";
import { loadMicroApp } from "qiankun";
import mergeWith from "lodash/mergeWith";
// eslint-disable-next-line import/extensions
import { getMasterOptions } from "./masterOptions";
{{#HAS_PLUGIN_MODEL}}
import { useModel } from '@@/core/pluginExports';
{{/HAS_PLUGIN_MODEL}}
import { onBeforeRouteLeave } from "@@/core/coreExports";

let unmountPromise;
async function unmountMicroApp(microApp) {
    if (microApp) {
        if (microApp.mountPromise) {
            await microApp.mountPromise;
        }
        if (!unmountPromise) {
            unmountPromise = microApp.unmount();
        }
        return await unmountPromise;
    }
    return Promise.resolve();
}

export const MicroApp = defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        settings: Object,
        lifeCycles: Object,
        className: String,
    },
    setup(props, { attrs }) {
        const {
            masterHistoryType,
            apps = [],
            lifeCycles: globalLifeCycles,
            ...globalSettings
        } = getMasterOptions();

{{#HAS_PLUGIN_MODEL}}
        // 约定使用 src/models/qiankunStateForMicro 中的数据作为主应用透传给微应用的 props，优先级高于 propsFromConfig
        const stateForSlave = useModel('{{{qiankunStateForMicroModelNamespace}}}');
{{/HAS_PLUGIN_MODEL}}
{{^HAS_PLUGIN_MODEL}}
        const stateForSlave = reactive({});
{{/HAS_PLUGIN_MODEL}}

        // 挂载节点
        const containerRef = ref(null);
        const microAppRef = ref();
        const updatingPromiseRef = ref();
        const updatingTimestampRef = ref(Date.now());

        const appConfigRef = computed(() => {
            const appConfig = apps.find((app) => app.name === props.name);
            if (!appConfig) {
                throw new Error(
                    `[@fesjs/plugin-qiankun]: Can not find the configuration of ${props.name} app!`
                );
            }
            return appConfig;
        });

        const propsFromConfigRef = computed(() => {
            const appConfig = appConfigRef.value;
            if (appConfig) {
                return appConfig.props;
            }
            return {};
        });

        const propsFromParams = attrs;

        // 只有当name变化时才重新加载新的子应用
        const loadApp = () => {
            const appConfig = appConfigRef.value;
            const { name, entry } = appConfig;
            // 加载新的
            microAppRef.value = loadMicroApp(
                {
                    name: name,
                    entry: entry,
                    container: containerRef.value,
                    props: {
                        ...propsFromConfigRef.value,
                        ...stateForSlave,
                        ...propsFromParams,
                    },
                },
                {
                    ...globalSettings,
                    ...(props.settings || {}),
                },
                mergeWith({}, globalLifeCycles || {}, props.lifeCycles || {}, (v1, v2) =>
                    concat(v1 ?? [], v2 ?? [])
                )
            );
        };

        // 当参数变化时，update子应用
        const updateApp = () => {
            const microApp = microAppRef.value;
            if (microApp) {
                if (!updatingPromiseRef.value) {
                    // 初始化 updatingPromiseRef 为 microApp.mountPromise，从而确保后续更新是在应用 mount 完成之后
                    updatingPromiseRef.value = microApp.mountPromise;
                } else {
                    // 确保 microApp.update 调用是跟组件状态变更顺序一致的，且后一个微应用更新必须等待前一个更新完成
                    updatingPromiseRef.value = updatingPromiseRef.value.then(
                        () => {
                            const canUpdate = (app) =>
                                app?.update && app.getStatus() === "MOUNTED";
                            if (canUpdate(microApp)) {
                                if (process.env.NODE_ENV === "development") {
                                    if (
                                        Date.now() -
                                            updatingTimestampRef.value <
                                        200
                                    ) {
                                        console.warn(
                                            `[@fesjs/plugin-qiankun] It seems like microApp ${props.name} is updating too many times in a short time(200ms), you may need to do some optimization to avoid the unnecessary re-rendering.`
                                        );
                                    }

                                    console.info(
                                        `[@fesjs/plugin-qiankun] MicroApp ${props.name} is updating with props: `,
                                        props
                                    );
                                    updatingTimestampRef.value = Date.now();
                                }

                                // 返回 microApp.update 形成链式调用
                                return microApp.update({
                                    ...propsFromConfigRef.value,
                                    ...stateForSlave,
                                    ...propsFromParams,
                                });
                            }
                        }
                    );
                }
            }
        };

        onMounted(() => {
            loadApp();
        });

        onBeforeUnmount(() => {
            unmountMicroApp(microAppRef.value);
        });

        watch(appConfigRef, () => {
            unmountMicroApp(microAppRef.value);
            loadApp();
        });

        onBeforeRouteLeave(async () => {
            return await unmountMicroApp(microAppRef.value);
        });

        watch(()=>{
            return {...{}, ...propsFromConfigRef.value, ...stateForSlave, ...propsFromParams}
        }, () => {
            updateApp();
        });

        return () => <div ref={containerRef} className={props.className}></div>;
    },
});
