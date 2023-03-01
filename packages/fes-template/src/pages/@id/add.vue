<template>
    <div>add.vue</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
    setup() {
        onMounted(() => {
            // i++++i;
            console.log('mounted');
        });
        return {};
    },
});
</script>
