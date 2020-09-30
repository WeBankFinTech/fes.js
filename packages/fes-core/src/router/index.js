import { createRouter, createWebHashHistory } from 'vue-router';


export default async (options) => {
    let routes = options.routes;
    if (!routes) {
        const automaticRoutes = await import('projectRoot/.cache/routeConfig.js');
        routes = automaticRoutes.default;
    }
    return createRouter({
        history: createWebHashHistory(),
        routes
    });
};
