<template>
    <div ref="swap" />
</template>
<script>
import * as util from '../../utils/util.js';

export default {
    props: {
        component: {
            type: Object,
            default: undefined
        }
    },
    mounted() {
        if (this.component && util.isObject(this.component)) {
            this.component.$mount(this.$refs.swap);
        }
    }
};
</script>
