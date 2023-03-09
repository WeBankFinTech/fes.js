<template>
    <div class="page">menuTest: {{ route.params }}</div>
</template>
<config>
{
    "title": "menuTest-详情"
}
</config>
<script>
import { ref } from 'vue';
import { useRoute, useTitle } from '@fesjs/fes';

export default {
    components: {},
    setup() {
        const route = useRoute();
        const title = ref(`详情-${route.params?.id}`);
        useTitle(title);

        setTimeout(() => {
            title.value = `详情-${route.params?.id}-changed`;
        }, 1000);

        return {
            route,
        };
    },
};
</script>

<style>
.page {
    min-height: 100vh;
}
</style>
