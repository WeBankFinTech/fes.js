<template>
    <template v-if="keepAlive">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </template>
    <template v-else>
        <router-view></router-view>
    </template>
</template>
<script>
export default {
    props: {
        keepAlive: {
            type: Boolean,
            default: false
        }
    }
};
</script>
