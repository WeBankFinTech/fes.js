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
            <FTabPane
                v-for="page in pageList"
                :key="page.path"
                :value="page.path"
                :closable="route.path !== page.path"
            >
                <template #tab>
                    {{page.title}}
                    <ReloadOutlined
                        v-show="route.path === page.path"
                        class="layout-tabs-close-icon"
                        @click="reloadPage(page.path)"
                    />
                </template>
            </FTabPane>
            <template #suffix>
                <FDropdown arrow :options="actions" @click="handlerMore">
                    <MoreOutlined />
                </FDropdown>
            </template>
        </FTabs>
        <router-view v-slot="{ Component, route }">
            <keep-alive>
                <component :is="Component" :key="getPageKey(route)" />
            </keep-alive>
        </router-view>
    </template>
    <router-view v-else></router-view>
</template>
<script>
import {
    computed, onMounted, unref, ref
} from 'vue';
import { FTabs, FTabPane, FDropdown } from '@fesjs/fes-design';
import { ReloadOutlined, MoreOutlined } from '@fesjs/fes-design/icon';
import { useRouter, useRoute } from '@@/core/coreExports';
import { transTitle } from '../helpers/pluginLocale';

let i = 0;
const getKey = () => ++i;
export default {
    components: {
        FTabs,
        FTabPane,
        FDropdown,
        ReloadOutlined,
        MoreOutlined
    },
    props: {
        multiTabs: Boolean
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const pageList = ref([]);
        const actions = [
            {
                value: 'closeOtherPage',
                label: '关闭其他'
            },
            {
                value: 'reloadPage',
                label: '刷新当前页'
            }
        ];

        const createPage = (_route) => {
            const title = _route.meta.title;
            return {
                path: _route.path,
                route: _route,
                name: _route.meta.name,
                title: computed(() => transTitle(title)),
                key: getKey()
            };
        };

        const findPage = path => pageList.value.find(item => unref(item.path) === unref(path));

        onMounted(() => {
            pageList.value = [createPage(route)];
        });

        router.beforeEach((to) => {
            if (!findPage(to.path)) {
                pageList.value = [...pageList.value, createPage(to)];
            }
            return true;
        });
        // 还需要考虑参数
        const switchPage = (path) => {
            const selectedPage = findPage(path);
            if (selectedPage) {
                router.push({
                    path,
                    query: selectedPage.route.query,
                    params: selectedPage.route.params
                });
            }
        };
        const handleCloseTab = (targetKey) => {
            const selectedPage = findPage(targetKey);
            const list = [...pageList.value];
            const index = list.indexOf(selectedPage);
            list.splice(index, 1);
            pageList.value = list;
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
            route,
            pageList,
            getPageKey,
            reloadPage,
            switchPage,
            handlerMore,
            handleCloseTab,
            actions
        };
    }
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
