import { readFileSync } from 'fs';
import { join } from 'path';
import { getLocalesJSON } from './utils';

const namespace = 'plugin-locale';

export default (api) => {
    const {
        utils: { Mustache }
    } = api;

    api.chainWebpack((memo) => {
        memo.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.esm-bundler.js');
    });

    api.describe({
        key: 'locale',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {},
            onChange: api.ConfigChangeType.regenerateTmpFiles
        }
    });

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
            legacy: true,
            baseNavigator: true, // 开启浏览器语言检测
            share: true, // 用户是否需要手动改变语言
            ...api.config.locale
        };

        const localeConfigFileBasePath = getLocaleFileBasePath();

        const locales = getLocalesJSON(localeConfigFileBasePath);

        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(
                readFileSync(join(__dirname, 'runtime/core.tpl'), 'utf-8'),
                {
                    REPLACE_LOCALES: locales,
                    REPLACE_DEFAULT_OPTIONS: JSON.stringify({
                        locale: userConfig.locale,
                        fallbackLocale: userConfig.fallbackLocale,
                        legacy: userConfig.legacy
                    }, null, 2),
                    BASE_NAVIGATOR: userConfig.baseNavigator,
                    SHARE: userConfig.share
                }
            )
        });

        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
            ignore: ['.tpl']
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['useI18n', 'locale'],
            source: absoluteFilePath
        }
    ]);

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
