<template>
    <a-layout class="main-layout">
        <a-layout-sider
            v-if="routeLayout"
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
            <a-layout-header v-if="routeLayout" class="layout-header">
                <slot name="userCenter"></slot>
            </a-layout-header>
            <a-layout-content class="layout-content">
                <slot></slot>
            </a-layout-content>
            <a-layout-footer v-if="routeLayout" class="layout-footer">
                Ant Design ©2020 Created by MumbleFe
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute } from '@webank/fes';
import Layout from 'ant-design-vue/lib/layout';
import 'ant-design-vue/lib/layout/style';
import Menu from './Menu.vue';

export default {
    components: {
        [Layout.name]: Layout,
        [Layout.Sider.name]: Layout.Sider,
        [Layout.Content.name]: Layout.Content,
        [Layout.Header.name]: Layout.Header,
        [Layout.Footer.name]: Layout.Footer,
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
    setup(props, content) {
        const route = useRoute();
        const routeLayout = computed(() => {
            const _routeLayout = route.meta.layout;
            return _routeLayout === undefined ? true : _routeLayout;
        });
        return {
            routeLayout,
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
        height: 48px;
        line-height: 48px;
        background: #fff;
        padding: 0;
    }
    .layout-content {
        position: relative;
    }
    .layout-footer {
        text-align: center;
    }
}
</style>
