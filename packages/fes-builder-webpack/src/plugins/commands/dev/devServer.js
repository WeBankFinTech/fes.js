import { chalk } from '@fesjs/utils';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export function startDevServer({ webpackConfig, host, port, proxy, https, beforeMiddlewares, afterMiddlewares, customerDevServerConfig }) {
    const options = {
        hot: true,
        allowedHosts: 'all',
        server: https ? 'https' : 'http',
        client: {
            logging: 'error',
            overlay: false,
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
    if (options.host === '0.0.0.0') {
        // eslint-disable-next-line no-console
        console.log(chalk.green('  ➜ Local: '), chalk.cyan(`${options.server}://127.0.0.1:${options.port}`));
        // eslint-disable-next-line no-console
        console.log(chalk.gray('  ➜ Network: '), chalk.gray(`${options.server}://${options.host}:${options.port}`));
    }
    else {
        // eslint-disable-next-line no-console
        console.log(chalk.green('  ➜ :Local: '), chalk.cyan(`${options.server}://${options.host}:${options.port}`));
    }
    server.startCallback((err) => {
        if (err) {
            console.error(err);
        }
    });

    return server;
}
