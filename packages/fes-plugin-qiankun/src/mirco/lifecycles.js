import { plugin, ApplyPluginsType } from '@@/core/coreExports';

const defer = {};
defer.promise = new Promise((resolve) => {
    defer.resolve = resolve;
});

let render = () => { };
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
export function genBootstrap(promise, oldRender) {
    return async (...args) => {
        const slaveRuntime = getSlaveRuntime();
        if (slaveRuntime.bootstrap) { await slaveRuntime.bootstrap(...args); }
        render = () => promise.then(oldRender).catch((e) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Render failed', e);
            }
        });
    };
}

// 子应用生命周期钩子Mount
export function genMount() {
    return async (...args) => {
        defer.resolve();
        const slaveRuntime = getSlaveRuntime();
        if (slaveRuntime.mount) { await slaveRuntime.mount(...args); }
        // 第一次 mount 会自动触发 render，非第一次 mount 则需手动触发
        if (hasMountedAtLeastOnce) {
            render();
        }
        hasMountedAtLeastOnce = true;
    };
}

// 子应用生命周期钩子Unmount
export function genUnmount(mountElementId, app) {
    return async (...args) => {
        const container = document.getElementById(mountElementId);
        if (container) {
            app.unmount(container);
        }
        const slaveRuntime = getSlaveRuntime();
        if (slaveRuntime.unmount) { await slaveRuntime.unmount(...args); }
    };
}
