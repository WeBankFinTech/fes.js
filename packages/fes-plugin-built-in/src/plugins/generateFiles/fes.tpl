{{{ importsAhead }}}
import {
    createApp,
    reactive,
    defineComponent
} from 'vue';
import { plugin } from './core/plugin';
import './core/pluginRegister';
import { ApplyPluginsType } from '{{{ runtimePath }}}';
import { createRouter } from './core/routes';
{{{ imports }}}

{{{ entryCodeAhead }}}

const renderClient = (opts = {}) => {
    const rootContainer = opts.plugin.applyPlugins({
        type: 'modify',
        key: 'rootContainer',
        initialValue: defineComponent(() => () => (<RouterView></RouterView>)),
        args: {
            routes: opts.routes,
            plugin: opts.plugin
        }
    });

    const router = createRouter();
    const app = createApp(rootContainer);
    app.use(router);

    // TODO other plugins install
    if (opts.rootElement) {
        app.mount(opts.rootElement);
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

