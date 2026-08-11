import type { Plugin } from 'vite';

interface Middleware {
    (req: any, res: any, next: any): void;
}

export default (beforeMiddlewares: Middleware[] = [], afterMiddlewares: Middleware[] = []): Plugin => ({
    name: 'server-middleware-plugin',
    configureServer(server: any) {
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
