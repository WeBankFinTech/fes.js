import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';


export function startDevServer({
    webpackConfig,
    host,
    port,
    beforeMiddlewares,
    afterMiddlewares,
    customerDevServerConfig
}) {
    const options = {
        contentBase: webpackConfig.output.path,
        hot: true,
        host,
        compress: true,
        noInfo: true,
        clientLogLevel: 'silent',
        stats: 'errors-only',
        before: (app) => {
            beforeMiddlewares.forEach((middleware) => {
                app.use(middleware);
            });
        },
        after: (app) => {
            afterMiddlewares.forEach((middleware) => {
                app.use(middleware);
            });
        },
        headers: {
            'access-control-allow-origin': '*'
        },
        ...(customerDevServerConfig || {})
    };
    WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, options);

    server.listen(port, host, (err) => {
        if (err) {
            console.error(err);
        }
    });
    return server;
}
