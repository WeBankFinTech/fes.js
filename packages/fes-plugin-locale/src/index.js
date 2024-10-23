import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { name } from '../package.json';

const namespace = 'plugin-locale';

export default (api) => {
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

    const { getLocales } = require('./utils');

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

        const title = api.config.title || 'fes.js';
        const isLocaleTitle = title.startsWith('$');

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
                TITLE: title.slice(1),
                IS_LOCALE_TITle: isLocaleTitle,
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
        source: name,
    }));
};
