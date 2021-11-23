<template>
    <a-tabs
        :activeKey="route.path"
        class="layout-content-tabs"
        hide-add
        type="editable-card"
        @tabClick="switchPage"
        @edit="onEdit"
    >
        <a-tab-pane
            v-for="page in pageList"
            :key="page.path"
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
        </a-tab-pane>
        <template #tabBarExtraContent>
            <a-dropdown>
                <div class="layout-tabs-more-icon">
                    <MoreOutlined />
                </div>
                <template #overlay>
                    <a-menu @click="handlerMore">
                        <a-menu-item key="closeOtherPage">
                            <a href="javascript:;">关闭其他</a>
                        </a-menu-item>
                        <a-menu-item key="reloadPage">
                            <a href="javascript:;">刷新当前页</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </template>
    </a-tabs>
    <router-view v-slot="{ Component, route }">
        <keep-alive>
            <component :is="Component" :key="getPageKey(route)" />
        </keep-alive>
    </router-view>
</template>
<script>
import {
    computed, onMounted, reactive, unref, ref
} from 'vue';
import Tabs from 'ant-design-vue/lib/tabs';
import Dropdown from 'ant-design-vue/lib/dropdown';
import Menu from 'ant-design-vue/lib/menu';
import 'ant-design-vue/lib/menu/style/css';
import 'ant-design-vue/lib/dropdown/style/css';
import 'ant-design-vue/lib/tabs/style/css';
import { ReloadOutlined, MoreOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from '@@/core/coreExports';
import { transTitle } from '../helpers/pluginLocale';

let i = 0;
const getKey = () => ++i;
export default {
    components: {
        [Dropdown.name]: Dropdown,
        [Menu.name]: Menu,
        [Menu.Item.name]: Menu.Item,
        [Tabs.name]: Tabs,
        [Tabs.TabPane.name]: Tabs.TabPane,
        ReloadOutlined,
        MoreOutlined
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const pageList = ref([]);

        const createPage = (route) => {
            const title = route.meta.title;
            return {
                path: route.path,
                route,
                name: route.meta.name,
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
        const onEdit = (targetKey, action) => {
            if (action === 'remove') {
                const selectedPage = findPage(targetKey);
                const list = [...pageList.value];
                const index = list.indexOf(selectedPage);
                list.splice(index, 1);
                pageList.value = list;
            }
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
        const handlerMore = ({ key }) => {
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
            onEdit
        };
    }
};
</script>
<style lang="less">
.layout-content-tabs {
    background: rgb(255, 255, 255);
    margin: 0px;
    padding-top: 6px;
    width: 100%;
    .ant-tabs-nav-container {
        padding-left: 16px;
    }
    .layout-tabs-close-icon {
        vertical-align: middle;
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
        margin-left: 6px;
        margin-top: -2px;
        &:hover {
            color: rgba(0, 0, 0, 0.8);
        }
    }
    .layout-tabs-more-icon {
        margin-right: 8px;
        padding: 0 4px;
        color: rgba(0, 0, 0, 0.45);
        &:hover {
            color: rgba(0, 0, 0, 0.8);
        }
    }
}
</style>
