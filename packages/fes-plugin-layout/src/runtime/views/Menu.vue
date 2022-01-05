<template>
    <f-menu
        :modelValue="activePath"
        :inverted="inverted"
        :mode="mode"
        :options="fixedMenus"
        @select="onMenuClick"
    ></f-menu>
</template>

<script>
import { computed, h } from 'vue';
import { FMenu } from '@fesjs/fes-design';
import { useRoute, useRouter } from '@@/core/coreExports';
import MenuIcon from './MenuIcon';
import { transform as transformByAccess } from '../helpers/pluginAccess';
import { transform as transformByLocale } from '../helpers/pluginLocale';
import { flatNodes } from '../helpers/utils';

export default {
    components: {
        FMenu
    },
    props: {
        menus: {
            type: Array,
            default() {
                return [];
            }
        },
        mode: {
            type: String,
            default: 'vertical'
        },
        inverted: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const transform = menus => menus.map((menu) => {
            const copy = {
                ...menu,
                label: menu.title,
                value: menu.path
            };
            if (menu.icon) {
                copy.icon = () => h(MenuIcon, {
                    icon: menu.icon
                });
            }
            if (menu.children) {
                copy.children = transform(menu.children);
            }
            return copy;
        });
        const fixedMenus = computed(() => transformByLocale(transformByAccess(transform(props.menus))));
        const menus = computed(() => flatNodes(fixedMenus.value));
        const activePath = computed(() => {
            const matchMenus = menus.value.filter((menu) => {
                const match = menu.match;
                if (!match || !Array.isArray(match)) {
                    return false;
                }
                return match.some((str) => {
                    const reg = new RegExp(str);
                    return reg.test(route.path);
                });
            });
            if (matchMenus.length === 0) {
                return route.path;
            }
            return matchMenus[0].path;
        });
        const onMenuClick = (e) => {
            const path = e.value;
            if (/^https?:\/\//.test(path)) {
                window.open(path, '_blank');
            } else if (/^\//.test(path)) {
                router.push(path);
            } else {
                console.warn(
                    '[plugin-layout]: 菜单的path只能使以http(s)开头的网址或者路由地址'
                );
            }
        };
        return {
            activePath,
            fixedMenus,
            onMenuClick
        };
    }
};
</script>
