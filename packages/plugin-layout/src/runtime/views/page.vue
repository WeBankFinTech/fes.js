<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive :include="keepAlivePages">
            <component :is="Component" :key="pageKey(route)" />
        </keep-alive>
    </router-view>
</template>
<script>
import { useRouter, useRoute } from '@@/core/coreExports';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        pageKey: {
            type: Function,
            default: () => {},
        },
        isAllKeepAlive: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();

        function changePageComName(_route) {
            if (_route.meta['keep-alive'] || props.isAllKeepAlive) {
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

        const keepAlivePages = ref(getInitAlivePage());

        router.afterEach(() => {
            // 此时route已变，但是页面还未加载
            const name = changePageComName(route);
            // 缓存的关键是组件name在keep-alive的include列表
            if (name && !keepAlivePages.value.includes(name)) {
                keepAlivePages.value = [...keepAlivePages.value, name];
            }
        });

        const removeKeepAlive = (name) => {
            const _keepAlivePages = [...keepAlivePages.value];
            const keepIndex = _keepAlivePages.indexOf(name);
            if (keepIndex !== -1) {
                _keepAlivePages.splice(keepIndex, 1);
            }
            keepAlivePages.value = _keepAlivePages;
        };

        const removeAllAndSaveKeepAlive = (name) => {
            keepAlivePages.value = [name];
        };

        return {
            keepAlivePages,
            removeKeepAlive,
            removeAllAndSaveKeepAlive,
        };
    },
});
</script>
