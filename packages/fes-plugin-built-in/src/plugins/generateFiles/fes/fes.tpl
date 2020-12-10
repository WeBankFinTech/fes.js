{{{ importsAhead }}}
import {
    createApp,
    reactive,
    defineComponent
} from 'vue';
import { plugin } from './core/plugin';
import './core/pluginRegister';
import { ApplyPluginsType } from '{{{ runtimePath }}}';
import { createRouter, getRoutes } from './core/routes';
{{{ imports }}}

{{{ entryCodeAhead }}}

const renderClient = (opts = {}) => {
    const { plugin, routes, rootElement } = opts;
    const rootContainer = plugin.applyPlugins({
        type: ApplyPluginsType.modify,
        key: 'rootContainer',
        initialValue: defineComponent(() => () => (<RouterView></RouterView>)),
        args: {
            routes: routes,
            plugin: plugin
        }
    });

    const router = createRouter();
    const app = createApp(rootContainer);
    app.use(router);

    // TODO other plugins install
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

const clientRender = getClientRender();
export default clientRender();

{{{ entryCode }}}

