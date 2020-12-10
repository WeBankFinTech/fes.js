import { createRouter as createVueRouter, createWebHashHistory, ApplyPluginsType } from '{{{ runtimePath }}}';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = {{{ routes }}};
  
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}

let router = null;
export const createRouter = () => {
  if (router) {
      return router;
  }
  router = createVueRouter({
      history: createWebHashHistory(),
      routes: getRoutes()
  });

  plugin.applyPlugins({
    key: 'onRouterCreated',
    type: ApplyPluginsType.event,
    args: { router },
  });

  return router;
};

export { router } 