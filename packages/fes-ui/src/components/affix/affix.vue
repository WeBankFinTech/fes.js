<template>
    <div :class="{ 'ui-affix': affix }" :style="styles">
        <slot />
    </div>
</template>
<script>
import EventListener from '../../utils/EventListener.js';
import { getScroll } from '../../utils/util';

/**
    * props参数说明
    * @param {offsetTop}: 距离滚动元素顶部的距离
    * @param {offsetBottom}: 距离滚动元素底部的距离
    * @param {target}: 滚动的元素，需要区分是window滚动还是元素内滚动
    * */
export default {
    name: 'Affix',
    props: {
        offsetTop: {
            type: Number,
            default: 0
        },
        offsetBottom: {
            type: Number,
            default: undefined
        },
        target: {
            type: Function,
            default: () => document.body
        }
    },
    data() {
        return {
            affix: false, // 是否激活当前图钉
            styles: null,
            elHeight: 0
        };
    },
    computed: {
        offsetType() {
            let type = 'top';
            if (this.offsetBottom >= 0) {
                type = 'bottom';
            }
            return type;
        }
    },
    watch: {
        affix(value) {
            this.$emit('on-change', value);
        }
    },
    mounted() {
        this.$nextTick(() => {
            // 保存元素高度，防止当元素fixed时候内层div脱离文档流时this.$el.getBoundingClientRect()拿到的el_rect.bottom = el_rect.top导致高度=0时出现的闪烁问题
            this._target = this.target();
            const rect = this.$el.getBoundingClientRect();
            const target_rect = this._target.getBoundingClientRect();
            this._height = rect.height;
            this._width = rect.width;
            this.initDistance = rect.top - target_rect.top;
            this._scrollEvent = EventListener.listen(this._target, 'scroll', this.handleScroll);
            this._resizeEvent = EventListener.listen(this._target, 'resize', this.handleScroll);
            this.handleScroll();
        });
    },
    beforeDestroy() {
        // ready的时候已经绑定了事件，destroy的时候直接删除
        this._scrollEvent.remove();
        this._resizeEvent.remove();
    },
    methods: {
        handleScroll() {
            const el = this.$el;
            const target = this._target;
            // 获取当前元素的位置信息
            const rect = el.getBoundingClientRect();
            // 获取父亲元素坐标信息
            const target_rect = target.getBoundingClientRect();

            const scrollTop = getScroll(target, true); // 获取父亲元素滚动条信息scrollTop
            const scrollLeft = getScroll(target, false);
            const clientLeft = el.clientLeft || 0;
            const left = rect.left + scrollLeft - clientLeft;

            const targetHeight = target_rect.height;
            if (this.offsetType === 'top') {
                // 解决人为设的offsetTop比父级滚动元素高度还高的情况的bug
                if ((this.offsetTop + this._height) > targetHeight) {
                    return;
                }
                // Fixed Top
                // 当父滚动元素滚动高度+设定的图钉顶部距父元素顶部的距离 >= 一开始图钉相对父元素文档流的距离，则满足条件，固定
                if (this.offsetTop + scrollTop >= this.initDistance) {
                    if (!this.affix) {
                        this.affix = true;
                        this.styles = {
                            top: `${this.offsetTop + target_rect.top}px`,
                            left: `${left}px`,
                            height: `${this._height}px`,
                            width: `${this._width}px`
                        };
                    }
                } else if (this.affix) {
                    this.affix = false;
                    this.styles = null;
                }
            } else {
                if ((this.offsetBottom + this._height) > targetHeight) {
                    return;
                }
                // Fixed Bottom
                // 当一开始图钉相对父元素文档流的距离 + 本身高度 + 设定的图钉底部距父元素底边的距离 > 父元素滚动高度 + 父元素本身高度时，固定
                if ((this.initDistance + this._height + this.offsetBottom) > (scrollTop + targetHeight)) {
                    if (!this.affix) {
                        this.affix = true;
                        this.styles = {
                            top: `${target_rect.bottom - this.offsetBottom - this._height}px`,
                            left: `${left}px`,
                            height: `${this._height}px`,
                            width: `${this._width}px`
                        };
                    }
                } else if (this.affix) {
                    this.affix = false;
                    this.styles = null;
                }
            }
        }
    }
};
</script>
