<template>
    <f-layout class="main-layout">
        <template v-if="currentNavigation === 'side'">
            <f-aside
                v-model:collapsed="collapsedRef"
                :fixed="isFixedSidebar"
                :width="`${sideWidth}px`"
                class="layout-aside"
                collapsible
                :inverted="theme === 'dark'"
            >
                <div class="layout-logo">
                    <img v-if="logo" :src="logo" class="logo-img" />
                    <div v-if="title" class="logo-name">{{ title }}</div>
                </div>
                <Menu
                    class="layout-menu"
                    :menus="menus"
                    :collapsed="collapsedRef"
                    mode="vertical"
                    :inverted="theme === 'dark'"
                    :expandedKeys="menuProps?.expandedKeys"
                    :defaultExpandAll="menuProps?.defaultExpandAll"
                    :accordion="menuProps?.accordion"
                />
            </f-aside>
            <f-layout :fixed="isFixedSidebar" :style="sideStyleRef">
                <f-header ref="headerRef" class="layout-header" :fixed="currentFixedHeaderRef">
                    <div class="layout-header-custom">
                        <slot name="renderCustom" :menus="menus"></slot>
                    </div>
                    <template v-if="locale">
                        <slot name="locale"></slot>
                    </template>
                </f-header>
                <f-layout :embedded="!multiTabs" :fixed="currentFixedHeaderRef" :style="headerStyleRef">
                    <f-main class="layout-main">
                        <MultiTabProvider :multiTabs="multiTabs" />
                    </f-main>
                    <f-footer v-if="footer" class="layout-footer">
                        {{ footer }}
                    </f-footer>
                </f-layout>
            </f-layout>
        </template>
        <template v-else-if="currentNavigation === 'left-right'">
            <f-aside
                v-model:collapsed="collapsedRef"
                :fixed="isFixedSidebar"
                :width="`${sideWidth}px`"
                class="layout-aside"
                collapsible
                :inverted="theme === 'dark'"
            >
                <div class="flex-between">
                    <div>
                        <div class="layout-logo">
                            <img v-if="logo" :src="logo" class="logo-img" />
                            <div v-if="title" class="logo-name">{{ title }}</div>
                        </div>
                        <Menu
                            class="layout-menu"
                            :menus="menus"
                            :collapsed="collapsedRef"
                            mode="vertical"
                            :inverted="theme === 'dark'"
                            :expandedKeys="menuProps?.expandedKeys"
                            :defaultExpandAll="menuProps?.defaultExpandAll"
                            :accordion="menuProps?.accordion"
                        />
                    </div>
                    <div>
                        <div class="layout-aside-custom">
                            <slot name="renderCustom" :menus="menus"></slot>
                        </div>
                        <div v-if="locale" class="layout-aside-locale">
                            <slot name="locale"></slot>
                        </div>
                    </div>
                </div>
            </f-aside>
            <f-layout :fixed="isFixedSidebar" :style="sideStyleRef">
                <f-layout :embedded="!multiTabs">
                    <f-main class="layout-main">
                        <MultiTabProvider :multiTabs="multiTabs" />
                    </f-main>
                    <f-footer v-if="footer" class="layout-footer">
                        {{ footer }}
                    </f-footer>
                </f-layout>
            </f-layout>
        </template>
        <template v-else-if="currentNavigation === 'top'">
            <f-header ref="headerRef" class="layout-header" :inverted="theme === 'dark'" :fixed="currentFixedHeaderRef">
                <div class="layout-logo">
                    <img v-if="logo" :src="logo" class="logo-img" />
                    <div v-if="title" class="logo-name">{{ title }}</div>
                </div>
                <Menu
                    class="layout-menu"
                    :menus="menus"
                    mode="horizontal"
                    :inverted="theme === 'dark'"
                    :expandedKeys="menuProps?.expandedKeys"
                    :defaultExpandAll="menuProps?.defaultExpandAll"
                    :accordion="menuProps?.accordion"
                />
                <div class="layout-header-custom">
                    <slot name="renderCustom" :menus="menus"></slot>
                </div>
                <template v-if="locale">
                    <slot name="locale"></slot>
                </template>
            </f-header>
            <f-layout :embedded="!multiTabs" :fixed="currentFixedHeaderRef" :style="headerStyleRef">
                <f-main class="layout-main">
                    <MultiTabProvider :multiTabs="multiTabs" />
                </f-main>
                <f-footer v-if="footer" class="layout-footer">
                    {{ footer }}
                </f-footer>
            </f-layout>
        </template>
        <template v-else-if="currentNavigation === 'mixin'">
            <f-header ref="headerRef" class="layout-header" :fixed="currentFixedHeaderRef" :inverted="theme === 'dark'">
                <div class="layout-logo">
                    <img v-if="logo" :src="logo" class="logo-img" />
                    <div v-if="title" class="logo-name">{{ title }}</div>
                </div>
                <div class="layout-header-custom">
                    <slot name="renderCustom" :menus="menus"></slot>
                </div>
                <template v-if="locale">
                    <slot name="locale"></slot>
                </template>
            </f-header>
            <f-layout :fixed="currentFixedHeaderRef" :style="headerStyleRef">
                <f-aside v-model:collapsed="collapsedRef" :fixed="isFixedSidebar" :width="`${sideWidth}px`" collapsible class="layout-aside">
                    <Menu
                        class="layout-menu"
                        :menus="menus"
                        :collapsed="collapsedRef"
                        mode="vertical"
                        :expandedKeys="menuProps?.expandedKeys"
                        :defaultExpandAll="menuProps?.defaultExpandAll"
                        :accordion="menuProps?.accordion"
                    />
                </f-aside>
                <f-layout :embedded="!multiTabs" :fixed="isFixedSidebar" :style="sideStyleRef">
                    <f-main class="layout-main">
                        <MultiTabProvider :multiTabs="multiTabs" />
                    </f-main>
                    <f-footer v-if="footer" class="layout-footer">
                        {{ footer }}
                    </f-footer>
                </f-layout>
            </f-layout>
        </template>
        <template v-else>
            <f-main class="layout-main">
                <router-view></router-view>
            </f-main>
        </template>
    </f-layout>
</template>

<script>
import { ref, computed, watch, nextTick } from 'vue';
import { useRoute, useRouter } from '@@/core/coreExports';
import { FLayout, FAside, FMain, FFooter, FHeader } from '@fesjs/fes-design';
import defaultLogo from '../assets/logo.png';
import Menu from './Menu.vue';
import MultiTabProvider from './MultiTabProvider.vue';

export default {
    components: {
        FLayout,
        FAside,
        FMain,
        FFooter,
        FHeader,
        Menu,
        MultiTabProvider,
    },
    props: {
        menus: {
            type: Array,
            default() {
                return [];
            },
        },
        locale: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        logo: {
            type: String,
            default: defaultLogo,
        },
        theme: {
            type: String,
            default: 'dark', // light、dark
        },
        navigation: {
            type: String,
            default: 'side', // side 左右（上/下）、 top 上/下、 mixin 上/下（左/右）
        },
        isFixedHeader: {
            type: Boolean,
            default: false,
        },
        isFixedSidebar: {
            type: Boolean,
            default: true,
        },
        multiTabs: {
            type: Boolean,
            default: false,
        },
        sideWidth: {
            type: Number,
            default: 200,
        },
        footer: String,
        menuProps: {
            type: Object,
        },
    },
    setup(props) {
        const headerRef = ref();
        const headerHeightRef = ref(0);
        const collapsedRef = ref(false);
        const route = useRoute();
        const router = useRouter();

        const currentNavigation = computed(() => {
            if (route.meta.layout && route.meta.layout.navigation !== undefined) {
                return route.meta.layout.navigation;
            }
            return props.navigation;
        });

        const currentFixedHeaderRef = computed(() => props.isFixedHeader || props.navigation === 'mixin');
        const headerStyleRef = computed(() => (currentFixedHeaderRef.value ? { top: `${headerHeightRef.value}px` } : null));
        const sideStyleRef = computed(() => {
            const left = collapsedRef.value ? '48px' : `${props.sideWidth}px`;
            return props.isFixedSidebar ? { left } : null;
        });

        watch(
            router.currentRoute,
            () => {
                nextTick(() => {
                    if (headerRef.value) {
                        headerHeightRef.value = headerRef.value.$el.offsetHeight;
                    }
                });
            },
            {
                immediate: true,
            },
        );

        return {
            headerRef,
            headerHeightRef,
            route,
            collapsedRef,
            currentFixedHeaderRef,
            headerStyleRef,
            sideStyleRef,
            currentNavigation,
        };
    },
};
</script>
<style lang="less" scoped>
.main-layout {
    height: 100vh;
    .layout-main {
        z-index: 0;
    }
    .flex-between {
        display: flex;
        flex-flow: column;
        align-items: stretch;
        justify-content: space-between;
        min-height: 100%;
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

        .layout-aside-custom {
            padding: 8px 16px;
        }

        .layout-aside-locale {
            padding: 8px 16px;
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
