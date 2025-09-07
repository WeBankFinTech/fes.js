<template>
    <div>Fes4.x webpack - micro - index</div>
</template>

<config>
{
    "name": "index",
    "title": "home"
}
</config>

<script>
import { createWatermark, destroyWatermark } from '@fesjs/fes';
import { onBeforeUnmount } from 'vue';

export default {
    setup() {
        createWatermark();

        onBeforeUnmount(destroyWatermark);
        return {
            bigData: Array.from({ length: 5 * 1024 * 1024 }),
        };
    },
};
</script>
