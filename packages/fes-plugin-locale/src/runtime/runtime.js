import { plugin } from '@@/core/coreExports';
import { install, useI18n } from './core';
import SelectLang from "./views/SelectLang";
// 共享出去
plugin.share("locale", { useI18n, SelectLang });

export function onAppCreated({ app }) {
    install(app);
}
