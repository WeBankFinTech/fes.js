import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebpackBuildConfig } from './shared';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export {
    WebpackBuildConfig,
};

export default function () {
    return {
        plugins: [
            join(__dirname, './plugins/registerBuilder.mjs'),

            // register methods
            join(__dirname, './plugins/registerMethods.mjs'),
            join(__dirname, './plugins/registerType.mjs'),

            // bundle configs
            join(__dirname, './plugins/features/analyze.mjs'),
            join(__dirname, './plugins/features/chainWebpack.mjs'),
            join(__dirname, './plugins/features/cssLoader.mjs'),
            join(__dirname, './plugins/features/copy.mjs'),
            join(__dirname, './plugins/features/devServer.mjs'),
            join(__dirname, './plugins/features/devtool.mjs'),
            join(__dirname, './plugins/features/externals.mjs'),
            join(__dirname, './plugins/features/exportStatic.mjs'),
            join(__dirname, './plugins/features/extraBabelPlugins.mjs'),
            join(__dirname, './plugins/features/extraBabelPresets.mjs'),
            join(__dirname, './plugins/features/extraPostCSSPlugins.mjs'),
            join(__dirname, './plugins/features/html.mjs'),
            join(__dirname, './plugins/features/lessLoader.mjs'),
            join(__dirname, './plugins/features/postcssLoader.mjs'),
            join(__dirname, './plugins/features/nodeModulesTransform.mjs'),
            join(__dirname, './plugins/features/vueLoader.mjs'),
            join(__dirname, './plugins/features/extraCSS.mjs'),

            // commands
            join(__dirname, './plugins/commands/build/index.mjs'),
            join(__dirname, './plugins/commands/dev/index.mjs'),
            join(__dirname, './plugins/commands/webpack/index.mjs'),
        ],
    };
}
