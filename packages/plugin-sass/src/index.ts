import type { IPluginAPI } from '@fesjs/shared';
import { createRequire } from 'node:module';

const esmRequire = createRequire(import.meta.url);

export default (api: IPluginAPI) => {
    const { utils } = api;

    api.describe({
        key: 'sass',
        config: {
            schema(joi) {
                return joi.object({
                    implementation: joi.any(),
                    sassOptions: joi.object(),
                    prependData: joi.alternatives(joi.string(), joi.func()),
                    sourceMap: joi.boolean(),
                    webpackImporter: joi.boolean(),
                });
            },
            default: {},
        },
    });

    if (api.builder.name === 'vite') {
        // vite 不需要处理
    }
    else {
        api.chainWebpack((memo, { createCSSRule }) => {
            createCSSRule({
                lang: 'sass',
                test: /\.(sass|scss)(\?.*)?$/,
                loader: esmRequire.resolve('sass-loader'),
                options: utils.deepmerge(
                    {
                        implementation: esmRequire('sass'),
                    },
                    api.config.sass || {},
                ),
            });
            return memo;
        });
    }
};
