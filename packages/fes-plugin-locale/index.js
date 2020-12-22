import { createI18n, useI18n } from 'vue-i18n';

// 注入 i18n 上下文
// 动态变更 local
// 其他组件能拿到 t 函数
// local 变更后，能通知到其他函数
// locales目录下以语言简称为子文件下存放配置信息
// 其他插件可以运行时修改配置
// 所有插件使用一个语言和配置

export default {
    install(app, options, ctx) {
        const i18n = createI18n(options);
        ctx.useI18n = useI18n;
        app.use(i18n);
    }
};
