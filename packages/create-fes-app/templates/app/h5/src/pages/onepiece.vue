<template>
    <div>{{ fes }}</div>
</template>
<script>
import { defineRouteMeta } from '@fesjs/fes';
import { ref } from 'vue';

defineRouteMeta({
    title: 'one piece',
});

export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        return {
            fes,
        };
    },
};
</script>
