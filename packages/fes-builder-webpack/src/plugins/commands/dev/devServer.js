import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import { chalk } from '@fesjs/utils';

export function startDevServer({ webpackConfig, host, port, proxy, https, beforeMiddlewares, afterMiddlewares, customerDevServerConfig }) {
    const options = {
        hot: true,
        allowedHosts: 'all',
        server: https ? 'https' : 'http',
        client: {
            logging: 'error',
            webSocketURL: {
                hostname: host,
                port,
            },
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
        port,
        host,
        proxy,
    };
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(options, compiler);

    console.log(chalk.green('Server: '), chalk.blue(`${options.server}://${options.host}:${options.port}`));
    server.startCallback((err) => {
        if (err) {
            console.error(err);
        }
    });

    return server;
}
