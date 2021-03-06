import { join, resolve } from 'path';
import { existsSync } from 'fs';
import {
    winPath,
} from '@umijs/utils';
import resolveDefine from './resolveDefine';

export default async function createHtmlWebpackConfig({
    cwd,
    config,
    webpackConfig,
    headScripts,
    isProd
}) {
    const htmlOptions = {
        filename: '[name].html',
        ...config.html,
        templateParameters: resolveDefine(null, true)
    };
    htmlOptions.title = htmlOptions.title || 'fes.js';


    if (isProd) {
        Object.assign(htmlOptions, {
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeScriptTypeAttributes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        });
    }

    const multiPageConfig = config.html.pages;
    const htmlPath = join(cwd, 'public/index.html');
    const defaultHtmlPath = resolve(__dirname, 'index-default.html');
    const publicCopyIgnore = [];

    if (!multiPageConfig) {
        // default, single page setup.
        htmlOptions.template = existsSync(htmlPath)
            ? htmlPath
            : defaultHtmlPath;

        publicCopyIgnore.push(winPath(htmlOptions.template));
        webpackConfig
            .plugin('html')
            .use(require.resolve('html-webpack-plugin'), [htmlOptions]);
    } else {
        // TODO 支持多页
    }

    if (headScripts) {
        const headScriptsMap = await headScripts();
        webpackConfig
            .plugin('html-tags')
            .use(require.resolve('html-webpack-tags-plugin'), [{
                append: false,
                scripts: headScriptsMap.map(script => ({
                    path: script.src
                }))
            }]);
    }
    return {
        publicCopyIgnore
    };
}
