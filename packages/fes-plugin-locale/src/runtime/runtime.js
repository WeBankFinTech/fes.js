import { plugin } from '@@/core/coreExports';

import { install, locale, useI18n } from './core';
import SelectLang from './views/SelectLang.vue';

// 共享出去
plugin.share('locale', { useI18n, locale, SelectLang });

export function onAppCreated({ app }) {
    install(app);
}
