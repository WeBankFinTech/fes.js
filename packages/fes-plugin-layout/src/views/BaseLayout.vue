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
                <MultiTabProvider v-if="multiTabs" />
                <router-view v-else></router-view>
            </a-layout-content>
            <a-layout-footer v-if="routeHasLayout" class="layout-footer">
                Ant Design ©2020 Created by MumbleFe
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
import {
    ref, computed
} from 'vue';
import { useRoute } from '@@/core/coreExports';
import Layout from 'ant-design-vue/lib/layout';
import 'ant-design-vue/lib/layout/style';
import Menu from './Menu';
import MultiTabProvider from './MultiTabProvider';


export default {
    components: {
        [Layout.name]: Layout,
        [Layout.Sider.name]: Layout.Sider,
        [Layout.Content.name]: Layout.Content,
        [Layout.Header.name]: Layout.Header,
        [Layout.Footer.name]: Layout.Footer,
        Menu,
        MultiTabProvider
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
        const routeHasLayout = computed(() => {
            const _routeLayout = route.meta.layout;
            return _routeLayout === undefined ? true : _routeLayout;
        });
        return {
            route,
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
    }
    .layout-footer {
        text-align: center;
    }
}
</style>
