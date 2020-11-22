import { createRouter, createWebHashHistory } from '{{{ runtimePath }}}';

export function getRoutes() {
  const routes = {{{ routes }}};
  // TODO 支持动态变更路由
  return routes;
}

let router = null;
export const createHistory = () => {
  if (router) {
      return router;
  }
  router = createRouter({
      history: createWebHashHistory(),
      routes: getRoutes()
  });

  return router;
};

export { router };
