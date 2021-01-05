<template>
    <a-layout class="main-layout">
        <a-layout-sider
            v-if="routeHasLayout"
            v-model:collapsed="collapsed"
            :width="sideWidth"
            :class="{ collapsed: collapsed }"
            collapsible
            theme="dark"
            class="layout-sider"
        >
            <div class="logo">
                <img :src="logo" class="logo-img" />
                <h1 class="logo-name">{{title}}</h1>
            </div>
            <Menu :menus="menus" :theme="theme" />
        </a-layout-sider>
        <a-layout>
            <a-layout-header v-if="routeHasLayout" class="layout-header">
                <div class="layout-header-user">
                    <slot name="userCenter"></slot>
                </div>
                <slot name="locale"></slot>
            </a-layout-header>
            <a-layout-content class="layout-content">
                <template v-if="multiTabs">
                    <a-tabs :activeKey="route.path" @tabClick="switchTab" class="layout-content-tabs" hide-add type="editable-card">
                        <a-tab-pane v-for="page in openedPageList" :key="page.path" closable>
                            <template #tab>
                                {{page.name}}
                                <ReloadOutlined v-show="route.path === page.path" @click="reloadTab(page.path)" class="layout-tabs-close-icon" />
                            </template>
                        </a-tab-pane>
                    </a-tabs>
                    <router-view v-slot="{ Component, route }">
                        <keep-alive>
                            <component :key="getPageKey(route)" :is="Component" />
                        </keep-alive>
                    </router-view>
                </template>
                <template v-else>
                    <router-view></router-view>
                </template>
            </a-layout-content>
            <a-layout-footer v-if="routeHasLayout" class="layout-footer">
                Ant Design ©2020 Created by MumbleFe
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
import {
    ref, computed, reactive, unref
} from 'vue';
import { useRoute, useRouter } from '@@/core/coreExports';
import Layout from 'ant-design-vue/lib/layout';
import 'ant-design-vue/lib/layout/style';
import Tabs from 'ant-design-vue/lib/tabs';
import 'ant-design-vue/lib/tabs/style';
import { ReloadOutlined } from '@ant-design/icons-vue';
import Menu from './Menu';

let i = 0;
const getKey = () => ++i;

export default {
    components: {
        [Layout.name]: Layout,
        [Layout.Sider.name]: Layout.Sider,
        [Layout.Content.name]: Layout.Content,
        [Layout.Header.name]: Layout.Header,
        [Layout.Footer.name]: Layout.Footer,
        [Tabs.name]: Tabs,
        [Tabs.TabPane.name]: Tabs.TabPane,
        ReloadOutlined,
        Menu
    },
    props: {
        menus: {
            type: Array,
            default() {
                return [];
            }
        },
        title: {
            type: String,
            default: ''
        },
        locale: {
            type: Boolean,
            default: false
        },
        logo: {
            type: String,
            default: ''
        },
        theme: {
            type: String,
            default: 'dark'
        },
        navigation: {
            type: String,
            default: 'side' // side 左右（上/下）、 top 上/下、 mixin 上/下（左/右）
        },
        fixedHeader: {
            type: Boolean,
            default: false
        },
        fixedSideBar: {
            type: Boolean,
            default: true
        },
        multiTabs: {
            type: Boolean,
            default: false
        },
        sideWidth: {
            type: Number,
            default: 200
        }
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const openedPageList = reactive([]);
        const routeHasLayout = computed(() => {
            const _routeLayout = route.meta.layout;
            return _routeLayout === undefined ? true : _routeLayout;
        });
        router.beforeEach((to) => {
            if (!openedPageList.some(page => unref(page.path) === to.path)) {
                openedPageList.push({
                    path: to.path,
                    route: to,
                    name: to.meta.name,
                    key: getKey()
                });
            }
            return true;
        });
        // 还需要考虑参数
        const switchTab = (path) => {
            const selectedRoute = openedPageList.find(item => item.path === path);
            if (selectedRoute) {
                router.push({
                    path,
                    query: selectedRoute.route.query,
                    params: selectedRoute.route.params
                });
            }
        };
        const reloadTab = (path) => {
            const selectedPage = openedPageList.find(item => item.path === path);
            if (selectedPage) {
                selectedPage.key = getKey();
            }
        };
        const getPageKey = (_route) => {
            const selectedPage = openedPageList.find(item => item.path === _route.path);
            if (selectedPage) {
                return selectedPage.key;
            }
            return '';
        };
        return {
            getPageKey,
            reloadTab,
            switchTab,
            route,
            openedPageList,
            routeHasLayout,
            collapsed: ref(false)
        };
    }
};
</script>

<style lang="less">
.main-layout {
    min-height: 100vh;
    .layout-sider{
        &.collapsed{
            .logo{
                justify-content: center;
                .logo-name{
                    display: none;
                }
            }
        }
        .logo {
            height: 32px;
            margin: 16px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .logo-img{
                height: 32px;
                width: auto;
            }
            .logo-name{
                overflow: hidden;
                margin: 0 0 0 12px;
                color: #fff;
                font-weight: 600;
                font-size: 18px;
                line-height: 32px;
            }
        }
    }
    .layout-header {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        height: 48px;
        line-height: 48px;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        padding: 0 24px;
        .layout-header-user {
            flex: 1
        }
    }
    .layout-content {
        position: relative;
        .layout-content-tabs {
            background: rgb(255, 255, 255);
            margin: 0px;
            padding-top: 6px;
            width: 100%;
            .ant-tabs-nav-container {
                padding-left: 16px;
                .layout-tabs-close-icon {
                    vertical-align: middle;
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 12px;
                    margin-left: 6px;
                    margin-top: -2px;
                    &:hover{
                        color: rgba(0, 0, 0, 0.8);
                    }
                }
            }
        }
    }
    .layout-footer {
        text-align: center;
    }
}
</style>
