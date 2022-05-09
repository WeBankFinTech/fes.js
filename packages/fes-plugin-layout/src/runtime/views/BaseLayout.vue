<template>
    <f-layout v-if="routeLayout" class="main-layout">
        <template v-if="navigation === 'side'">
            <f-aside
                v-if="routeLayout.sidebar"
                v-model:collapsed="collapsedRef"
                :fixed="fixedSideBar"
                :width="`${sideWidth}px`"
                class="layout-aside"
                collapsible
                :inverted="theme === 'dark'"
            >
                <div v-if="routeLayout.logo" class="layout-logo">
                    <img :src="logo" class="logo-img" />
                    <div class="logo-name">{{title}}</div>
                </div>
                <Menu
                    class="layout-menu"
                    :menus="menus"
                    :collapsed="collapsedRef"
                    mode="vertical"
                    :inverted="theme === 'dark'"
                    :expandedKeys="menuConfig?.expandedKeys"
                    :defaultExpandAll="menuConfig?.defaultExpandAll"
                    :accordion="menuConfig?.accordion"
                />
            </f-aside>
            <f-layout
                :fixed="fixedSideBar"
                :style="sideStyleRef"
            >
                <f-header
                    v-if="routeLayout.header"
                    ref="headerRef"
                    class="layout-header"
                    :fixed="currentFixedHeaderRef"
                >
                    <div class="layout-header-custom">
                        <slot name="customHeader"></slot>
                    </div>
                    <template v-if="locale">
                        <slot name="locale"></slot>
                    </template>
                </f-header>
                <f-layout
                    :embedded="!multiTabs"
                    :fixed="currentFixedHeaderRef"
                    :style="headerStyleRef"
                >
                    <f-main class="layout-main">
                        <MultiTabProvider :multiTabs="multiTabs" />
                    </f-main>
                    <f-footer v-if="footer" class="layout-footer">
                        {{footer}}
                    </f-footer>
                </f-layout>
            </f-layout>
        </template>
        <template v-if="navigation === 'top'">
            <f-header
                v-if="routeLayout.header"
                ref="headerRef"
                class="layout-header"
                :inverted="theme === 'dark'"
                :fixed="currentFixedHeaderRef"
            >
                <div v-if="routeLayout.logo" class="layout-logo">
                    <img :src="logo" class="logo-img" />
                    <div class="logo-name">{{title}}</div>
                </div>
                <Menu
                    class="layout-menu"
                    :menus="menus"
                    mode="horizontal"
                    :inverted="theme === 'dark'"
                    :expandedKeys="menuConfig?.expandedKeys"
                    :defaultExpandAll="menuConfig?.defaultExpandAll"
                    :accordion="menuConfig?.accordion"
                />
                <div class="layout-header-custom">
                    <slot name="customHeader"></slot>
                </div>
                <template v-if="locale">
                    <slot name="locale"></slot>
                </template>
            </f-header>
            <f-layout
                :embedded="!multiTabs"
                :fixed="currentFixedHeaderRef"
                :style="headerStyleRef"
            >
                <f-main class="layout-main">
                    <MultiTabProvider :multiTabs="multiTabs" />
                </f-main>
                <f-footer v-if="footer" class="layout-footer">
                    {{footer}}
                </f-footer>
            </f-layout>
        </template>
        <template v-if="navigation === 'mixin'">
            <f-header
                v-if="routeLayout.header"
                ref="headerRef"
                class="layout-header"
                :fixed="currentFixedHeaderRef"
                :inverted="theme === 'dark'"
            >
                <div v-if="routeLayout.logo" class="layout-logo">
                    <img :src="logo" class="logo-img" />
                    <div class="logo-name">{{title}}</div>
                </div>
                <div class="layout-header-custom">
                    <slot name="customHeader"></slot>
                </div>
                <template v-if="locale">
                    <slot name="locale"></slot>
                </template>
            </f-header>
            <f-layout :fixed="currentFixedHeaderRef" :style="headerStyleRef">
                <f-aside
                    v-if="routeLayout.sidebar"
                    v-model:collapsed="collapsedRef"
                    :fixed="fixedSideBar"
                    :width="`${sideWidth}px`"
                    collapsible
                    class="layout-aside"
                >
                    <Menu
                        class="layout-menu"
                        :menus="menus"
                        :collapsed="collapsedRef"
                        mode="vertical"
                        :expandedKeys="menuConfig?.expandedKeys"
                        :defaultExpandAll="menuConfig?.defaultExpandAll"
                        :accordion="menuConfig?.accordion"
                    />
                </f-aside>
                <f-layout
                    :embedded="!multiTabs"
                    :fixed="fixedSideBar"
                    :style="sideStyleRef"
                >
                    <f-main class="layout-main">
                        <MultiTabProvider :multiTabs="multiTabs" />
                    </f-main>
                    <f-footer v-if="footer" class="layout-footer">
                        {{footer}}
                    </f-footer>
                </f-layout>
            </f-layout>
        </template>
    </f-layout>
    <router-view v-else></router-view>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from '@@/core/coreExports';
import {
    FLayout, FAside, FMain, FFooter, FHeader
} from '@fesjs/fes-design';
import Menu from './Menu';
import MultiTabProvider from './MultiTabProvider';
import defaultLogo from '../assets/logo.png';
import getRuntimeConfig from '../helpers/getRuntimeConfig';

export default {
    components: {
        FLayout,
        FAside,
        FMain,
        FFooter,
        FHeader,
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
            default: defaultLogo
        },
        theme: {
            type: String,
            default: 'dark' // light、dark
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
        },
        footer: String,
        menuConfig: {
            type: Object
        }
    },
    setup(props) {
        const headerRef = ref();
        const headerHeightRef = ref(0);

        onMounted(() => {
            if (headerRef.value) {
                headerHeightRef.value = headerRef.value.$el.offsetHeight;
            }
        });

        const collapsedRef = ref(false);
        const route = useRoute();
        const runtimeConfig = getRuntimeConfig();
        const routeLayout = computed(() => {
            let config;
            // meta 中 layout 默认为 true
            const metaLayoutConfig = route.meta.layout === undefined ? true : route.meta.layout;
            if (typeof metaLayoutConfig === 'boolean') {
                config = metaLayoutConfig ? runtimeConfig : false;
            } else if (typeof metaLayoutConfig === 'object') {
                config = { ...runtimeConfig, ...metaLayoutConfig };
            } else {
                console.error(
                    '[plugin-layout]: meta layout must be object or boolean！'
                );
            }
            // query 中 layout 默认为 false
            const routeQueryLayoutConfig = route.query.layout && JSON.parse(route.query.layout);
            if (typeof routeQueryLayoutConfig === 'boolean') {
                config = routeQueryLayoutConfig ? runtimeConfig : false;
            } else if (typeof routeQueryLayoutConfig === 'object') {
                config = { ...config, ...routeQueryLayoutConfig };
            } else if (routeQueryLayoutConfig !== undefined) {
                console.error(
                    '[plugin-layout]: query layout must be object or boolean！'
                );
            }
            return config;
        });
        const currentFixedHeaderRef = computed(
            () => props.fixedHeader || props.navigation === 'mixin'
        );
        const headerStyleRef = computed(() => (currentFixedHeaderRef.value ? { top: `${headerHeightRef.value}px` } : null));
        const sideStyleRef = computed(() => (props.fixedSideBar
            ? {
                left: collapsedRef.value ? '48px' : `${props.sideWidth}px`
            }
            : null));
        return {
            headerRef,
            headerHeightRef,
            route,
            routeLayout,
            collapsedRef,
            currentFixedHeaderRef,
            headerStyleRef,
            sideStyleRef
        };
    }
};
</script>
<style lang="less" scoped>
.main-layout {
    height: 100vh;
    .layout-main {
        z-index: 0;
    }
    .layout-header {
        display: flex;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        z-index: 1;
        .layout-menu {
            border-bottom: none;
        }
        .layout-logo {
            display: flex;
            margin: 0 24px;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
            overflow: hidden;
            transition: all 0.3s;
            .logo-img {
                height: 32px;
                width: auto;
            }
            .logo-name {
                overflow: hidden;
                margin: 0 0 0 12px;
                font-weight: 600;
                font-size: 18px;
                line-height: 32px;
            }
        }
        .layout-header-custom {
            flex: 1;
        }
        .layout-menu {
            width: auto;
        }
    }
    .fes-layout-aside {
        z-index: 1;
        box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 5%);
        .layout-logo {
            height: 32px;
            margin: 16px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .logo-img {
                height: 36px;
                width: auto;
            }
            .logo-name {
                overflow: hidden;
                margin: 0 0 0 12px;
                font-weight: 600;
                font-size: 18px;
                line-height: 32px;
            }
        }
        .layout-menu {
            margin-top: 24px;
        }
        &.is-collapsed {
            .layout-logo {
                justify-content: center;
                .logo-img {
                    width: 40px;
                    height: auto;
                }
                .logo-name {
                    display: none;
                }
            }
        }
    }
    .layout-footer {
        padding: 16px;
        text-align: center;
    }
}
</style>
