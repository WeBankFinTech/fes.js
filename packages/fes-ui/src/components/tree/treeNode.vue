<template>
    <li class="ui-tree-node">
        <template v-if="showArrow">
            <Icon v-if="!dataLoading" :type="getArrowType(node)" @click="toggle(node)" class="ui-expand-arrow" />
            <i v-if="dataLoading" class="loading"> <Loading size="14px" color="#657180" /> </i>
        </template>
        <i v-else class="ui-expand-null" />

        <label v-if="multiple" :class="getCheckClass(node)" @click="clickCheckBox" class="ui-checkbox">
            <span class="ui-checkbox-inner" />
        </label>

        <nodeText :root="rootTree" :node="node" @on-click="clickNode" />

        <ul v-if="node.children && node.children.length > 0" v-show="node.expand" :class="getClass">
            <Tree-node v-for="sonNode in node.children" :key="sonNode._key" :parent-node.sync="node" :node.sync="sonNode" :multiple="multiple" />
        </ul>
    </li>
</template>
<script>
import emitter from '../../mixins/emitter';
import { findComponentUpward } from '../../utils/util';
import loading from '../loading/loading.vue';
import nodeText from './nodeText.vue';
import Icon from '../icon';

export default {
    name: 'TreeNode',
    components: {
        Icon,
        loading,
        nodeText
    },
    mixins: [emitter],
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        parentNode: { // 上级节点
            type: Object,
            default: undefined
        },
        node: { // 本节点
            type: Object,
            default: undefined
        }
    },
    data() {
        return {
            rootTree: findComponentUpward(this, 'Tree'),
            dataLoading: false,
            dataLoaded: false
        };
    },
    computed: {
        getClass() {
            const arr = ['ui-tree', 'ui-child-tree'];
            if (this.node.onlyDataChild) {
                arr.push('ui-tree-just-data');
            }
            return arr;
        },
        showArrow() {
            if (!this.rootTree.loadData) {
                return this.node.children && this.node.children.length > 0;
            }
            if (this.dataLoaded) {
                return this.node.children && this.node.children.length > 0;
            }
            return true;
        }
    },
    methods: {
        getArrowType(node) {
            let type = '';
            if (!node.expand) {
                type = 'md-arrow-dropright';
            } else {
                type = 'md-arrow-dropdown';
            }
            return type;
        },
        getCheckClass(node) {
            const arr = [];
            if (node.childrenCheckedStatus == '1') {
                arr.push('ui-checkbox-indeterminate');
            }
            if (node.childrenCheckedStatus == '2') {
                arr.push('ui-checkbox-checked');
            }
            return arr;
        },
        toggle(node) {
            if (this.rootTree.loadData && !this.dataLoaded) {
                this.dataLoading = true;
                this.rootTree.loadData(this.node, this.addData);
            } else {
                node.expand = !node.expand;
            }
        },
        addData(data) {
            this.dispatch('Tree', 'on-load-data', [this.node, data]);
            this.node.expand = true;
            this.dataLoading = false;
            this.dataLoaded = true;
        },
        clickNode() {
            if (!this.rootTree.multiple) {
                this.dispatch('Tree', 'on-node-click', this.node);
            } else {
                this.dispatch('Tree', 'on-check-click', this.node);
            }
        },
        clickCheckBox() {
            if (this.rootTree.multiple) {
                this.dispatch('Tree', 'on-check-click', this.node);
            }
        }
    }
};
</script>
