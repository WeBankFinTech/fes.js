<template>
    <a-menu
        :selectedKeys="selectedKeys"
        @click="onMenuClick"
        :theme="theme"
        mode="inline"
    >
        <template v-for="(item, index) in menus" :key="index">
            <template v-if="item.access">
                <a-sub-menu v-if="item.children" :title="item.title">
                    <template
                        v-for="(item1, index) in item.children"
                        :key="index"
                    >
                        <template v-if="item1.access">
                            <a-sub-menu
                                v-if="item1.children"
                                :title="item1.title"
                            >
                                <template
                                    v-for="(item2, index) in item1.children"
                                    :key="index"
                                >
                                    <a-menu-item
                                        v-if="item2.access"
                                        :key="item2.path"
                                    >
                                        {{item2.title}}
                                    </a-menu-item>
                                </template>
                            </a-sub-menu>
                            <a-menu-item v-else :key="item1.path">
                                {{item1.title}}
                            </a-menu-item>
                        </template>
                    </template>
                </a-sub-menu>
                <a-menu-item v-else :key="item.path">
                    <UserOutlined />
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
import 'ant-design-vue/lib/menu/style';
import {
    UserOutlined
} from '@ant-design/icons-vue';
import addAccessTag from '../helpers/addAccessTag';

export default {
    components: {
        [Menu.name]: Menu,
        [Menu.SubMenu.name]: Menu.SubMenu,
        [Menu.Item.name]: Menu.Item,
        UserOutlined
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
        const selectedKeys = computed(() => [route.path]);
        return {
            selectedKeys,
            menus: fixedMenus,
            onMenuClick
        };
    }
};
</script>

<style lang="less">
</style>
