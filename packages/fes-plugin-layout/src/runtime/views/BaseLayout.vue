<template>
    <f-layout v-if="routeLayout" class="main-layout">
        <template v-if="navigation === 'side'">
            <f-aside
                v-if="routeLayout.side"
                v-model:collapsed="collapsed"
                :fixed="fixedSideBar"
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
                    :collapsed="collapsed"
                    mode="vertical"
                    :inverted="theme === 'dark'"
                />
            </f-aside>
            <f-layout>
                <f-header
                    v-if="routeLayout.top"
                    class="layout-header"
                    :fixed="currentFixedHeader"
                >
                    <div class="layout-header-custom">
                        <slot name="customHeader"></slot>
                    </div>
                    <template v-if="locale">
                        <slot name="locale"></slot>
                    </template>
                </f-header>
                <f-main class="layout-main">
                    <MultiTabProvider v-if="multiTabs" />
                    <router-view v-else></router-view>
                </f-main>
                <f-footer v-if="footer" class="layout-footer">
                    {{footer}}
                </f-footer>
            </f-layout>
        </template>
        <template v-if="navigation === 'top'">
            <f-header
                v-if="routeLayout.top"
                class="layout-header"
                :inverted="theme === 'dark'"
                :fixed="currentFixedHeader"
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
                />
                <div class="layout-header-custom">
                    <slot name="customHeader"></slot>
                </div>
                <template v-if="locale">
                    <slot name="locale"></slot>
                </template>
            </f-header>
            <f-main class="layout-main">
                <MultiTabProvider v-if="multiTabs" />
                <router-view v-else></router-view>
            </f-main>
            <f-footer v-if="footer" class="layout-footer">
                {{footer}}
            </f-footer>
        </template>
        <template v-if="navigation === 'mixin'">
            <f-header
                v-if="routeLayout.top"
                class="layout-header"
                :fixed="currentFixedHeader"
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
            <f-layout>
                <f-aside
                    v-if="routeLayout.side"
                    v-model:collapsed="collapsed"
                    :fixed="fixedSideBar"
                    collapsible
                    :inverted="theme === 'dark'"
                    class="layout-aside"
                >
                    <Menu
                        class="layout-menu"
                        :menus="menus"
                        :collapsed="collapsed"
                        mode="vertical"
                        :inverted="theme === 'dark'"
                    />
                </f-aside>
                <f-layout>
                    <f-main class="layout-main">
                        <MultiTabProvider v-if="multiTabs" />
                        <router-view v-else></router-view>
                    </f-main>
                    <f-footer v-if="footer" class="layout-footer">
                        {{footer}}
                    </f-footer>
                </f-layout>
            </f-layout>
        </template>
    </f-layout>
    <div v-else class="content-wrapper">
        <router-view></router-view>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, plugin, ApplyPluginsType } from '@@/core/coreExports';
import {
    FLayout, FAside, FMain, FFooter, FHeader
} from '@fesjs/fes-design';
import Menu from './Menu';
import MultiTabProvider from './MultiTabProvider';
import defaultLogo from '../assets/logo.png';

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
        footer: String
    },
    setup(props) {
        const collapsed = ref(false);
        const route = useRoute();
        const runtimeConfig = plugin.applyPlugins({
            key: 'layout',
            type: ApplyPluginsType.modify,
            initialValue: {
                side: true,
                top: true,
                logo: true
            }
        });
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
        const currentFixedHeader = computed(
            () => props.fixedHeader || props.navigation === 'mixin'
        );
        const asideFixedStyle = computed(() => {
            if (
                routeLayout.value.top
                && props.navigation === 'mixin'
                && props.fixedSideBar
            ) {
                return {
                    top: '54px'
                };
            }
            return {};
        });

        // const sideTheme = computed(() => {
        //     if (props.navigation === 'mixin') {
        //         return 'light';
        //     }
        //     return props.theme;
        // });

        // const headerFixedStyle = computed(() => {
        //     if (!currentFixedHeader.value) {
        //         return {};
        //     }
        //     if (props.navigation === 'side') {
        //         return {
        //             left: `${props.sideWidth}px`,
        //             width: `calc(100% - ${props.sideWidth}px)`
        //         };
        //     }
        //     return {
        //         left: 0,
        //         width: '100%'
        //     };
        // });
        return {
            route,
            routeLayout,
            collapsed,
            currentFixedHeader,
            asideFixedStyle
            // sideTheme,
            // currentFixedHeader,
            // siderFixedStuffStyle,
            // headerFixedStyle
        };
    }
};
</script>
<style lang="less" scoped>
.main-layout {
    min-height: 100vh;
    .layout-header {
        display: flex;
        .layout-logo {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            min-width: 165px;
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
    }
    .fes-layout-aside {
        .layout-logo {
            height: 32px;
            margin: 16px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
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
        .layout-menu {
            margin-top: 24px;
        }
        &.is-collapsed {
            .layout-logo {
                justify-content: center;
                .logo-name {
                    display: none;
                }
            }
        }
    }
    .layout-footer {
        text-align: center;
    }
}

.content-wrapper {
    position: relative;
}
</style>
