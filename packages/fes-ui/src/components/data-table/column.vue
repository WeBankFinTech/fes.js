<script>
import * as util from '../../utils/util.js';

const editable = {
    type: 'input', // 单元格编辑组件类型，仅支持input，select
    multiple: false, // type为select时提供多选
    multipleLimit: 1, // 多选限制
    confirm: false, // 是否提示修改
    validate: () => true,
    change: undefined
};
export default {
    name: 'Column',
    props: {
        prop: {
            type: String,
            default: undefined
        },
        name: {
            type: [String, Function, Object],
            default: undefined
        },
        align: {
            type: String,
            default: 'center'
        },
        index: {
            type: Number,
            default: 0
        },
        filter: {
            type: [Array, Function],
            default: undefined
        },
        action: {
            type: [Array, Object],
            default: undefined
        },
        sort: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: undefined
        },
        classes: {
            type: [String, Function],
            default: undefined
        },
        component: {
            type: Function,
            default: undefined
        },
        type: {
            type: String,
            default: undefined
        },
        headTip: {
            type: String,
            default: ''
        },
        disabled: {
            type: Function,
            default: undefined
        },
        detailComponent: {
            type: Function,
            default: undefined
        },
        editable: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            sortDirection: '',
            children: [],
            parent: this.$parent
        };
    },
    computed: {
        editableConf() {
            let conf = {};
            if (util.isObject(this.editable)) {
                conf = Object.assign({}, editable, this.editable);
            }
            return conf;
        }
    },
    created() {
        this.$options.render = h => h('span', this.$slots.default);
        const _self = this;
        if (this.type === 'expand') {
            this.parent.renderExpanded = function (data) {
                return _self.$scopedSlots.default
                    ? _self.$scopedSlots.default(data)
                    : _self.$slots.default;
            };
        }
        if (this.type == 'selection') {
            if (util.isFunction(this.disabled)) {
                this.parent.disabledRow = this.disabled;
            }
        }
    },
    mounted() {
        if (this.action && util.isObject(this.action) && !util.isArray(this.action)) {
            this.action = [this.action];
        }
        this.children = this.$children.filter(child => child.$options.name == 'Column');
        if (this.parent && (this.parent.$options.name == 'Table' || this.parent.$options.name == 'TreeTable')) {
            this.uid = this._uid;
            this.parent.addColumn(this);
        }
    },
    beforeDestroy() {
        if (this.parent && (this.parent.$options.name == 'Table' || this.parent.$options.name == 'TreeTable')) {
            this.parent.removeColumn(this);
        }
    }
};
</script>
