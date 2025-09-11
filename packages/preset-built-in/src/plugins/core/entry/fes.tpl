{{{ importsAhead }}}
import {
    createApp,
} from 'vue';
import { plugin } from './core/plugin';
import './core/pluginRegister';
import { ApplyPluginsType } from '{{{ runtimePath }}}';
import { getRoutes } from './core/routes/routes';
import getRootContainer from './getRootContainer';

{{{ imports }}}

{{{ entryCodeAhead }}}

{{{ CONSOLE }}}

const renderClient = (opts = {}) => {
    const { plugin, routes, rootElement } = opts;
    
    const app = createApp(getRootContainer(routes, plugin));

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

const app = clientRender();

{{{ entryCode }}}

