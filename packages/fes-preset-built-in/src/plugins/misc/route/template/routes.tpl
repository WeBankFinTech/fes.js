import { createRouter as createVueRouter, {{{ CREATE_HISTORY }}}, ApplyPluginsType } from '{{{ runtimePath }}}';
import { plugin } from '@@/core/coreExports';

export function getRoutes() {
  const routes = {{{ routes }}};
  
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}

const ROUTER_BASE = '{{{ routerBase }}}';
let router = null;
export const createRouter = () => {
  if (router) {
      return router;
  }
  const history = {{{ CREATE_HISTORY }}}(ROUTER_BASE)
  router = createVueRouter({
      history,
      routes: getRoutes()
  });

  plugin.applyPlugins({
    key: 'onRouterCreated',
    type: ApplyPluginsType.event,
    args: { router },
  });

  return router;
};

export const getRouter = ()=>{
  return router;
}