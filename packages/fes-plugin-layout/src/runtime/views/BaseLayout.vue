<template>
    <FLayout class="main-layout">
        <template v-if="currentNavigation === 'side'">
            <FAside
                v-model:collapsed="collapsedRef"
                :fixed="isFixedSidebar"
                :width="`${sideWidth}px`"
                class="layout-aside"
                collapsible
                :inverted="theme === 'dark'"
            >
                <div class="layout-logo">
                    <img v-if="logo" :src="logo" class="logo-img">
                    <div v-if="title" class="logo-name">
                        {{ title }}
                    </div>
                </div>
                <LayoutMenu
                    class="layout-menu"
                    :menus="menus"
                    :collapsed="collapsedRef"
                    mode="vertical"
                    :inverted="theme === 'dark'"
                    :expanded-keys="menuProps?.expandedKeys"
                    :default-expand-all="menuProps?.defaultExpandAll"
                    :accordion="menuProps?.accordion"
                />
            </FAside>
            <FLayout :fixed="isFixedSidebar" :style="sideStyleRef">
                <FHeader ref="headerRef" class="layout-header" :fixed="currentFixedHeaderRef">
                    <div class="layout-header-custom">
                        <slot name="renderCustom" :menus="menus" />
                    </div>
                    <template v-if="locale">
                        <slot name="locale" />
                    </template>
                </FHeader>
                <FLayout :embedded="!multiTabs" :fixed="currentFixedHeaderRef" :style="headerStyleRef">
                    <FMain class="layout-main">
                        <MultiTabProvider :multi-tabs="multiTabs" />
                    </FMain>
                    <FFooter v-if="footer" class="layout-footer">
                        {{ footer }}
                    </FFooter>
                </FLayout>
            </FLayout>
        </template>
        <template v-else-if="currentNavigation === 'left-right'">
            <FAside
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
                            <img v-if="logo" :src="logo" class="logo-img">
                            <div v-if="title" class="logo-name">
                                {{ title }}
                            </div>
                        </div>
                        <LayoutMenu
                            class="layout-menu"
                            :menus="menus"
                            :collapsed="collapsedRef"
                            mode="vertical"
                            :inverted="theme === 'dark'"
                            :expanded-keys="menuProps?.expandedKeys"
                            :default-expand-all="menuProps?.defaultExpandAll"
                            :accordion="menuProps?.accordion"
                        />
                    </div>
                    <div>
                        <div class="layout-aside-custom">
                            <slot name="renderCustom" :menus="menus" />
                        </div>
                        <div v-if="locale" class="layout-aside-locale">
                            <slot name="locale" />
                        </div>
                    </div>
                </div>
            </FAside>
            <FLayout :fixed="isFixedSidebar" :style="sideStyleRef">
                <FLayout :embedded="!multiTabs">
                    <FMain class="layout-main">
                        <MultiTabProvider :multi-tabs="multiTabs" />
                    </FMain>
                    <FFooter v-if="footer" class="layout-footer">
                        {{ footer }}
                    </FFooter>
                </FLayout>
            </FLayout>
        </template>
        <template v-else-if="currentNavigation === 'top'">
            <FHeader ref="headerRef" class="layout-header" :inverted="theme === 'dark'" :fixed="currentFixedHeaderRef">
                <div class="layout-logo">
                    <img v-if="logo" :src="logo" class="logo-img">
                    <div v-if="title" class="logo-name">
                        {{ title }}
                    </div>
                </div>
                <LayoutMenu
                    class="layout-menu"
                    :menus="menus"
                    mode="horizontal"
                    :inverted="theme === 'dark'"
                    :expanded-keys="menuProps?.expandedKeys"
                    :default-expand-all="menuProps?.defaultExpandAll"
                    :accordion="menuProps?.accordion"
                />
                <div class="layout-header-custom">
                    <slot name="renderCustom" :menus="menus" />
                </div>
                <template v-if="locale">
                    <slot name="locale" />
                </template>
            </FHeader>
            <FLayout :embedded="!multiTabs" :fixed="currentFixedHeaderRef" :style="headerStyleRef">
                <FMain class="layout-main">
                    <MultiTabProvider :multi-tabs="multiTabs" />
                </FMain>
                <FFooter v-if="footer" class="layout-footer">
                    {{ footer }}
                </FFooter>
            </FLayout>
        </template>
        <template v-else-if="currentNavigation === 'top-left-right'">
            <FHeader ref="headerRef" class="layout-header" :inverted="theme === 'dark'" :fixed="currentFixedHeaderRef">
                <div class="layout-logo">
                    <img v-if="logo" :src="logo" class="logo-img">
                    <div v-if="title" class="logo-name">
                        {{ title }}
                    </div>
                </div>
                <LayoutMenu
                    class="layout-menu"
                    :menus="rootMenus"
                    mode="horizontal"
                    :inverted="theme === 'dark'"
                />
                <div class="layout-header-custom">
                    <slot name="renderCustom" :menus="menus" />
                </div>
                <template v-if="locale">
                    <slot name="locale" />
                </template>
            </FHeader>
            <FLayout v-if="activeSubMenus.length" :embedded="!multiTabs" :fixed="currentFixedHeaderRef" :style="headerStyleRef">
                <FAside v-model:collapsed="collapsedRef" :inverted="theme === 'dark'" :fixed="isFixedSidebar" :width="`${sideWidth}px`" collapsible class="layout-aside">
                    <LayoutMenu
                        class="layout-menu"
                        :menus="activeSubMenus"
                        :collapsed="collapsedRef"
                        mode="vertical"
                        :expanded-keys="menuProps?.expandedKeys"
                        :default-expand-all="menuProps?.defaultExpandAll"
                        :accordion="menuProps?.accordion"
                        :inverted="theme === 'dark'"
                    />
                </FAside>

                <FLayout :embedded="!multiTabs" :fixed="isFixedSidebar" :style="sideStyleRef">
                    <FMain class="layout-main">
                        <MultiTabProvider :multi-tabs="multiTabs" />
                    </FMain>
                    <FFooter v-if="footer" class="layout-footer">
                        {{ footer }}
                    </FFooter>
                </FLayout>
            </FLayout>
            <FLayout v-else :embedded="!multiTabs" :fixed="currentFixedHeaderRef" :style="headerStyleRef">
                <FMain class="layout-main">
                    <MultiTabProvider :multi-tabs="multiTabs" />
                </FMain>
                <FFooter v-if="footer" class="layout-footer">
                    {{ footer }}
                </FFooter>
            </FLayout>
        </template>
        <template v-else-if="currentNavigation === 'mixin'">
            <FHeader ref="headerRef" class="layout-header" :fixed="currentFixedHeaderRef" :inverted="theme === 'dark'">
                <div class="layout-logo">
                    <img v-if="logo" :src="logo" class="logo-img">
                    <div v-if="title" class="logo-name">
                        {{ title }}
                    </div>
                </div>
                <div class="layout-header-custom">
                    <slot name="renderCustom" :menus="menus" />
                </div>
                <template v-if="locale">
                    <slot name="locale" />
                </template>
            </FHeader>
            <FLayout :fixed="currentFixedHeaderRef" :style="headerStyleRef">
                <FAside v-model:collapsed="collapsedRef" :fixed="isFixedSidebar" :width="`${sideWidth}px`" collapsible class="layout-aside">
                    <LayoutMenu
                        class="layout-menu"
                        :menus="menus"
                        :collapsed="collapsedRef"
                        mode="vertical"
                        :expanded-keys="menuProps?.expandedKeys"
                        :default-expand-all="menuProps?.defaultExpandAll"
                        :accordion="menuProps?.accordion"
                    />
                </FAside>
                <FLayout :embedded="!multiTabs" :fixed="isFixedSidebar" :style="sideStyleRef">
                    <FMain class="layout-main">
                        <MultiTabProvider :multi-tabs="multiTabs" />
                    </FMain>
                    <FFooter v-if="footer" class="layout-footer">
                        {{ footer }}
                    </FFooter>
                </FLayout>
            </FLayout>
        </template>
        <template v-else>
            <FMain class="layout-main">
                <router-view />
            </FMain>
        </template>
    </FLayout>
</template>

<script>
import { useRoute, useRouter } from '@@/core/coreExports';
import { FAside, FFooter, FHeader, FLayout, FMain } from '@fesjs/fes-design';
import { computed, nextTick, ref, watch } from 'vue';
import defaultLogo from '../assets/logo.png';
import { flatNodes } from '../helpers/utils';
import LayoutMenu from './Menu.vue';
import MultiTabProvider from './MultiTabProvider.vue';

export default {
    components: {
        FLayout,
        FAside,
        FMain,
        FFooter,
        FHeader,
        LayoutMenu,
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
            default: 'side', // side 左右（上/下）、 top 上/下、 mixin 上/下（左/右）、top-left-right 上/下（左/右）
        },
        navigationOnError: {
            type: [String, Function], // 403, 404 时的 navigation
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
            if (props.navigationOnError !== undefined && ['/403', '/404'].includes(route.path)) {
                if (typeof props.navigationOnError === 'function') {
                    return props.navigationOnError(route);
                }
                return props.navigationOnError;
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

        const rootMenus = computed(() => {
            return props.menus.map((menu) => {
                const { children, match, ...others } = menu;
                let { path, query, params } = menu;
                const flatChildren = flatNodes(children || []);
                if (!menu.path) {
                    const firstChild = flatChildren.find(item => item.path);
                    if (firstChild) {
                        path = firstChild.path;
                        query = firstChild.query;
                        params = firstChild.params;
                    }
                }
                return {
                    ...others,
                    path,
                    query,
                    params,
                    match: (match || [])
                        .concat(...flatChildren.map(item => []
                            .concat(item.match || [])
                            .concat(item.path)),
                        ),
                    _children: children,
                };
            });
        });

        const activeRootMenu = computed(() => {
            const matchRootMenus = rootMenus.value.filter((menu) => {
                const match = menu.match;
                if (!match || !Array.isArray(match)) {
                    return false;
                }
                return match.some((str) => {
                    const reg = new RegExp(str);
                    return reg.test(route.path);
                });
            });

            return matchRootMenus[0] ?? null;
        });

        const activeSubMenus = computed(() => {
            if (!activeRootMenu.value) {
                return [];
            }
            return activeRootMenu.value._children || [];
        });

        return {
            headerRef,
            headerHeightRef,
            route,
            collapsedRef,
            currentFixedHeaderRef,
            headerStyleRef,
            sideStyleRef,
            currentNavigation,
            rootMenus,
            activeSubMenus,
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
            margin: 16px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            .logo-img {
                height: 36px;
                width: auto;
                object-fit: contain;
            }
            .logo-name {
                overflow: hidden;
                margin: 12px 0 0 0;
                font-weight: 600;
                font-size: 18px;
                line-height: 32px;
                text-align: center;
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
