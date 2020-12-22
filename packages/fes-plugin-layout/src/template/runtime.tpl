import { reactive, toRefs } from "vue";
import { getRoutes, plugin, ApplyPluginsType } from "@@/core/coreExports";
import BaseLayout from "./views/BaseLayout.vue";
import { fillMenuData } from "./helpers";

const userConfig = reactive({{{REPLACE_USER_CONFIG}}});
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
                return <></>
            }
          };
        return (
            <BaseLayout {...userConfig} v-slots={slots}>
            </BaseLayout>
        );
    };
}