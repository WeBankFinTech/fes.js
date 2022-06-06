import { plugin, ApplyPluginsType } from '@@/core/coreExports';
{{#HAS_PLUGIN_MODEL}}
import { setModelState } from './qiankunModel';
{{/HAS_PLUGIN_MODEL}}

const defer = {};
defer.promise = new Promise((resolve) => {
    defer.resolve = resolve;
});

function isPromise(obj) {
    return !!obj // 有实际含义的变量才执行方法，变量null，undefined和''空串都为false
        && (typeof obj === 'object' || typeof obj === 'function') // 初始promise 或 promise.then返回的
        && typeof obj.then === 'function';
}


let render = () => {};
let cacheAppPromise = null;
let hasMountedAtLeastOnce = false;
const cache = {};

export default () => defer.promise;

export const clientRenderOptsStack = [];

export const history = {};

function getSlaveRuntime() {
    const config = plugin.applyPlugins({
        key: 'qiankun',
        type: ApplyPluginsType.modify,
        initialValue: {}
    });
    const { slave } = config;
    return slave || config;
}

// 子应用生命周期钩子Bootstrap
export function genBootstrap(oldRender, appPromise) {
    return async (props) => {
        if (typeof props !== 'undefined') {
            const slaveRuntime = getSlaveRuntime();
            if (slaveRuntime.bootstrap) {
                await slaveRuntime.bootstrap(props);
            }
        }
        render = oldRender;
        if (isPromise(appPromise)) {
            cacheAppPromise = appPromise;
        }
    };
}

// 子应用生命周期钩子Mount
export function genMount(mountElementId) {
    return async (props) => {
        // props 有值时说明应用是通过 lifecycle 被主应用唤醒的，而不是独立运行时自己 mount
        if (typeof props !== 'undefined') {
{{#HAS_PLUGIN_MODEL}}
            setModelState(props);
{{/HAS_PLUGIN_MODEL}}
            const slaveRuntime = getSlaveRuntime();
            if (slaveRuntime.mount) {
                await slaveRuntime.mount(props);
            }
             // 更新 clientRender 配置
            const clientRenderOpts = {
                // 支持通过 props 注入 container 来限定子应用 mountElementId 的查找范围
                // 避免多个子应用出现在同一主应用时出现 mount 冲突
                rootElement:
                    props?.container?.querySelector(mountElementId) || mountElementId
            };

            clientRenderOptsStack.push(clientRenderOpts);

            if(props.url){
                history.url = props.url || '/';
            }
            if(props.onRouterInit){
                history.onRouterInit = props.onRouterInit;
            }
        }

        // 第一次 mount 会自动触发 render，非第一次 mount 则需手动触发
        if (hasMountedAtLeastOnce) {
            const appPromise = render();
            if (isPromise(appPromise)) {
                cacheAppPromise = appPromise;
            }
        } else {
            defer.resolve();
        }
        hasMountedAtLeastOnce = true;
        cacheAppPromise.then((app)=>{
            if(!cache[props.name]) {
                cache[props.name] = app;
            }
        })
    };
}

export function genUpdate() {
    return async (props) => {
{{#HAS_PLUGIN_MODEL}}
        setModelState(props);
{{/HAS_PLUGIN_MODEL}}
        const slaveRuntime = await getSlaveRuntime();
        if (slaveRuntime.update) {
            await slaveRuntime.update(props);
        }
    };
}

// 子应用生命周期钩子Unmount
export function genUnmount() {
    return async (props) => {
        if (cache[props.name]) {
            setTimeout(() => {
                const app = cache[props.name];
                app.unmount();
                app._container.innerHTML = '';
                delete cache[props.name];
                cacheAppPromise = null;
            }, 0);
        }
        const slaveRuntime = getSlaveRuntime();
        if (slaveRuntime.unmount) {
            await slaveRuntime.unmount(props);
        }
    };
}
