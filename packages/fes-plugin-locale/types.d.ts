import type { VueI18n } from 'vue-i18n';

export { useI18n } from 'vue-i18n';

export const locale: {
    setLocale: ({ locale }: { locale: string }) => void;
    addLocale: ({ locale, messages }: { locale: string; messages: object }) => void;
    getAllLocales: () => string[];
    messages: Record<string, object>;
    t: VueI18n['t'];
};

declare module '@fesjs/fes' {
    interface PluginBuildConfig {
        locale?:
            | {
                locale: string;
                fallbackLocale: string;
                baseNavigator: boolean;
                legacy: boolean;
            }
            | false;
    }
}
