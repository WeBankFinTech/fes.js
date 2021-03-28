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

export default () => defer.promise;

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
        const slaveRuntime = getSlaveRuntime();
        if (slaveRuntime.bootstrap) {
            await slaveRuntime.bootstrap(props);
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
        if (cacheAppPromise) {
            const app = await cacheAppPromise;
            app.unmount();
        }
        const slaveRuntime = getSlaveRuntime();
        if (slaveRuntime.unmount) {
            await slaveRuntime.unmount(props);
        }
    };
}
