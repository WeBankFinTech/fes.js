export default (api) => {
    api.describe({
        key: 'hardSource',
        config: {
            schema(joi) {
                return joi.object();
            }
        }
    });

    api.chainWebpack((webpackConfig) => {
        const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
        const { winPath } = require('@umijs/utils');
        const crypto = require('crypto');
        const path = require('path');
        const { toString } = require('webpack-chain');
        const cwd = api.cwd;
        if (api.env === 'development') {
            webpackConfig
                .plugin('hardSource')
                .use(HardSourceWebpackPlugin, [{
                    cacheDirectory: winPath(`${cwd}/.cache/hard-source/[confighash]`),
                    configHash: (config) => {
                        const hardSourcePlugin = config.plugins.find(
                            ({ constructor }) => constructor.name === 'HardSourceWebpackPlugin'
                        );
                        const cacheDir = hardSourcePlugin.getCachePath();
                        const context = path.resolve(process.cwd(), config.context);
                        const clone = Object.assign({}, config, {
                            context: path.relative(cacheDir, context)
                        });
                        return crypto
                            .createHash('sha256')
                            .update(toString(clone))
                            .digest('hex');
                    },
                    ...api.config.hardSource || {}
                }]);
            webpackConfig
                .plugin('hardSourceExclude')
                .use(HardSourceWebpackPlugin.ExcludeModulePlugin, [
                    [
                        {
                            // HardSource works with mini-css-extract-plugin but due to how
                            // mini-css emits assets, assets are not emitted on repeated builds with
                            // mini-css and hard-source together. Ignoring the mini-css loader
                            // modules, but not the other css loader modules, excludes the modules
                            // that mini-css needs rebuilt to output assets every time.
                            test: /mini-css-extract-plugin[\\/]dist[\\/]loader/
                        }
                    ]
                ]);
        }

        return webpackConfig;
    });
};
