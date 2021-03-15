<template>
    <a-menu
        :selectedKeys="selectedKeys"
        :theme="theme"
        mode="inline"
        @click="onMenuClick"
    >
        <template v-for="(item, index) in fixedMenus" :key="index">
            <template v-if="item.access">
                <a-sub-menu v-if="item.children" :title="transTitle(item.title)">
                    <template
                        v-for="(item1, index) in item.children"
                        :key="index"
                    >
                        <template v-if="item1.access">
                            <a-sub-menu
                                v-if="item1.children"
                                :title="transTitle(item1.title)"
                            >
                                <template
                                    v-for="(item2, index) in item1.children"
                                    :key="index"
                                >
                                    <a-menu-item
                                        v-if="item2.access"
                                        :key="item2.path"
                                        :title="transTitle(item2.title)"
                                    >
                                        {{transTitle(item2.title)}}
                                    </a-menu-item>
                                </template>
                            </a-sub-menu>
                            <a-menu-item v-else :key="item1.path" :title="transTitle(item1.title)">
                                {{transTitle(item1.title)}}
                            </a-menu-item>
                        </template>
                    </template>
                </a-sub-menu>
                <a-menu-item v-else :key="item.path" :title="transTitle(item.title)">
                    <MenuIcon v-if="item.icon" :icon="item.icon" />
                    <span>{{transTitle(item.title)}}</span>
                </a-menu-item>
            </template>
        </template>
    </a-menu>
</template>

<script>
import { toRefs, computed } from 'vue';
import { useRoute, useRouter, plugin } from '@@/core/coreExports';
import Menu from 'ant-design-vue/lib/menu';
import 'ant-design-vue/lib/menu/style/css';
import MenuIcon from './MenuIcon';
import { addAccessTag } from '../helpers/pluginAccess';

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
        const sharedLocale = plugin.getShared('locale');
        const { menus } = toRefs(props);
        const route = useRoute();
        const router = useRouter();
        const fixedMenus = addAccessTag(menus);
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
        const transTitle = (name) => {
            if (sharedLocale) {
                const { t } = sharedLocale.useI18n();
                return t(name);
            }
            return name;
        };
        const selectedKeys = computed(() => [route.path]);
        return {
            selectedKeys,
            fixedMenus,
            onMenuClick,
            transTitle
        };
    }
};
</script>

<style lang="less">
</style>
