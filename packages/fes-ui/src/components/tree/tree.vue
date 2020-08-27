<template>
    <ul :class="getClass" class="ui-tree">
        <tree-node v-for="node in root.children" :key="node._key" :node.sync="node" :parent-node.sync="root" :multiple="multiple" />
    </ul>
</template>
<script>
import treeNode from './treeNode.vue';

let key = 1;
export default {
    name: 'Tree',
    components: {
        treeNode
    },
    props: {
        inline: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default: undefined
        },
        loadData: {
            type: Function,
            default: null
        },
        // 二次点击时，是否继续保持选中状态
        twiceClickSelected: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectedNode: null,
            root: {
                children: []
            }
        };
    },
    computed: {
        getClass() {
            const arr = [];
            if (this.inline) {
                arr.push('ui-tree-inline');
            }
            return arr;
        }
    },
    watch: {
        data: {
            handler() {
                this.init();
            },
            deep: true
        }
    },
    created() {
        this.init();
    },
    mounted() {
        this.$on('on-node-click', function (node) {
            if (this.selectedNode) {
                this.selectedNode.selected = false;
            }
            if (!this.twiceClickSelected) {
                if (node !== this.selectedNode) {
                    node.selected = true;
                    this.selectedNode = node;
                } else {
                    this.selectedNode = null;
                }
            } else {
                node.selected = true;
                this.selectedNode = node;
            }
            this.$emit('on-select-change', this.selectedNode);
        });

        this.$on('on-check-click', function (node) {
            if (node.childrenCheckedStatus == '0' || node.childrenCheckedStatus == '1') {
                this.setChild(node, true);
            } else if (node.childrenCheckedStatus == '2') {
                this.setChild(node, false);
            }
            this.setParent(node);
            this.$emit('on-check-change', this.getCheckedNode());
        });

        this.$on('on-load-data', function (parent, data) {
            this.setLoadData(parent, data);
            this.$emit('on-check-change', this.getCheckedNode());
        });
    },
    methods: {
        init() {
            this.root.children = [];
            this.data.forEach((node) => {
                this.recursion(this.root.children, node, this.root);
            });
        },
        setChild(node, checked) {
            node.checked = checked;
            node.childrenCheckedStatus = checked ? '2' : '0';
            if (node.children && node.children.length > 0) {
                node.children.forEach((obj) => {
                    this.setChild(obj, checked);
                });
            }
        },
        setParent(node) {
            const parent = node.parent;
            if (parent) {
                parent.checked = parent.children.some(obj => obj.checked);
                let childrenCheckedStatus;
                if (
                    parent.children.every(son => son.childrenCheckedStatus === '0')
                ) {
                    childrenCheckedStatus = '0';
                } else if (
                    parent.children.every(son => son.childrenCheckedStatus === '2')
                ) {
                    childrenCheckedStatus = '2';
                } else {
                    childrenCheckedStatus = '1';
                }
                parent.childrenCheckedStatus = childrenCheckedStatus;
                this.setParent(parent);
            }
        },
        getCheckedNode(data) {
            data = data || this.root.children;
            let res = [];
            for (const node of data) {
                if (node.checked) {
                    res.push(node);
                }
                if (node.children && node.children.length) {
                    res = res.concat(this.getCheckedNode(node.children));
                }
            }
            return res;
        },
        recursion(collection, node, parent) {
            const obj = Object.assign({}, node, { children: [] });
            this.$set(obj, '_key', key++);
            this.$set(obj, 'parent', parent);
            this.$set(obj, 'expand', node.expand || false);
            // 多选状态下，不存在selected
            this.$set(obj, 'selected', this.multiple ? false : node.selected || false);
            if (node.children && node.children.length > 0) {
                const f = node.children.every(item => !item.children || item.children.length == 0);
                if (f) {
                    this.$set(obj, 'onlyDataChild', true);
                }
                this.$set(obj, 'checked', false);
                this.$set(obj, 'childrenCheckedStatus', '0');
                node.children.forEach((item) => {
                    this.recursion(obj.children, item, obj);
                });
                const checkedChildren = obj.children.filter(item => item.checked);
                if (checkedChildren.length == obj.children.length) {
                    // 如果子项全部选中，则父选中
                    obj.childrenCheckedStatus = '2';
                    obj.checked = true;
                } else if (checkedChildren.length > 0 && checkedChildren.length < obj.children.length) {
                    obj.childrenCheckedStatus = '1';
                }
            } else {
                // 只是子节点，选中的则默认选中
                this.$set(obj, 'checked', node.checked || false);
                this.$set(obj, 'childrenCheckedStatus', node.checked ? '2' : '0');
                if (obj.selected) {
                    this.selectedNode = obj;
                }
            }
            collection.push(obj);
        },
        setLoadData(parent, data) {
            if (Array.isArray(data)) {
                data.forEach((node) => {
                    const obj = Object.assign({}, node, { children: [] });
                    this.$set(obj, '_key', key++);
                    this.$set(obj, 'parent', parent);
                    this.$set(obj, 'expand', false);
                    this.$set(obj, 'selected', false);
                    // 加载的数据 checked 继承父的状态
                    this.$set(obj, 'checked', parent.checked);
                    this.$set(obj, 'childrenCheckedStatus', parent.checked ? '2' : '0');
                    if (node.children && node.children.length > 0) {
                        this.setLoadData(node, node.children);
                    }
                    parent.children.push(obj);
                });
            }
        },
        addNode(parent, node) {
            const obj = Object.assign({}, node, { children: [] });
            this.$set(obj, '_key', key++);
            this.$set(obj, 'parent', parent);
            this.$set(obj, 'expand', false);
            this.$set(obj, 'selected', false);
            // 加载的数据 checked 继承父的状态
            this.$set(obj, 'checked', parent.checked);
            this.$set(obj, 'childrenCheckedStatus', parent.checked ? '2' : '0');
            parent.children.push(obj);
        },
        removeNode(node) {
            if (node.parent) {
                const parent = node.parent;
                node.parent = null;
                const index = parent.children.indexOf(node);
                if (index != -1) {
                    parent.children.splice(index, 1);
                    const _node = parent.children.length > 0 ? parent.children[0] : parent;
                    this.setParent(_node);
                }
            }
        }
    }
};
</script>
