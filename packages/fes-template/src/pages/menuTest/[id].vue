<template>
    <div class="page">
        menuTest: {{ route.params }} <input style="border: 1px solid red">
    </div>
</template>

<config>
{
    "title": "menuTest-详情"
}
</config>

<script>
import { useLayout, useRoute } from '@fesjs/fes';

export default {
    components: {},
    setup() {
        const route = useRoute();
        const { title } = useLayout({ title: `详情-${route.params?.id}` });

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
