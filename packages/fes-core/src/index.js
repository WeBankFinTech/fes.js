import {
    createApp,
    inject,
    reactive
} from 'vue';
import createRouter from './router';
import DefaultLayout from './DefaultLayout';
import { makeSymbol } from './helpers';


const __FES_PLUGIN_DATA_SYMBOL__ = makeSymbol('fes-plugin-data');
// const __FES_PLUGIN_METHOD_SYMBOL__ = makeSymbol('fes-plugin-method');

// 写入这里的方法和函数，将会通过 useFesContext 导出
// 用于共享 plugins 之间的数据和方法
const fesContext = {
    layout: DefaultLayout
};

const plugins = [];

export function addPlugin(plugin, options) {
    if (typeof plugin === 'function') {
        plugins.push([{
            install: plugin
        }, options]);
    } else {
        // TODO 非 plugin 校验
        plugins.push(plugin, options);
    }
}

const _installPlugins = (app) => {
    for (const plugin of plugins) {
        const [pluginInstance, options] = plugin;
        pluginInstance.install(app, options, fesContext);
    }
};

export function useFesContext() {
    return inject(__FES_PLUGIN_DATA_SYMBOL__);
}

export async function createFesApp(options = {}) {
    Object.assign(fesContext, options);
    const router = await createRouter(fesContext);
    // TODO dependencies plugin 实现
    const app = createApp(fesContext.layout);
    app.use(router);
    fesContext.router = router;

    _installPlugins(app);
    app.provide(__FES_PLUGIN_DATA_SYMBOL__, reactive(fesContext));
    app.mount('#app');


    return app;
}
