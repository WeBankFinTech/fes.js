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

function unmountMicroApp(microApp) {
    if (microApp && microApp.mountPromise) {
        microApp.mountPromise.then(() => microApp.unmount());
    }
}

export const MicroApp = defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const {
            masterHistoryType,
            apps = [],
            lifeCycles: globalLifeCycles,
            ...globalSettings
        } = getMasterOptions();

        const {
            name,
            settings: settingsFromProps = {},
            loader,
            lifeCycles,
            className,
            ...propsFromParams
        } = props;

        const containerRef = ref(null);
        const microAppRef = ref();
        const updatingPromise = ref();
        const updatingTimestamp = ref(Date.now());

        const getAppConfig = () => {
            const appConfig = apps.find((app) => app.name === name);
            if (!appConfig) {
                throw new Error(
                    `[@fesjs/plugin-qiankun]: Can not find the configuration of ${name} app!`
                );
            }
            return appConfig;
        };

        const loadApp = () => {
            const appConfig = getAppConfig();
            const { name, entry, props: propsFromConfig = {} } = appConfig;
            // 加载新的
            microAppRef.value = loadMicroApp(
                {
                    name: name,
                    entry: entry,
                    container: containerRef.value,
                    props: { ...propsFromConfig, ...propsFromParams },
                },
                {
                    ...globalSettings,
                    ...settingsFromProps,
                },
                mergeWith({}, globalLifeCycles, lifeCycles, (v1, v2) =>
                    concat(v1 ?? [], v2 ?? [])
                )
            );
        };

        onMounted(() => {
            loadApp();
        });

        onBeforeUnmount(() => {
            unmountMicroApp(microAppRef.value);
        });

        watch(props, () => {
            unmountMicroApp(microAppRef.value);

            loadApp();
        });

        watch(microAppRef, () => {
            const microApp = microAppRef.value;
            const appConfig = getAppConfig();
            const { props: propsFromConfig = {} } = appConfig;
            if (microApp) {
                if (!updatingPromise.value) {
                    // 初始化 updatingPromise 为 microApp.mountPromise，从而确保后续更新是在应用 mount 完成之后
                    updatingPromise.value = microApp.mountPromise;
                } else {
                    // 确保 microApp.update 调用是跟组件状态变更顺序一致的，且后一个微应用更新必须等待前一个更新完成
                    updatingPromise.value = updatingPromise.value.then(() => {
                        const canUpdate = (app) =>
                            app?.update && app.getStatus() === "MOUNTED";
                        if (canUpdate(microApp)) {
                            if (process.env.NODE_ENV === "development") {
                                if (
                                    Date.now() - updatingTimestamp.value <
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
                                updatingTimestamp.value = Date.now();
                            }

                            // 返回 microApp.update 形成链式调用
                            return microApp.update({
                                ...propsFromConfig,
                                ...propsFromParams,
                            });
                        }
                    });
                }
            }
        });

        return () => <div ref={containerRef} className={className}></div>;
    },
});
