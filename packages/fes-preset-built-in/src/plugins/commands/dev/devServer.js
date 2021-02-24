import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import fs from 'fs';
import path from 'path';


export function startDevServer({
    webpackConfig,
    host,
    port,
    proxy,
    https,
    beforeMiddlewares,
    afterMiddlewares,
    customerDevServerConfig
}) {
    const options = {
        contentBase: webpackConfig.output.path,
        hot: true,
        host,
        proxy,
        compress: true,
        noInfo: true,
        disableHostCheck: true,
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
    if (https) {
        options.https = true;
        options.key = fs.readFileSync(path.resolve(__dirname, './cert/key.pem'));
        options.cert = fs.readFileSync(path.resolve(__dirname, './cert/cert.pem'));
    }
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
