import { createRouter as createVueRouter, createWebHistory, createWebHashHistory, createMemoryHistory, ApplyPluginsType } from '{{{ runtimePath }}}';
import { plugin } from '../plugin';

const createHistoryMap = {
    history: createWebHistory,
    hash: createWebHashHistory,
    memory: createMemoryHistory,
};

const ROUTER_BASE = '{{{ routerBase }}}';
const ROUTER_MODE = '{{{ routerMode }}}'
let router = null;
let history = null;
export const createRouter = (routes) => {
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
      mode: ROUTER_MODE
    },
  });
  history = createHistoryMap[route.mode]?.(route.base);
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
