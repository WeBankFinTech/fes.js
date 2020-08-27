<template>
    <div :style="getStyle" class="ui-split-item">
        <slot />
    </div>
</template>
<script>
import * as util from '../../utils/util.js';

export default {
    props: {
        min: {
            type: [Number, String],
            default: undefined
        },
        max: {
            type: [Number, String],
            default: undefined
        },
        width: {
            type: [Number, String],
            default: undefined
        },
        height: {
            type: [Number, String],
            default: undefined
        }
    },
    data() {
        return {
            index: null,
            parent: this.$parent,
            currentWidth: 0,
            currentHeight: 0,
            currentChange: 0,
            isFullScreen: false
        };
    },
    computed: {
        minSize() {
            let min = this.min;
            if (util.isString(min)) {
                min = Number(min);
            }
            if (min < 1) {
                const diretion = this.parent.diretion;
                if (diretion == 'horizontal') {
                    min = this.parent.clientWidth * min;
                }
                if (diretion == 'vertical') {
                    min = this.parent.clientHeight * min;
                }
            }
            return min;
        },
        maxSize() {
            let max = this.max;
            if (util.isString(max)) {
                max = Number(max);
            }
            if (max < 1) {
                const diretion = this.parent.diretion;
                if (diretion == 'horizontal') {
                    max = this.parent.clientWidth * max;
                }
                if (diretion == 'vertical') {
                    max = this.parent.clientHeight * max;
                }
            }
            return max;
        },
        cWidth() {
            return this.currentWidth + this.currentChange;
        },
        cHeight() {
            return this.currentHeight + this.currentChange;
        },
        left() {
            return this.parent.getLeft(this.index);
        },
        top() {
            return this.parent.getTop(this.index);
        },
        getStyle() {
            if (!this.isFullScreen) {
                const diretion = this.parent.diretion;
                if (diretion == 'horizontal') {
                    return {
                        left: `${this.left}px`,
                        top: 0,
                        bottom: 0,
                        width: `${this.cWidth}px`
                    };
                }
                if (diretion == 'vertical') {
                    return {
                        top: `${this.top}px`,
                        left: 0,
                        right: 0,
                        height: `${this.cHeight}px`
                    };
                }
            } else {
                return {
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    'z-index': 2010
                };
            }
        }
    },
    watch: {
        height() {
            this.parent.initItem();
        },
        width() {
            this.parent.initItem();
        },
        cWidth() {
            this.$emit('on-change', {
                height: this.cHeight,
                width: this.cWidth
            });
        },
        cHeight() {
            this.$emit('on-change', {
                height: this.cHeight,
                width: this.cWidth
            });
        }
    },
    mounted() {
        this.index = this.parent.$children.indexOf(this) + 1;
        this.parent.addItem(this);
    },
    beforeDestroy() {
        this.parent.removeItem(this);
    },
    methods: {
        fullScreen() {
            this.isFullScreen = true;
        },
        releaseFullScreen() {
            this.isFullScreen = false;
        }
    }
};
</script>
