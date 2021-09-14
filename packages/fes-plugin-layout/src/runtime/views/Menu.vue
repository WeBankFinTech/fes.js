<template>
    <a-menu
        :selectedKeys="selectedKeys"
        :theme="theme"
        mode="inline"
        @click="onMenuClick"
    >
        <template v-for="(item, index) in fixedMenus" :key="index">
            <template v-if="item.access">
                <a-sub-menu v-if="item.children" :key="index" :title="item.title">
                    <template v-if="item.icon" #icon>
                        <MenuIcon :icon="item.icon" />
                    </template>
                    <template
                        v-for="(item1, index1) in item.children"
                    >
                        <template v-if="item1.access">
                            <a-sub-menu
                                v-if="item1.children"
                                :key="`${index}-${index1}`"
                                :title="item1.title"
                            >
                                <template
                                    v-for="(item2) in item1.children"
                                >
                                    <a-menu-item
                                        v-if="item2.access"
                                        :key="item2.path"
                                        :title="item2.title"
                                    >
                                        {{item2.title}}
                                    </a-menu-item>
                                </template>
                            </a-sub-menu>
                            <a-menu-item v-else :key="item1.path" :title="item1.title">
                                {{item1.title}}
                            </a-menu-item>
                        </template>
                    </template>
                </a-sub-menu>
                <a-menu-item v-else :key="item.path" :title="item.title">
                    <MenuIcon v-if="item.icon" :icon="item.icon" />
                    <span>{{item.title}}</span>
                </a-menu-item>
            </template>
        </template>
    </a-menu>
</template>

<script>
import { toRefs, computed } from 'vue';
import { useRoute, useRouter } from '@@/core/coreExports';
import Menu from 'ant-design-vue/lib/menu';
import 'ant-design-vue/lib/menu/style/css';
import MenuIcon from './MenuIcon';
import { transform as transformByAccess } from '../helpers/pluginAccess';
import { transform as transformByLocale } from '../helpers/pluginLocale';

export default {
    components: {
        [Menu.name]: Menu,
        [Menu.SubMenu.name]: Menu.SubMenu,
        [Menu.Item.name]: Menu.Item,
        MenuIcon
    },
    props: {
        menus: {
            type: Array,
            default() {
                return [];
            }
        },
        theme: {
            type: String,
            default: 'dark'
        }
    },
    setup(props) {
        const { menus } = toRefs(props);
        const route = useRoute();
        const router = useRouter();
        const fixedMenus = transformByLocale(transformByAccess(menus));
        const onMenuClick = (e) => {
            const path = e.key;
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
        const selectedKeys = computed(() => [route.path]);
        return {
            selectedKeys,
            fixedMenus,
            onMenuClick
        };
    }
};
</script>

<style lang="less">
</style>
