import { readFileSync } from 'fs';
import { join } from 'path';
import { getLocalesJSON } from './utils';

const namespace = 'plugin-locale';

export default (api) => {
    const {
        utils: { Mustache }
    } = api;

    api.describe({
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {}
        }
    });

    const absoluteFilePath = join(namespace, 'core.js');

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    const selectLangComponentFilePath = join(namespace, 'views/SelectLang.vue');

    const langConfigFilePath = join(namespace, 'langUConfigMap');

    function getLocaleFileBasePath() {
        return join(api.paths.absSrcPath, api.config.singular ? 'locale' : 'locales');
    }

    // 监听 locale 文件改变，重新生成文件
    api.addTmpGenerateWatcherPaths(getLocaleFileBasePath);

    api.onGenerateFiles(() => {
        const loacleConfigFileBasePath = getLocaleFileBasePath();

        // 文件写出
        const defaultOptions = api.config.locale || {};


        const locales = getLocalesJSON(loacleConfigFileBasePath);

        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(
                readFileSync(join(__dirname, 'template/core.tpl'), 'utf-8'),
                {
                    REPLACE_LOCALES: locales,
                    REPLACE_DEFAULT_OPTIONS: JSON.stringify(defaultOptions)
                }
            )
        });

        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: readFileSync(
                join(__dirname, 'template/runtime.tpl'),
                'utf-8'
            )
        });

        api.writeTmpFile({
            path: langConfigFilePath,
            content: readFileSync(
                join(__dirname, 'template/langUConfigMap.js'),
                'utf-8'
            )
        });

        api.writeTmpFile({
            path: selectLangComponentFilePath,
            content: readFileSync(
                join(__dirname, 'views/SelectLang.vue'),
                'utf-8'
            )
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['useI18n', 'setLocale', 'SelectLang'],
            source: absoluteFilePath
        }
    ]);

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
