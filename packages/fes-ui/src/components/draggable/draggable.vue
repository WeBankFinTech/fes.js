<template>
    <div class="draggable-container">
        <DraggableItem v-for="(item, index) in value" :key="index" :index="index" :item="item">
            <slot :item="item" :index="index" />
        </DraggableItem>
    </div>
</template>
<script>
import DraggableItem from './DraggableItem';
import {
    closest,
    vendorPrefix,
    arrayMove
} from './utils';
import Manager from './Manager';

export default {
    name: 'Draggable',
    components: {
        DraggableItem
    },
    props: {
        value: {
            type: Array,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            manager: new Manager(),
            collection: 'default',
            events: {
                mousedown: 'handleStart',
                mousemove: 'handleMove',
                mouseup: 'handleUp'
            }
        };
    },
    provide() {
        return {
            manager: this.manager
        };
    },
    mounted() {
        this.collection = this._uid;
        this.container = this.$el;
        this._window = window;
        Object.keys(this.events).forEach((evName) => {
            this.container.addEventListener(evName, this[this.events[evName]], false);
        });
    },
    beforeDestroy() {
        Object.keys(this.events).forEach((evName) => {
            this.container.removeEventListener(evName, this[this.events[evName]]);
        });
    },
    methods: {
        handleStart(e) {
            e.stopPropagation();
            if (this.disabled) return;
            this._pos = {
                x: e.pageX,
                y: e.pageY
            };
            const node = closest(e.target, el => el.sortableInfo && el.sortableInfo != null);
            if (node && node.sortableInfo) {
                const { index, item } = node.sortableInfo;
                this.activeNode = node;
                this.$emit('on-sort-ready', { e, item, index });
                this.handlePress(e);
            }
        },
        handlePress() {
            const nodes = this.manager.getOrderedRefs(this.collection);
            this.activeIndex = nodes.findIndex(node => node === this.activeNode);
            this.nodeRect = this.activeNode.getBoundingClientRect();
            this.width = this.nodeRect.width;
            this.height = this.nodeRect.height;
            this.offsetEdge = this.getEdgeOffset(this.activeNode);
            this.sorting = true;
        },
        handleUp() {
            this.sorting = false;
        },
        handleMove(e) {
            e.preventDefault();
            if (!this.sorting) return;
            const mouseMove = {
                x: e.pageX - this._pos.x,
                y: e.pageY - this._pos.y
            };
            if (Math.abs(mouseMove.x) > 5 || Math.abs(mouseMove.y) > 5) {
                const { index, item } = this.activeNode.sortableInfo;
                this.$emit('on-sort-start', { e, item, index });
                if (item.sortDisabled) {
                    return;
                }
                if (!this.helper) {
                    this._window.addEventListener(
                        'mousemove',
                        this.handleSortMove,
                        false
                    );
                    this._window.addEventListener('mouseup', this.handleSortEnd, false);
                    const cloneNode = this.activeNode.cloneNode(true);
                    this.activeNode.style.opacity = 0;
                    this.activeNode.style.visibility = 'hidden';
                    this.initHelper(cloneNode);
                }
            }
        },
        handleSortMove(e) {
            const mouseMove = {
                x: e.pageX - this._pos.x,
                y: e.pageY - this._pos.y
            };
            const sortingOffset = {
                left: this.offsetEdge.left + mouseMove.x,
                top: this.offsetEdge.top + mouseMove.y
            };
            this.newIndex = null;
            const nodes = this.manager.getOrderedRefs(this.collection);
            for (let i = 0; i < nodes.length; i++) {
                this._translate = {
                    x: 0,
                    y: 0
                };
                const currentNode = nodes[i];
                const width = currentNode.offsetWidth;
                const height = currentNode.offsetHeight;
                const halfOffset = {
                    width: this.width > width ? width / 2 : this.width / 2,
                    height: this.height > height ? height / 2 : this.height / 2
                };
                let edgeOffset = currentNode.edgeOffset;
                if (!edgeOffset) {
                    currentNode.edgeOffset = edgeOffset = this.getEdgeOffset(currentNode);
                }

                if (i === this.activeIndex) continue;
                if (
                    i > this.activeIndex
                    && sortingOffset.top + halfOffset.height > edgeOffset.top
                ) {
                    this.newIndex = i;
                    this._translate.y = -height;
                } else if (
                    i < this.activeIndex
                    && sortingOffset.top <= edgeOffset.top + halfOffset.height
                ) {
                    this._translate.y = height;
                    if (this.newIndex == null) {
                        this.newIndex = i;
                    }
                }
                currentNode.style[`${vendorPrefix}TransitionDuration`] = '300ms';
                currentNode.style[`${vendorPrefix}Transform`] = `translate3d(${
                    this._translate.x
                }px,${this._translate.y}px,0)`;
            }
            if (this.newIndex == null) {
                this.newIndex = this.activeIndex;
            }
            this.helper.style[`${vendorPrefix}Transform`] = `translate3d(${
                mouseMove.x
            }px,${mouseMove.y}px, 0)`;
        },
        handleSortEnd(e) {
            if (!this.helper) return;
            this._window.removeEventListener('mousemove', this.handleSortMove, false);
            this._window.removeEventListener('mouseup', this.handleSortEnd, false);
            this.helper.parentNode.removeChild(this.helper);
            this.sorting = false;
            this.activeNode.style.visibility = '';
            this.activeNode.style.opacity = '';
            const nodes = this.manager.getOrderedRefs(this.collection);
            for (let i = 0, len = nodes.length; i < len; i++) {
                const node = nodes[i];

                node.edgeOffset = null;
                node.style[`${vendorPrefix}Transform`] = '';
                node.style[`${vendorPrefix}TransitionDuration`] = '';
            }
            const { index, item } = this.activeNode.sortableInfo;
            this.$emit(
                'input',
                arrayMove(this.value, this.activeIndex, this.newIndex)
            );
            this.$emit('on-sort-end', { e, item, index });
            this.newIndex = null;
            this.helper = null;
            this.sorting = false;
        },
        initHelper(cloneNode) {
            this.helper = this.container.appendChild(cloneNode);
            this.helper.style.position = 'fixed';
            this.helper.style.top = `${this.nodeRect.top}px`;
            this.helper.style.left = `${this.nodeRect.left}px`;
            this.helper.style.width = `${this.width}px`;
            this.helper.style.height = `${this.height}px`;
        },
        getEdgeOffset(node, offset = { top: 0, left: 0 }) {
            const nodeOffset = {
                top: offset.top + node.offsetTop,
                left: offset.left + node.offsetLeft
            };
            if (node.parentNode && node.parentNode !== this.container) {
                return this.getEdgeOffset(node.parentNode, nodeOffset);
            }
            return nodeOffset;
        }
    }
};
</script>
