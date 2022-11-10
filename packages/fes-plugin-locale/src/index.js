import { readFileSync } from 'fs';
import { join } from 'path';
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

    const absoluteFilePath = join(namespace, 'core.js');

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    function getLocaleFileBasePath() {
        return join(api.paths.absSrcPath, api.config.singular ? 'locale' : 'locales');
    }

    // 监听 locale 文件改变，重新生成文件
    api.addTmpGenerateWatcherPaths(getLocaleFileBasePath);

    api.onGenerateFiles(() => {
        // .fes配置
        const userConfig = {
            locale: 'zh-CN', // default locale
            fallbackLocale: 'zh-CN', // set fallback locale
            legacy: false,
            baseNavigator: true, // 开启浏览器语言检测
            ...api.config.locale,
        };

        const localeConfigFileBasePath = getLocaleFileBasePath();

        const locales = getLocales(localeConfigFileBasePath);

        const { baseNavigator, ...otherConfig } = userConfig;

        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/core.tpl'), 'utf-8'), {
                REPLACE_LOCALES: locales,
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
        source: name,
    }));
};
