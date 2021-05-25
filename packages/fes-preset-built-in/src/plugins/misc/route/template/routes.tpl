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
let history = null;
export const createRouter = (routes) => {
  if (router) {
    return router;
  }
  history = plugin.applyPlugins({
    key: 'modifyHistroy',
    type: ApplyPluginsType.modify,
    initialValue: {{{ CREATE_HISTORY }}}(ROUTER_BASE),
  });
  router = createVueRouter({
    history,
    routes
  });

  plugin.applyPlugins({
    key: 'onRouterCreated',
    type: ApplyPluginsType.event,
    args: { router },
  });

  return router;
};

export const getRouter = ()=>{
    if(!router){
        console.warn(`[preset-build-in] router is null`)
    }
    return router;
}

export const getHistory = ()=>{
    if(!history){
        console.warn(`[preset-build-in] history is null`)
    }
    return history;
}

export const destroyRouter = ()=>{
    router = null;
    history = null;
}
