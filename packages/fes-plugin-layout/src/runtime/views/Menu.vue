<template>
    <f-menu
        v-model:expandedKeys="expandedKeysRef"
        :modelValue="activePath"
        :inverted="inverted"
        :mode="mode"
        :options="transformedMenus"
        :defaultExpandAll="defaultExpandAll"
        :accordion="accordion"
        @select="onMenuClick"
    ></f-menu>
</template>

<script>
import { computed, h, ref, watch } from 'vue';
import { FMenu } from '@fesjs/fes-design';
import { useRoute, useRouter } from '@@/core/coreExports';
import { transform as transformByAccess } from '../helpers/pluginAccess';
import { transform as transformByLocale } from '../helpers/pluginLocale';
import { flatNodes } from '../helpers/utils';
import MenuIcon from './MenuIcon.vue';

const transform = (menus, level = 1) =>
    menus.map((menu, index) => {
        const copy = {
            ...menu,
            label: menu.title,
            value: menu.path || `${level}_${index}`,
        };
        if (menu.icon) {
            copy.icon = () =>
                h(MenuIcon, {
                    icon: menu.icon,
                });
        }
        if (menu.children) {
            copy.children = transform(menu.children, level + 1);
        }
        return copy;
    });

export default {
    components: {
        FMenu,
    },
    props: {
        menus: {
            type: Array,
            default() {
                return [];
            },
        },
        mode: {
            type: String,
            default: 'vertical',
        },
        inverted: {
            type: Boolean,
            default: false,
        },
        expandedKeys: {
            type: Array,
            default() {
                return [];
            },
        },
        defaultExpandAll: {
            type: Boolean,
            default: false,
        },
        accordion: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const transformedMenus = computed(() => transformByLocale(transformByAccess(transform(props.menus))));
        const menuArray = computed(() => flatNodes(transformedMenus.value));
        const activePath = computed(() => {
            const matchMenus = menuArray.value.filter((menu) => {
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

        const expandedKeysRef = ref(props.expandedKeys);

        watch(
            [menuArray, activePath],
            () => {
                let index = menuArray.value.findIndex((item) => item.value === activePath.value);
                if (index === -1) {
                    return;
                }
                const activeMenu = menuArray.value[index];
                const arr = activeMenu.children?.length ? [activeMenu] : [];
                while (index > 0) {
                    index = index - 1;
                    const lastMenu = menuArray.value[index];
                    if (lastMenu.children && lastMenu.children.indexOf(arr[arr.length - 1]) !== -1) {
                        arr.push(lastMenu);
                    }
                }
                expandedKeysRef.value = expandedKeysRef.value.concat(
                    arr.filter((item) => !expandedKeysRef.value.includes(item.value)).map((item) => item.value),
                );
            },
            {
                immediate: true,
            },
        );

        const onMenuClick = (e) => {
            const path = e.value;
            if (/^https?:\/\//.test(path)) {
                window.open(path, '_blank');
            } else if (/^\//.test(path)) {
                router.push(path);
            } else {
                console.warn('[plugin-layout]: 菜单的path只能使以http(s)开头的网址或者路由地址');
            }
        };

        return {
            activePath,
            expandedKeysRef,
            transformedMenus,
            onMenuClick,
        };
    },
};
</script>
