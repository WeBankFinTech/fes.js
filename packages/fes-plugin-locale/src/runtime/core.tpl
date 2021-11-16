// 注入 i18n 上下文
// 动态变更 local
// 其他组件能拿到 t 函数
// local 变更后，能通知到其他函数
// locales目录下以语言简称为子文件下存放配置信息
// 其他插件可以运行时修改配置
// 所有插件使用一个语言和配置
import { isRef } from 'vue';
import { createI18n, useI18n } from '{{{ VUE_I18N_PATH }}}';
import { plugin, ApplyPluginsType } from "@@/core/coreExports";
import SelectLang from "./views/SelectLang";

{{ #SHARE }}
// 共享出去
plugin.share("locale", {useI18n, SelectLang });
{{ /SHARE }}

const locales = {{{REPLACE_LOCALES}}};

const defaultOptions = {{{REPLACE_DEFAULT_OPTIONS}}};

const BASE_NAVIGATOR = {{{BASE_NAVIGATOR}}};

const getDefaultLocale = () => {
    const fes_locale = window.localStorage.getItem("fes_locale");
    if (fes_locale) {
        return {
            locale: fes_locale,
            fallbackLocale: fes_locale,
        };
    }
    if (BASE_NAVIGATOR) {
        return {
            locale: window.navigator.language,
            fallbackLocale: window.navigator.language,
        };
    }
    return {
        locale: 'zh-CN',
        fallbackLocale: 'zh-CN',
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

window.localStorage.setItem("fes_locale", i18n.global.locale);
const setLocale = ({ locale }) => {
    if (isRef(i18n.global.locale)) {
        i18n.global.locale.value = locale;
    } else {
        i18n.global.locale = locale;
    }
    window.localStorage.setItem("fes_locale", locale);
};

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
        isRef(i18n.global.messages)
            ? i18n.global.messages.value
            : i18n.global.messages
    ).sort();
};

const install = (app) => {
    const runtimeConfig = plugin.applyPlugins({
        key: "locale",
        type: ApplyPluginsType.modify,
        initialValue: {},
    });
    app.use(i18n);
};

const locale = {
    setLocale,
    addLocale,
    getAllLocales,
    messages,
};

export { useI18n, locale, install };
