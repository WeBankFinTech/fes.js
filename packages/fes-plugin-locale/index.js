import { createI18n, useI18n } from 'vue-i18n';

// 注入 i18n 上下文
// 动态变更 local
// 其他组件能拿到 t 函数
// local 变更后，能通知到其他函数

export default {
    install(app, options, ctx) {
        const i18n = createI18n(options);
        ctx.useI18n = useI18n;
        app.use(i18n);
    }
};
