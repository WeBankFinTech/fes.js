import { ref, defineComponent, computed } from 'vue';
import { plugin, ApplyPluginsType, getRoutes } from '@@/core/coreExports';
import BaseLayout from './views/BaseLayout.vue';
import getRuntimeConfig from './helpers/getRuntimeConfig';
import fillMenu from './helpers/fillMenu';

const Layout = defineComponent({
    name: 'Layout',
    setup() {
        const userConfig = {{{REPLACE_USER_CONFIG}}};
        const runtimeConfig = getRuntimeConfig();
        const {
            menus,
            customHeader,
            menuConfig,
            // 非 BaseLayout需要的
            initialState,
            sidebar,
            header,
            logo,
            // 跟logo冲突，换个名字
            logoUrl,
            ...otherConfig
        } = runtimeConfig;
        if (logoUrl) {
            userConfig.logo = logoUrl;
        }
        if (menuConfig && typeof menuConfig === 'object') {
            Object.assign(userConfig.menuConfig, menuConfig);
        }
        Object.keys(otherConfig).forEach((p) => {
            if (otherConfig[p] !== undefined) {
                userConfig[p] = otherConfig[p];
            }
        });
        let menusRef = ref(userConfig.menus);
        // 如果运行时配置了menus，则需要处理
        if (menus && typeof menus === 'function') {
            menusRef = ref(menus(userConfig.menus));
        }
        // 把路由的meta合并到menu配置中
        const filledMenuRef = computed(() => {
            return fillMenu(menusRef.value, getRoutes());
        });

        const localeShared = plugin.getShared('locale');
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
                        return (
                            <localeShared.SelectLang></localeShared.SelectLang>
                        );
                    }
                    return null;
                }
            };
            return (
                <BaseLayout
                    {...userConfig}
                    locale={localeShared ? true : false}
                    menus={filledMenuRef.value}
                    v-slots={slots}
                ></BaseLayout>
            );
        };
    }
});

export default Layout;
