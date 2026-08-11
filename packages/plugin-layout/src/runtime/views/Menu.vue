<template>
    <FMenu
        v-model:expanded-keys="expandedKeysRef"
        v-model="activeMenu"
        :inverted="inverted"
        :mode="mode"
        :options="transformedMenus"
        :default-expand-all="defaultExpandAll"
        :accordion="accordion"
        @select="onMenuClick"
    />
</template>

<script>
import { useRoute, useRouter } from '@@/core/coreExports';
import { FMenu } from '@fesjs/fes-design';
import { computed, h, nextTick, ref, watch } from 'vue';
import { transform as transformByAccess } from '../helpers/pluginAccess';
import { transform as transformByLocale } from '../helpers/pluginLocale';
import { flatNodes } from '../helpers/utils';
import MenuIcon from './MenuIcon.vue';

function transform(menus, level = 1) {
    return menus.map((menu, index) => {
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
}

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

        const activeMenu = ref(activePath.value);

        watch(activePath, () => {
            activeMenu.value = activePath.value;
        });

        const expandedKeysRef = ref(props.expandedKeys);

        watch(
            [menuArray, activePath],
            () => {
                let index = menuArray.value.findIndex(item => item.value === activePath.value);
                if (index === -1) {
                    return;
                }
                const activeMenu = menuArray.value[index];
                const arr = activeMenu.children?.length ? [activeMenu] : [];
                while (index > 0) {
                    index = index - 1;
                    const lastMenu = menuArray.value[index];
                    if (lastMenu.children && lastMenu.children.includes(arr[arr.length - 1])) {
                        arr.push(lastMenu);
                    }
                }
                expandedKeysRef.value = expandedKeysRef.value.concat(
                    arr.filter(item => !expandedKeysRef.value.includes(item.value)).map(item => item.value),
                );
            },
            {
                immediate: true,
            },
        );

        const onMenuClick = (e) => {
            const path = e.value;
            const currentMenu = menuArray.value.find(item => item.value === path);
            if (currentMenu._blank) {
                const resolved = router.resolve({
                    path,
                    query: currentMenu?.query || {},
                    params: currentMenu?.params || {},
                });
                // TODO 有受控模式之后优化
                nextTick(() => {
                    activeMenu.value = activePath.value;
                });
                window.open(resolved.href, '_blank');
            }
            else if (/^https?:\/\//.test(path)) {
                // TODO 有受控模式之后优化
                nextTick(() => {
                    activeMenu.value = activePath.value;
                });
                window.open(path, '_blank');
            }
            else if (/^\//.test(path)) {
                router.push({
                    path,
                    query: currentMenu?.query || {},
                    params: currentMenu?.params || {},
                });
            }
            else {
                console.warn('[plugin-layout]: 菜单的path只能是以http(s)开头的网址或者路由地址');
            }
        };

        return {
            activeMenu,
            activePath,
            expandedKeysRef,
            transformedMenus,
            onMenuClick,
        };
    },
};
</script>
