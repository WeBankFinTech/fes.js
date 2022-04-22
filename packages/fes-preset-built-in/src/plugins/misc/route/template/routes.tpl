import { createRouter as createVueRouter, {{{ CREATE_HISTORY }}}, ApplyPluginsType } from '{{{ runtimePath }}}';
import { plugin } from '@@/core/plugin';

export function getRoutes() {
  const routes = {{{ routes }}};
  return routes;
}

const ROUTER_BASE = '{{{ routerBase }}}';
let router = null;
let history = null;
export const createRouter = (routes) => {
  if (router) {
    return router;
  }
  const createHistory = plugin.applyPlugins({
    key: 'modifyCreateHistory',
    type: ApplyPluginsType.modify,
    args: {
      base: ROUTER_BASE
    },
    initialValue: {{{ CREATE_HISTORY }}},
  });
  history = createHistory(ROUTER_BASE);
  // 修改routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
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

export const defineRouteMeta = (param)=>{
    return param
}
