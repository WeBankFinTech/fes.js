export default (beforeMiddlewares = [], afterMiddlewares = []) => ({
    name: 'server-middleware-plugin',
    configureServer(server) {
        beforeMiddlewares.forEach((middleware) => {
            server.middlewares.use(middleware);
        });

        return () => {
            afterMiddlewares.forEach((middleware) => {
                server.middlewares.use(middleware);
            });
        };
    },
});
