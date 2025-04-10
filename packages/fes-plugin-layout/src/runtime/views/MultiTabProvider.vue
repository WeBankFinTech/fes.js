<template>
    <template v-if="multiTabs">
        <FTabs
            :model-value="route.path"
            closable
            :tabs-padding="24"
            type="card"
            class="layout-content-tabs"
            @close="handleCloseTab"
            @update:model-value="switchPage"
        >
            <FTabPane v-for="page in pageList" :key="page.path" :value="page.path" :closable="pageList.length > 1">
                <template #tab>
                    {{ page.title }}
                    <ReloadOutlined v-if="page.tabReload" v-show="route.path === page.path" class="layout-tabs-close-icon" @click="reloadPage(page.path)" />
                </template>
            </FTabPane>
            <template #suffix>
                <FDropdown arrow :options="actions" @click="handlerMore">
                    <MoreOutlined />
                </FDropdown>
            </template>
        </FTabs>
        <Page ref="pageRef" :page-key="getPageKey" is-all-keep-alive />
    </template>
    <Page v-else />
</template>

<script>
import { computed, provide, reactive, ref, unref } from 'vue';
import { FDropdown, FTabPane, FTabs } from '@fesjs/fes-design';
import { MoreOutlined, ReloadOutlined } from '@fesjs/fes-design/icon';
import { plugin, useRoute, useRouter } from '@@/core/coreExports';
import { transTitle } from '../helpers/pluginLocale';
import { PLUGIN_LAYOUT_KEY, PLUGIN_LAYOUT_TITLE_KEY } from '../useLayout';
import Page from './page.vue';

let i = 0;
const getKey = () => ++i;
export default {
    components: {
        FTabs,
        FTabPane,
        FDropdown,
        ReloadOutlined,
        MoreOutlined,
        Page,
    },
    props: {
        multiTabs: Boolean,
    },
    setup() {
        const pageRef = ref();
        const route = useRoute();
        const router = useRouter();

        const titleCache = reactive(new Map());

        provide(PLUGIN_LAYOUT_TITLE_KEY, titleCache);

        const getTitle = path => titleCache.get(path);

        const deleteTitle = patch => titleCache.delete(patch);

        const createPage = (_route) => {
            const computedTitle = computed(() => {
                const customTitle = unref(getTitle(_route.path));
                return customTitle ?? transTitle(_route.meta.title);
            });
            return {
                path: _route.path,
                route: _route,
                name: _route.meta.name ?? _route.name,
                title: computedTitle,
                key: getKey(),
                tabReload: _route.meta.tabReload ?? true,
            };
        };

        const pageList = ref([createPage(router.currentRoute.value)]);

        const actions = computed(() => {
            const sharedLocale = plugin.getShared('locale');
            if (sharedLocale) {
                const { t } = sharedLocale.locale;
                return [
                    {
                        value: 'closeOtherPage',
                        label: t('pluginLayout.closeOtherPage'),
                    },
                    {
                        value: 'reloadPage',
                        label: t('pluginLayout.reloadPage'),
                    },
                ];
            }
            return [
                {
                    value: 'closeOtherPage',
                    label: '关闭其他页签',
                },
                {
                    value: 'reloadPage',
                    label: '刷新当前页签',
                },
            ];
        });

        const findPage = path => pageList.value.find(item => unref(item.path) === unref(path));

        router.beforeEach((to) => {
            const page = findPage(to.path);
            if (!page) {
                pageList.value = [...pageList.value, createPage(to)];
            }

            else {
                page.route = to;
            }

            return true;
        });

        // 还需要考虑参数
        const switchPage = async (path) => {
            const selectedPage = findPage(path);
            if (selectedPage) {
                await router.push({
                    path,
                    query: selectedPage.route.query,
                    params: selectedPage.route.params,
                });
            }
        };
        const handleCloseTab = async (targetKey) => {
            targetKey = targetKey || route.path;
            const selectedPage = findPage(targetKey);
            if (!selectedPage) {
                return;
            }
            const list = [...pageList.value];
            const index = list.indexOf(selectedPage);
            if (route.path === selectedPage.path) {
                if (list.length > 1) {
                    if (list.length - 1 === index) {
                        await switchPage(list[index - 1].path);
                    }

                    else {
                        await switchPage(list[index + 1].path);
                    }
                }
            }
            list.splice(index, 1);
            pageList.value = list;
            pageRef.value.removeKeepAlive(selectedPage.name);
            deleteTitle(selectedPage.path);
        };

        const reloadPage = (path) => {
            const selectedPage = findPage(path || unref(route.path));
            if (selectedPage) {
                selectedPage.key = getKey();
            }
        };
        const closeOtherPage = (path) => {
            const selectedPage = findPage(path || unref(route.path));
            pageList.value = [selectedPage];
            pageRef.value.removeAllAndSaveKeepAlive(selectedPage.name);
        };
        const getPageKey = (_route) => {
            const selectedPage = findPage(_route.path);
            if (selectedPage) {
                return selectedPage.key;
            }

            return '';
        };
        const handlerMore = (key) => {
            switch (key) {
                case 'closeOtherPage':
                    closeOtherPage();
                    break;
                case 'reloadPage':
                    reloadPage();
                    break;
                default:
            }
        };

        provide(PLUGIN_LAYOUT_KEY, {
            closeTab: handleCloseTab,
            reloadTab: reloadPage,
        });

        return {
            pageRef,
            route,
            pageList,
            getPageKey,
            reloadPage,
            switchPage,
            handlerMore,
            handleCloseTab,
            actions,
        };
    },
};
</script>

<style lang="less">
.layout-content-tabs {
    background: rgb(255, 255, 255);
    margin: 0px;
    padding: 8px 0;
    width: 100%;
    .fes-tabs-tab-label {
        align-items: center;
    }
    .fes-tabs-tab-pane-wrapper {
        display: none;
    }
    .fes-tabs-nav-suffix {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        padding: 8px 16px;
    }
    .layout-tabs-close-icon {
        margin-left: 6px;
    }
}
</style>
