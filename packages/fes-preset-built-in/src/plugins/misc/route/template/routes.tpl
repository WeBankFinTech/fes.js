import { createRouter as createVueRouter, {{{ CREATE_HISTORY }}}, ApplyPluginsType } from '{{{ runtimePath }}}';
import { plugin } from '@@/core/plugin';

export function getRoutes() {
  const routes = {{{ routes }}};
  return routes;
}

const ROUTER_BASE = '{{{ routerBase }}}';

export const createRouter = (routes) => {
  const createHistory = plugin.applyPlugins({
    key: 'modifyCreateHistory',
    type: ApplyPluginsType.modify,
    args: {
      base: ROUTER_BASE
    },
    initialValue: {{{ CREATE_HISTORY }}},
  });
  const history = createHistory(ROUTER_BASE);
  // 修改routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });
  const router = createVueRouter({
    history,
    routes
  });

  plugin.applyPlugins({
    key: 'onRouterCreated',
    type: ApplyPluginsType.event,
    args: { router, history },
  });

  return router;
};

export const defineRouteMeta = (param)=>{
    return param
}
