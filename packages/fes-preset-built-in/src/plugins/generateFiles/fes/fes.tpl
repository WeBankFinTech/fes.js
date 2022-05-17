{{{ importsAhead }}}
import {
    createApp,
    reactive,
} from 'vue';
import { plugin } from './core/plugin';
import './core/pluginRegister';
import { ApplyPluginsType } from '{{{ runtimePath }}}';
import { getRoutes } from './core/routes/routes';
import { updateInitialState } from './initialState';
import DefaultContainer from './defaultContainer.jsx';

{{{ imports }}}

{{{ entryCodeAhead }}}

const renderClient = (opts = {}) => {
    const { plugin, routes, rootElement } = opts;
    const rootContainer = plugin.applyPlugins({
        type: ApplyPluginsType.modify,
        key: 'rootContainer',
        initialValue: DefaultContainer,
        args: {
            routes: routes,
            plugin: plugin
        }
    });

    const app = createApp(rootContainer);

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
    if (typeof beforeRenderConfig.action === "function") {
        const app = createApp(beforeRenderConfig.loading);
        app.mount(rootElement);
        try {
            const initialState = await beforeRenderConfig.action();
            updateInitialState(initialState || {})
        } catch(e){
            console.error(`[fes] beforeRender执行出现异常：`);
            console.error(e);
        }
        app.unmount();
    }
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
    await beforeRender(opts); 
    return renderClient(opts);
  },
  args,
});

const clientRender = getClientRender();

const app = clientRender();

{{{ entryCode }}}

