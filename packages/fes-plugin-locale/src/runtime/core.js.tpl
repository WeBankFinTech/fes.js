// 注入 i18n 上下文
// 动态变更 local
// 其他组件能拿到 t 函数
// local 变更后，能通知到其他函数
// locales目录下以语言简称为子文件下存放配置信息
// 其他插件可以运行时修改配置
// 所有插件使用一个语言和配置
import { isRef, unref } from 'vue';
import { createI18n, useI18n } from '{{{ VUE_I18N_PATH }}}';
import locales from './locales'
import { plugin, ApplyPluginsType } from '@@/core/coreExports';

const defaultOptions = {{{REPLACE_DEFAULT_OPTIONS}}};

const BASE_NAVIGATOR = {{{BASE_NAVIGATOR}}};

const getDefaultLocale = () => {
    const fes_locale = window.localStorage.getItem("fes_locale");
    if (fes_locale) {
        return {
            locale: fes_locale,
            fallbackLocale: defaultOptions.fallbackLocale,
        };
    }
    if (BASE_NAVIGATOR) {
        const keys = locales.map(item=> item.locale);
        const findKey = keys.find(item=> item.includes(window.navigator.language))
        if(findKey){
            return {
                locale: findKey,
                fallbackLocale: defaultOptions.fallbackLocale,
            };
        }
    }
    return {
        locale: defaultOptions.locale,
        fallbackLocale: defaultOptions.fallbackLocale,
    };
};

const messages = {};
if (Array.isArray(locales)) {
    locales.forEach((item) => {
        messages[item.locale] = item.message;
    });
}

const i18n = createI18n({
    ...defaultOptions,
    ...getDefaultLocale(),
    messages,
});

const t = i18n.global.t;

window.localStorage.setItem("fes_locale", unref(i18n.global.locale));
const setLocale = ({ locale }) => {
    if (isRef(i18n.global.locale)) {
        i18n.global.locale.value = locale;
    } else {
        i18n.global.locale = locale;
    }
    window.localStorage.setItem("fes_locale", locale);
    plugin.applyPlugins({
        key: 'onLocaleChange',
        type: ApplyPluginsType.event,
        args: { i18n, t, locale: unref(i18n.global.locale) },
    });
};

const getLocale = () => {
    return unref(i18n.global.locale)
}

const addLocale = ({ locale, messages }) => {
    messages[locale] = messages;
    if (isRef(i18n.global.messages)) {
        i18n.global.messages.value[locale] = messages;
    } else {
        i18n.global.messages[locale] = messages;
    }
};

const getAllLocales = () => {
    return Object.keys(
        unref(i18n.global.messages)
    ).sort();
};

const install = (app) => {
    app.use(i18n);
    plugin.applyPlugins({
        key: 'onLocaleChange',
        type: ApplyPluginsType.event,
        args: { i18n, t, locale: unref(i18n.global.locale) },
    });
};

const locale = {
    setLocale,
    getLocale,
    addLocale,
    getAllLocales,
    messages,
    t,
};

export { useI18n, locale, install };
