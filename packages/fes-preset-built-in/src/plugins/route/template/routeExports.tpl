import { createRouter as createVueRouter, {{{ CREATE_HISTORY }}}, ApplyPluginsType } from '{{{ runtimePath }}}';
import { plugin } from '../plugin';

const ROUTER_BASE = '{{{ routerBase }}}';
let router = null;
let history = null;
export const createRouter = (routes) => {
  const createHistory = plugin.applyPlugins({
    key: 'modifyCreateHistory',
    type: ApplyPluginsType.modify,
    args: {
      base: ROUTER_BASE
    },
    initialValue: {{{ CREATE_HISTORY }}},
  });
  // 修改routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });
  const route = plugin.applyPlugins({
    key: 'modifyRoute',
    type: ApplyPluginsType.modify,
    initialValue: {
      base: ROUTER_BASE,
      routes: routes,
      createHistory: createHistory
    },
  });
  history = route['createHistory']?.(route.base);
  router = createVueRouter({
    history,
    routes: route.routes
  });

  plugin.applyPlugins({
    key: 'onRouterCreated',
    type: ApplyPluginsType.event,
    args: { router, history },
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
