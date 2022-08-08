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
                :closable="pageList.length > 1"
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
            <keep-alive :include="keepAlivePages">
                <component :is="Component" :key="getPageKey(route)" />
            </keep-alive>
        </router-view>
    </template>
    <router-view v-else v-slot="{ Component }">
        <keep-alive :include="keepAlivePages">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>
<script>
import { computed, unref, ref } from 'vue';
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
    setup(props) {
        const route = useRoute();
        const router = useRouter();

        const createPage = (_route) => {
            const title = _route.meta.title;
            return {
                path: _route.path,
                route: _route,
                name: _route.meta.name ?? _route.name,
                title: computed(() => transTitle(title)),
                key: getKey()
            };
        };

        function changePageComName(_route) {
            if (_route.meta['keep-alive'] || props.multiTabs) {
                const matched = _route.matched;
                const component = matched[matched.length - 1].components.default;
                const name = _route.meta?.name ?? _route.name;
                if (name && component) {
                    // 修改组件的 name
                    // 缓存的关键是组件name在keep-alive的include列表
                    component.name = name;
                    return name;
                }
            }
        }

        function getInitAlivePage() {
            const name = changePageComName(route);
            return name ? [name] : [];
        }

        const pageList = ref([createPage(route)]);
        const keepAlivePages = ref(getInitAlivePage());
        const actions = [
            {
                value: 'closeOtherPage',
                label: '关闭其他页签'
            },
            {
                value: 'reloadPage',
                label: '刷新当前页签'
            }
        ];

        const findPage = path => pageList.value.find(item => unref(item.path) === unref(path));

        router.beforeEach((to) => {
            const page = findPage(to.path);
            if (!page) {
                pageList.value = [...pageList.value, createPage(to)];
            } else {
                page.route = to;
            }
            return true;
        });

        router.afterEach(() => {
            // 此时route已变，但是页面还未加载
            const name = changePageComName(route);
            // 缓存的关键是组件name在keep-alive的include列表
            if (!keepAlivePages.value.includes(name)) {
                keepAlivePages.value = [...keepAlivePages.value, name];
            }
        });

        // 还需要考虑参数
        const switchPage = async (path) => {
            const selectedPage = findPage(path);
            if (selectedPage) {
                await router.push({
                    path,
                    query: selectedPage.route.query,
                    params: selectedPage.route.params
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
            const _keepAlivePages = [...keepAlivePages.value];
            const keepIndex = _keepAlivePages.indexOf(selectedPage.name);
            if (keepIndex !== -1) {
                _keepAlivePages.splice(keepIndex, 1);
            }
            keepAlivePages.value = _keepAlivePages;
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
            keepAlivePages.value = [selectedPage.name];
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
            actions,
            keepAlivePages
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
