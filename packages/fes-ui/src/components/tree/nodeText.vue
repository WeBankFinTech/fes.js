<script>
export default {
    props: {
        root: {
            type: Object,
            default: undefined
        },
        node: {
            type: Object,
            default: undefined
        },
        render: {
            type: Function,
            default: undefined
        }
    },
    methods: {
        clickHandler() {
            this.$emit('on-click');
        }
    },
    render(h) {
        const son = [];
        if (this.root.$scopedSlots.default) {
            son.push(this.root.$scopedSlots.default({ node: this.node, root: this.root }));
        } else {
            son.push(this.node.name);
        }
        return h('span', {
            class: {
                'ui-tree-node-text': true,
                selected: this.node.selected
            },
            on: {
                click: this.clickHandler
            }
        }, son);
    }
};
</script>
