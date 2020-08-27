<template>
    <div ref="swap" />
</template>
<script>
import * as util from '../../utils/util.js';

export default {
    props: {
        col: {
            type: Object,
            default: undefined
        },
        trData: {
            type: Object,
            default: undefined
        }
    },
    mounted() {
        if (this.col.component && util.isFunction(this.col.component)) {
            let parent = null;
            if (this.$parent && this.$parent.$vnode) {
                parent = this.$parent.$vnode.context;
            }
            const component = this.col.component.call(parent || this.col, this.trData, this.trData[this.col.prop]);
            component.$mount(this.$refs.swap);
        }
    }
};
</script>
