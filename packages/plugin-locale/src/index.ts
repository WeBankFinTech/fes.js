import type { IPluginAPI } from '@fesjs/shared';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { fileURLToPath } from 'node:url';
import pkg from '../package.json' assert { type: 'json' };
import { getLocales } from './utils';

const namespace = 'plugin-locale';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (api: IPluginAPI) => {
    const {
        utils: { Mustache },
    } = api;

    api.describe({
        key: 'locale',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {},
            onChange: api.ConfigChangeType.regenerateTmpFiles,
        },
    });

    api.addRuntimePluginKey(() => 'locale');

    api.addRuntimePluginKey(() => 'onLocaleChange');

    const absoluteFilePath = join(namespace, 'core.js');

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    function getLocaleFileBasePath() {
        return join(api.paths.absSrcPath, api.config.singular ? 'locale' : 'locales');
    }

    api.register({
        key: 'addExtraLocales',
        fn: () => [
            getLocaleFileBasePath(),
        ],
    });

    // 监听 locale 文件改变，重新生成文件
    api.addTmpGenerateWatcherPaths(getLocaleFileBasePath);

    api.onGenerateFiles(async () => {
        // .fes配置
        const userConfig = {
            locale: 'zh-CN', // default locale
            fallbackLocale: 'zh-CN', // set fallback locale
            legacy: false,
            baseNavigator: true, // 开启浏览器语言检测
            ...api.config.locale,
        };

        const additionalLocales = await api.applyPlugins({
            key: 'addExtraLocales',
            type: api.ApplyPluginsType.add,
            initialValue: [],
        });

        const { files, locales } = getLocales(additionalLocales);

        const { baseNavigator, ...otherConfig } = userConfig;

        api.writeTmpFile({
            path: join(namespace, 'locales.js'),
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/locales.js.tpl'), 'utf-8'), {
                REPLACE_IMPORTS: files,
                REPLACE_LOCALES: locales.map(item => ({
                    locale: item.locale,
                    importNames: item.importNames.join(', '),
                })),
            }),
        });

        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/core.js.tpl'), 'utf-8'), {
                REPLACE_DEFAULT_OPTIONS: JSON.stringify(otherConfig, null, 2),
                BASE_NAVIGATOR: baseNavigator,
                VUE_I18N_PATH: 'vue-i18n',
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
            specifiers: ['useI18n', 'locale'],
            source: absoluteFilePath,
        },
    ]);

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);

    api.addConfigType(() => ({
        source: pkg.name,
    }));
};
