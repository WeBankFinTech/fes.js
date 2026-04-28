import type { WebpackBuildConfig } from '../../../shared';
import pc from 'picocolors';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

interface StartDevServerOptions {
    webpackConfig: webpack.Configuration;
    host: string;
    port: number;
    proxy: any;
    https: boolean | { key: string; cert: string };
    beforeMiddlewares: any[];
    afterMiddlewares: any[];
    customerDevServerConfig?: WebpackBuildConfig['devServer'];
}

function formatProxy(proxy: any) {
    if (!proxy) {
        return [];
    }

    if (Array.isArray(proxy)) {
        return proxy;
    }

    return Object.keys(proxy).map((apiPath) => {
        return {
            context: [apiPath],
            ...proxy[apiPath],
        };
    });
}

export function startDevServer({ webpackConfig, host, port, proxy, https, beforeMiddlewares, afterMiddlewares, customerDevServerConfig }: StartDevServerOptions) {
    const headers: Record<string, string> = {
        'access-control-allow-origin': '*',
    };
    const options: WebpackDevServer.Configuration = {
        hot: true,
        allowedHosts: 'all',
        server: https ? 'https' : 'http',
        client: {
            logging: 'error',
            overlay: false,
            progress: true,
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
        // @ts-expect-error 不知道这里为啥异常
        headers,
        ...(customerDevServerConfig || {}),
        port,
        host,
        proxy: formatProxy(proxy),
    };
    const compiler = webpack(webpackConfig);
    if (!compiler) {
        throw new Error('Failed to create webpack compiler');
    }
    const server = new WebpackDevServer(options, compiler);
    if (options.host === '0.0.0.0') {
        // eslint-disable-next-line no-console
        console.log(pc.green('  ➜ Local: '), pc.cyan(`${options.server}://127.0.0.1:${options.port}`));
        // eslint-disable-next-line no-console
        console.log(pc.gray('  ➜ Network: '), pc.gray(`${options.server}://${options.host}:${options.port}`));
    }
    else {
        // eslint-disable-next-line no-console
        console.log(pc.green('  ➜ :Local: '), pc.cyan(`${options.server}://${options.host}:${options.port}`));
    }
    server.startCallback((err) => {
        if (err) {
            console.error(err);
        }
    });

    return server;
}
