import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

export function startDevServer({ webpackConfig, host, port, proxy, https, beforeMiddlewares, afterMiddlewares, customerDevServerConfig }) {
    const options = {
        hot: true,
        port,
        host,
        proxy,
        allowedHosts: 'all',
        static: {
            // contentBase: webpackConfig.output.path,
        },
        server: https ? 'https' : 'http',
        client: {
            logging: 'error',
            webSocketURL: {
                hostname: host,
                port,
            },
        },
        devMiddleware: {
            stats: 'errors-only',
        },
        setupMiddlewares(middlewares) {
            middlewares.unshift(...beforeMiddlewares);
            middlewares.push(...afterMiddlewares);

            return middlewares;
        },
        headers: {
            'access-control-allow-origin': '*',
        },
        ...(customerDevServerConfig || {}),
    };
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(options, compiler);

    server.startCallback((err) => {
        if (err) {
            console.error(err);
        }
    });
    return server;
}
