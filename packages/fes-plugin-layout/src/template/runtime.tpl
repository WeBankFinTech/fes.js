import { reactive, ref } from "vue";
import { getRoutes, plugin, ApplyPluginsType } from "@@/core/coreExports";
import BaseLayout from "./views/BaseLayout.vue";
import { fillMenuData } from "./helpers";

const userConfig = reactive({{{REPLACE_USER_CONFIG}}});
const langConfig = {
    localInited: ref(false),
    component: null
};
export function rootContainer(childComponent, args) {
    const runtimeConfig = plugin.applyPlugins({
        key: "layout",
        type: ApplyPluginsType.modify,
        initialValue: {},
    });
    const routeConfig = getRoutes();
    userConfig.menus = fillMenuData(userConfig.menus, routeConfig);
    return () => {
        const slots = {
            default: () => <childComponent></childComponent>,
            userCenter: () => {
                if(runtimeConfig.userCenter){
                    return <runtimeConfig.userCenter></runtimeConfig.userCenter>
                }
                return <div></div>
            },
            lang: () => {
                if(langConfig.localInited.value){
                    return <langConfig.component></langConfig.component>
                }
                return <div></div>
            }
          };
        return (
            <BaseLayout {...userConfig} v-slots={slots}>
            </BaseLayout>
        );
    };
}

{{#HAS_LOCALE}}
export function onLocaleReady({ i18n, SelectLang }){
    langConfig.localInited.value = true;
    langConfig.component = SelectLang;
}
{{/HAS_LOCALE}}