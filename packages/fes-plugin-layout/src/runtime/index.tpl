import { reactive, defineComponent } from "vue";
import { plugin, ApplyPluginsType } from "@@/core/coreExports";
import BaseLayout from "./views/BaseLayout.vue";

const userConfig = reactive({{{REPLACE_USER_CONFIG}}});

const Layout = defineComponent({
    name: 'Layout',
    setup(){
        const runtimeConfig = plugin.applyPlugins({
            key: "layout",
            type: ApplyPluginsType.modify,
            initialValue: {},
        });
        const localeShared = plugin.getShared("locale");
        return () => {
            const slots = {
                customHeader: () => {
                    if (runtimeConfig.customHeader) {
                        return (
                            <runtimeConfig.customHeader></runtimeConfig.customHeader>
                        );
                    }
                    return null;
                },
                locale: () => {
                    if (localeShared) {
                        return <localeShared.SelectLang></localeShared.SelectLang>;
                    }
                    return null;
                },
            };
            return <BaseLayout locale={ localeShared ? true : false } {...userConfig} v-slots={slots}></BaseLayout>;
        };
    }
})

export default Layout;
