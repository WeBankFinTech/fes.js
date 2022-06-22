<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive :include="currentNameList">
            <component :is="getComponent(Component, route)" :key="pageKey(route)" />
        </keep-alive>
    </router-view>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    props: {
        nameList: {
            type: Array,
            default() {
                return [];
            },
        },
        pageKey: {
            type: Function,
            default: () => {},
        },
        isAllKeepAlive: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:nameList'],
    setup(props, { emit }) {
        const currentNameList = ref(props.nameList);

        watch(
            () => props.nameList,
            () => {
                if (currentNameList.value !== props.nameList) {
                    currentNameList.value = props.nameList;
                }
            },
        );

        const getComponent = (Component, route) => {
            if (props.isAllKeepAlive || route.meta['keep-alive']) {
                const name = route.meta?.name ?? route.name;
                if (name) {
                    // 修改组件的 name
                    Component.type.name = name;
                    // 缓存的关键是组件name在keep-alive的include列表
                    if (!currentNameList.value.includes(name)) {
                        currentNameList.value = [...currentNameList.value, name];
                        emit('update:nameList', currentNameList.value);
                    }
                }
            }

            return Component;
        };

        return {
            currentNameList,
            getComponent,
        };
    },
});
</script>
