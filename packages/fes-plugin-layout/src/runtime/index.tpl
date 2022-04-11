import { ref, defineComponent, inject } from "vue";
import { plugin, ApplyPluginsType } from "@@/core/coreExports";
import BaseLayout from "./views/BaseLayout.vue";

const Layout = defineComponent({
    name: 'Layout',
    setup(){
        const userConfig = {{{REPLACE_USER_CONFIG}}};
        const menusRef = ref({{{MENUS}}})
        const runtimeConfig = plugin.applyPlugins({
            key: "layout",
            type: ApplyPluginsType.modify,
            initialValue: {
                initialState: inject('initialState')
            },
        });
        // 如果运行时配置了menus，则需要处理
        if (
            runtimeConfig.menus &&
            typeof runtimeConfig.menus.request === 'function'
        ) {
            const fetchData = async () => {
                try {
                    const newMenusData = await runtimeConfig.menus.request(
                        menusRef.value
                    );
                    return newMenusData;
                } catch (e) {
                    console.error('[plugin-layout]: runtime config menus.request run error:', e);
                }
                return menusRef.value;
            };
            if (runtimeConfig.menus.watch) {
                watch(
                    () => runtimeConfig.menus.watch,
                    async () => {
                        const newMenusData = await fetchData();
                        menusRef.value = newMenusData;
                    }
                );
            }
            fetchData().then((newMenusData) => {
                menusRef.value = newMenusData;
            });
        }
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
            return <BaseLayout locale={ localeShared ? true : false } {...userConfig} menus={menusRef.value} v-slots={slots}></BaseLayout>;
        };
    }
})

export default Layout;
