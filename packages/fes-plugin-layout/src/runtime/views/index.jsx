import { unref, defineComponent, computed } from 'vue';
import { plugin } from '@@/core/coreExports';
import { getRoutes } from '@@/core/routes/routes';
// eslint-disable-next-line import/extensions
import getConfig from '../helpers/getConfig';
import fillMenu from '../helpers/fillMenu';
import BaseLayout from './BaseLayout.vue';

const Layout = defineComponent({
    name: 'Layout',
    setup() {
        const config = getConfig();

        const menus = typeof config.menus === 'function' ? config.menus() : config.menus;

        const routes = getRoutes();

        // 把路由的 meta 合并到 menu 配置中
        const filledMenuRef = computed(() => fillMenu(unref(menus) ?? [], routes));

        const localeShared = plugin.getShared('locale');

        return () => {
            const slots = {
                renderCustom: config.renderCustom,
                locale: () => {
                    if (localeShared) {
                        return <localeShared.SelectLang></localeShared.SelectLang>;
                    }
                    return null;
                },
            };
            return (
                <BaseLayout
                    menus={filledMenuRef.value}
                    locale={localeShared ? true : false}
                    title={config.title}
                    logo={config.logo}
                    theme={config.theme}
                    navigation={config.navigation}
                    isFixedHeader={config.isFixedHeader}
                    isFixedSidebar={config.isFixedSidebar}
                    multiTabs={config.multiTabs}
                    sideWidth={config.sideWidth}
                    footer={config.footer}
                    menuProps={config.menuProps}
                    v-slots={slots}
                ></BaseLayout>
            );
        };
    },
});

export default Layout;
