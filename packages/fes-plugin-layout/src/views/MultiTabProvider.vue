<template>
    <a-tabs :activeKey="route.path" @tabClick="switchTab" class="layout-content-tabs" hide-add type="editable-card">
        <a-tab-pane v-for="page in openedPageList" :key="page.path" closable>
            <template #tab>
                {{page.name}}
                <ReloadOutlined v-show="route.path === page.path" @click="reloadTab(page.path)" class="layout-tabs-close-icon" />
            </template>
        </a-tab-pane>
    </a-tabs>
    <router-view v-slot="{ Component, route }">
        <keep-alive>
            <component :key="getPageKey(route)" :is="Component" />
        </keep-alive>
    </router-view>
</template>
<script>
import {
    reactive, unref
} from 'vue';
import Tabs from 'ant-design-vue/lib/tabs';
import 'ant-design-vue/lib/tabs/style';
import { ReloadOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from '@@/core/coreExports';

let i = 0;
const getKey = () => ++i;
export default {
    components: {
        [Tabs.name]: Tabs,
        [Tabs.TabPane.name]: Tabs.TabPane,
        ReloadOutlined
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const openedPageList = reactive([{
            path: unref(route.path),
            route: {
                query: unref(route.query),
                params: unref(route.params)
            },
            name: unref(route.meta).name,
            key: getKey()
        }]);
        const findPage = path => openedPageList.find(item => unref(item.path) === path);
        router.beforeEach((to) => {
            if (!findPage(to.path)) {
                openedPageList.push({
                    path: to.path,
                    route: to,
                    name: to.meta.name,
                    key: getKey()
                });
            }
            return true;
        });
        // 还需要考虑参数
        const switchTab = (path) => {
            const selectedPage = findPage(path);
            if (selectedPage) {
                router.push({
                    path,
                    query: selectedPage.route.query,
                    params: selectedPage.route.params
                });
            }
        };
        const reloadTab = (path) => {
            const selectedPage = findPage(path);
            if (selectedPage) {
                selectedPage.key = getKey();
            }
        };
        const getPageKey = (_route) => {
            const selectedPage = findPage(_route.path);
            if (selectedPage) {
                return selectedPage.key;
            }
            return '';
        };
        return {
            route,
            openedPageList,
            getPageKey,
            reloadTab,
            switchTab
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
        .layout-tabs-close-icon {
            vertical-align: middle;
            color: rgba(0, 0, 0, 0.45);
            font-size: 12px;
            margin-left: 6px;
            margin-top: -2px;
            &:hover{
                color: rgba(0, 0, 0, 0.8);
            }
        }
    }
}
</style>
