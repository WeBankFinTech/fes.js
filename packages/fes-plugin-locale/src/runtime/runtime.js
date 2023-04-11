import { plugin } from '@@/core/coreExports';
// eslint-disable-next-line import/extensions
import { useI18n, locale, install } from './core';
import SelectLang from './views/SelectLang.vue';

// 共享出去
plugin.share('locale', { useI18n, locale, SelectLang });

export function onAppCreated({ app }) {
    install(app);
}
