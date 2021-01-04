// 注入 i18n 上下文
// 动态变更 local
// 其他组件能拿到 t 函数
// local 变更后，能通知到其他函数
// locales目录下以语言简称为子文件下存放配置信息
// 其他插件可以运行时修改配置
// 所有插件使用一个语言和配置
import { createI18n, useI18n }  from 'vue-i18n/dist/vue-i18n.esm-bundler.js';
import { plugin, ApplyPluginsType } from "@@/core/coreExports";
import SelectLang from "./views/SelectLang"

const locales = {{{REPLACE_LOCALES}}};

const defaultOptions = {{{REPLACE_DEFAULT_OPTIONS}}}

const messages = {};
if (Array.isArray(locales)) {
    locales.forEach((item) => {
        messages[item.locale] = item.message;
    });
}

const i18n = createI18n({ ...defaultOptions, messages });

const setLocale = (locale)=>{
    i18n.global.locale = locale
};

const addLocale = (locale, messages)=>{};

const getAllLocales = ()=>{};

const install = (app)=>{
    app.use(i18n);
    plugin.applyPlugins({
        key: 'onLocaleReady',
        type: ApplyPluginsType.event,
        args: { i18n, SelectLang }
    });
}

export { useI18n, setLocale, install }