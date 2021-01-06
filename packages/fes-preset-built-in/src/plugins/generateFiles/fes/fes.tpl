{{{ importsAhead }}}
import {
    createApp,
    reactive,
    defineComponent
} from 'vue';
import { plugin } from './core/plugin';
import './core/pluginRegister';
import { ApplyPluginsType } from '{{{ runtimePath }}}';
import { getRoutes } from './core/routes/routes';

{{{ imports }}}

{{{ entryCodeAhead }}}

const renderClient = (opts = {}) => {
    const { plugin, routes, rootElement, initialState } = opts;
    const rootContainer = plugin.applyPlugins({
        type: ApplyPluginsType.modify,
        key: 'rootContainer',
        initialValue: defineComponent(() => () => (<RouterView></RouterView>)),
        args: {
            routes: routes,
            plugin: plugin
        }
    });

    const app = createApp(rootContainer);
    app.provide("initialState", initialState);
    
    plugin.applyPlugins({
        key: 'onAppCreated',
        type: ApplyPluginsType.event,
        args: { app },
    });

    if (rootElement) {
        app.mount(rootElement);
    }
    return app;
}

const getClientRender = (args = {}) => plugin.applyPlugins({
  key: 'render',
  type: ApplyPluginsType.compose,
  initialValue: () => {
    const opts = plugin.applyPlugins({
      key: 'modifyClientRenderOpts',
      type: ApplyPluginsType.modify,
      initialValue: {
        initialState: args.initialState,
        routes: args.routes || getRoutes(),
        plugin,
        rootElement: '{{{ rootElement }}}',
{{#enableTitle}}
        defaultTitle: `{{{ defaultTitle }}}`,
{{/enableTitle}}
      },
    });
    return renderClient(opts);
  },
  args,
});



const beforeRenderConfig = plugin.applyPlugins({
    key: "beforeRender",
    type: ApplyPluginsType.modify,
    initialValue: {
        loading: null,
        action: null
    },
});

const beforeRender = async () => {
    let initialState = {};
    if (typeof beforeRenderConfig.action === "function") {
        const app = createApp(beforeRenderConfig.loading);
        app.mount("#app");
        try {
            initialState = await beforeRenderConfig.action();
        } catch(e){
            console.error(`[fes] beforeRender执行出现异常`)
        }
        app.unmount();
    }
    return initialState;
};

const render = async () => {
    const initialState = await beforeRender();
    const clientRender = getClientRender({initialState});
    clientRender();
};

render();


{{{ entryCode }}}

