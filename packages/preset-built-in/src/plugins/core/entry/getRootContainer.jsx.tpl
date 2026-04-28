import { defineComponent, onBeforeMount, ref, provide,  } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { getHistory } from './core/routes/routeExports';
import { plugin } from './core/plugin';
import { updateInitialState } from './initialState';
import { ApplyPluginsType } from '{{{ runtimePath }}}';

export const DefaultContainer = defineComponent({
    name: 'DefaultContainer',
    setup() {
       return () => {
            return <RouterView></RouterView>
       }
    }
})

export default function getRootContainer(_routes, _plugin) {
    return defineComponent({
        name: 'RootContainer',
        setup(props) {
            const RootContainer = plugin.applyPlugins({
                type: ApplyPluginsType.modify,
                key: 'rootContainer',
                initialValue: DefaultContainer,
                args: {
                    routes: _routes,
                    plugin: _plugin
                }
            });
            const beforeRenderConfig = plugin.applyPlugins({
                key: "beforeRender",
                type: ApplyPluginsType.modify,
                initialValue: {
                    loading: null,
                    action: null
                },
            });

            if (typeof beforeRenderConfig.action !== "function") {
                return () => <RootContainer {...props} />
            }

            const router = useRouter();

            const isLoading = ref(false);

            onBeforeMount(async () => {
                let isInit = false
                router.beforeEach(async (to, from, next) => {
                    if (isInit) {
                        return next()
                    }
                    try {
                        isInit = true
                        isLoading.value = true;
                        const _initialState = await beforeRenderConfig.action({ router });
                        updateInitialState(_initialState);
                        next();
                    } catch (e) {
                        console.error(`[fes] beforeRender执行出现异常:`);
                        console.error(e);  
                        next(false); 
                    } finally {
                        isLoading.value = false;
                    }
                })
                plugin.applyPlugins({
                    key: 'onRouterCreated',
                    type: ApplyPluginsType.event,
                    args: { router, history: getHistory() },
                });
            })

            return () => {
                if (isLoading.value) {
                    return <beforeRenderConfig.loading {...props} />
                }
                return <RootContainer {...props} />
            }
        },
    })
};

