<template>
    <transition name="slide-to-down">
        <div ref="pickerPopup" v-show="show" :class="[position || popupPosition]" class="ui-picker-popup">
            <slot />
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        position: {
            default: null,
            validator(value) {
                // 这个值必须匹配下列字符串中的一个
                return [null, 'bottomLeft', 'bottomRight', 'topLeft', 'topRight'].indexOf(value) !== -1;
            }
        }
    },
    data() {
        return {
            popupPosition: 'bottomLeft'
        };
    },
    watch: {
        show() {
            if (!this.position && this.show) {
                this.$nextTick(() => {
                    this.calPosition();
                });
            }
        }
    },
    methods: {
        calPosition() {
            // 可以选择的弹窗位置
            // bottomLeft | bottomRight | topLeft | topRight
            // 父元素的位置
            const {
                left, right, top, bottom
            } = this.$parent.$el.getBoundingClientRect();

            // 得到滚动条的位置。
            const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            const scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;

            // 弹窗宽高，
            // 弹窗有动画，不能使用 getBoundingClientRect 获取宽高
            const contentW = this.$refs.pickerPopup.offsetWidth;
            const contentH = this.$refs.pickerPopup.offsetHeight;

            // 文档区域宽高
            const docW = document.documentElement.scrollWidth;
            const docH = document.documentElement.scrollHeight;

            const topSpace = top + scrollTop;
            const rightSpace = docW - (left + scrollLeft);
            const bottomSpace = docH - (bottom + scrollTop);
            const leftSpace = right + scrollLeft;

            // 优先级
            // bottomLeft | bottomRight | topLeft | topRight
            if (bottomSpace >= contentH) {
                if (rightSpace < contentW && leftSpace >= contentW) {
                    this.popupPosition = 'bottomRight';
                } else {
                    this.popupPosition = 'bottomLeft';
                }
            } else if (topSpace >= contentH) {
                if (rightSpace < contentW && leftSpace >= contentW) {
                    this.popupPosition = 'topRight';
                } else {
                    this.popupPosition = 'topLeft';
                }
            } else {
                this.popupPosition = 'bottomLeft';
            }
        }
    }
};
</script>
