<template>
    <div class="page">
        menuTest: {{ route.params }}
    </div>
</template>

<config>
{
    "title": "menuTest-详情"
}
</config>

<script>
import { useRoute } from '@fesjs/fes';

export default {
    components: {
    },
    setup() {
        const route = useRoute();
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
