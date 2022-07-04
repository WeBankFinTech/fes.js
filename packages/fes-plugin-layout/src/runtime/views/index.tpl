import { ref, defineComponent, computed } from 'vue';
import { plugin } from '@@/core/coreExports';
import { getRoutes } from '@@/core/routes/routes';
import BaseLayout from './BaseLayout.vue';
// eslint-disable-next-line import/extensions
import getConfig from '../helpers/getConfig';
import fillMenu from '../helpers/fillMenu';

const Layout = defineComponent({
    name: 'Layout',
    setup() {
        const initConfig = {{{REPLACE_USER_CONFIG}}}
        const config = {...initConfig, ...getConfig()};

        let menusRef = ref(config.menus);
        // 如果运行时配置了，则需要处理
        if (config.menus && typeof config.menus === 'function') {
            menusRef = ref(config.menus());
        }
        // 把路由的meta合并到menu配置中
        const filledMenuRef = computed(() => fillMenu(menusRef.value, getRoutes()));

        const localeShared = plugin.getShared('locale');

        const renderCustom = config.renderCustom;

        delete config.renderCustom;
        
        return () => {
            const slots = {
                renderCustom,
                locale: () => {
                    if (localeShared) {
                        return <localeShared.SelectLang></localeShared.SelectLang>;
                    }
                    return null;
                },
            };
            return <BaseLayout {...config} locale={localeShared ? true : false} menus={filledMenuRef.value} v-slots={slots}></BaseLayout>;
        };
    },
});

export default Layout;
