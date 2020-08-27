<template>
    <td :colspan="cols.length" class="ui-table-detail-cell">
        <div ref="swap" />
    </td>
</template>
<script>
import * as util from '../../utils/util.js';

export default {
    props: {
        cols: {
            type: Array,
            default: undefined
        },
        col: {
            type: Object,
            default: undefined
        },
        trData: {
            type: Object,
            default: undefined
        },
        tdData: {
            type: Object,
            default: undefined
        }
    },
    mounted() {
        if (this.col.detailComponent && util.isFunction(this.col.detailComponent)) {
            let parent = null;
            if (this.$parent && this.$parent.$vnode) {
                parent = this.$parent.$vnode.context;
            }
            const component = this.col.detailComponent.call(parent || this.col, this.trData, this.trData[this.col.prop]);
            component.$mount(this.$refs.swap);
        }
    }
};
</script>
