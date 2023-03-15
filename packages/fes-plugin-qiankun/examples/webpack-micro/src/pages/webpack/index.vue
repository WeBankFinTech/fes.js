<template>
    <div>webpack - micro - index</div>
</template>
<config>
{
    "name": "index",
    "title": "home"
}
</config>
<script>
import { onBeforeUnmount } from 'vue';
import { createWatermark, destroyWatermark } from '@fesjs/fes';

export default {
    setup() {
        createWatermark();

        onBeforeUnmount(destroyWatermark);
        return {
            bigData: new Array(5 * 1024 * 1024),
        };
    },
};
</script>
