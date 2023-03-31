<template>
    <template v-if="multiTabs">
        <FTabs
            :modelValue="route.path"
            closable
            :tabsPadding="24"
            type="card"
            class="layout-content-tabs"
            @close="handleCloseTab"
            @update:modelValue="switchPage"
        >
            <FTabPane v-for="page in pageList" :key="page.path" :value="page.path" :closable="pageList.length > 1">
                <template #tab>
                    {{ page.title }}
                    <ReloadOutlined v-show="route.path === page.path" class="layout-tabs-close-icon" @click="reloadPage(page.path)" />
                </template>
            </FTabPane>
            <template #suffix>
                <FDropdown arrow :options="actions" @click="handlerMore">
                    <MoreOutlined />
                </FDropdown>
            </template>
        </FTabs>
        <Page ref="pageRef" :pageKey="getPageKey" isAllKeepAlive />
    </template>
    <Page v-else />
</template>
<script>
import { computed, unref, ref } from 'vue';
import { FTabs, FTabPane, FDropdown } from '@fesjs/fes-design';
import { ReloadOutlined, MoreOutlined } from '@fesjs/fes-design/icon';
import { useRouter, useRoute } from '@@/core/coreExports';
import { transTitle } from '../helpers/pluginLocale';
import { getTitle, deleteTitle } from '../useTitle';
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
            };
        };

        const pageList = ref([createPage(router.currentRoute.value)]);
        const actions = [
            {
                value: 'closeOtherPage',
                label: '关闭其他页签',
            },
            {
                value: 'reloadPage',
                label: '刷新当前页签',
            },
        ];

        const findPage = (path) => pageList.value.find((item) => unref(item.path) === unref(path));

        router.beforeEach((to) => {
            const page = findPage(to.path);
            if (!page) {
                pageList.value = [...pageList.value, createPage(to)];
            } else {
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
            const selectedPage = findPage(targetKey);
            const list = [...pageList.value];
            const index = list.indexOf(selectedPage);
            if (route.path === selectedPage.path) {
                if (list.length > 1) {
                    if (list.length - 1 === index) {
                        await switchPage(list[index - 1].path);
                    } else {
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
