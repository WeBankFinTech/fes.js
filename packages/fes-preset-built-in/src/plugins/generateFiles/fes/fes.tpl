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
    // initialState是响应式的，后期可以更改
    app.provide("initialState", reactive(initialState ?? {}));

    plugin.applyPlugins({
        key: 'onAppCreated',
        type: ApplyPluginsType.event,
        args: { app, routes },
    });

    if (rootElement) {
        app.mount(rootElement);
    }
    return app;
}

const beforeRender = async ({rootElement}) => {
    const beforeRenderConfig = plugin.applyPlugins({
        key: "beforeRender",
        type: ApplyPluginsType.modify,
        initialValue: {
            loading: null,
            action: null
        },
    });
    let initialState = {};
    if (typeof beforeRenderConfig.action === "function") {
        const app = createApp(beforeRenderConfig.loading);
        app.mount(rootElement);
        try {
            initialState = await beforeRenderConfig.action();
        } catch(e){
            console.error(`[fes] beforeRender执行出现异常：`);
            console.error(e);
        }
        app.unmount();
    }
    return initialState;
};

const getClientRender = (args = {}) => plugin.applyPlugins({
  key: 'render',
  type: ApplyPluginsType.compose,
  initialValue: async () => {
    const opts = plugin.applyPlugins({
      key: 'modifyClientRenderOpts',
      type: ApplyPluginsType.modify,
      initialValue: {
        routes: args.routes || getRoutes(),
        plugin,
        rootElement: '{{{ rootElement }}}',
{{#enableTitle}}
        defaultTitle: `{{{ defaultTitle }}}`,
{{/enableTitle}}
      },
    });
    const initialState = await beforeRender(opts); 
    return renderClient({...opts, initialState});
  },
  args,
});

const clientRender = getClientRender();

const app = clientRender();

{{{ entryCode }}}

