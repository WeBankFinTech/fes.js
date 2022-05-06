import { readFileSync } from 'fs';
import { join } from 'path';
import { name } from '../package.json';

const namespace = 'plugin-monaco-editor';

export default (api) => {
    const {
        utils: { Mustache },
    } = api;

    api.describe({
        key: 'monacoEditor',
        config: {
            schema(joi) {
                return joi.object().keys({
                    filename: joi.string(),
                    publicPath: joi.string(),
                    languages: joi.array(),
                    features: joi.array(),
                    globalAPI: joi.boolean(),
                });
            },
        },
        default: {},
    });

    const absoluteFilePath = join(namespace, 'core.js');
    const absRuntimeFilePath = join(namespace, 'runtime.js');
    const absLoaderFilePath = join(namespace, 'loader.js');
    const absEditorFilePath = join(namespace, 'editor.vue');

    api.onGenerateFiles(() => {
        // 文件写出
        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/core.tpl'), 'utf-8'), {}),
        });

        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/runtime.tpl'), 'utf-8')),
        });

        api.writeTmpFile({
            path: absLoaderFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/loader.tpl'), 'utf-8'), {
                MONACO_EDITOR: 'monaco-editor',
            }),
        });

        api.writeTmpFile({
            path: absEditorFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/editor.tpl'), 'utf-8'), {
                LODASH_ES: 'lodash-es',
            }),
        });

        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
            ignore: ['.tpl'],
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['monaco', 'MonacoEditor'],
            source: absoluteFilePath,
        },
    ]);

    api.addRuntimePluginKey(() => 'monacoEditor');

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);

    if (api.builder.isVite) {
        api.modifyBundleConfig((config) => {
            const monacoEditorPlugin = require('vite-plugin-monaco-editor').default;
            config?.plugins?.push(monacoEditorPlugin(api.config?.monacoEditor || {}));
        });
        //
    } else {
        api.chainWebpack((webpackConfig) => {
            webpackConfig.plugin('monaco-editor').use(require('monaco-editor-webpack-plugin'), [api.config?.monacoEditor || {}]);
            return webpackConfig;
        });
    }

    api.addConfigType(() => ({
        source: name,
        build: ['MonacoEditorBuildConfig'],
    }));
};
