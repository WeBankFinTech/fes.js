<template>
    <div v-show="isShow" :class="{ scroll: isScroll, 'full-screen': isFullScreen }" @scroll="scroll" class="ui-modal">
        <div ref="dialog" class="ui-modal-dialog">
            <div class="ui-modal-title">
                <span class="ui-modal-title-main">
                    {{title}}
                </span>
                <span class="ui-modal-title-sub">
                    {{subTitle}}
                </span>
                <Icon @click="handleClose" type="md-close" />
                <Icon v-if="canFullScreen" @click="fullScreen" type="md-resize" />
            </div>
            <div :style="getStyle" class="ui-modal-body">
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
import Icon from '../icon';
import * as util from '../../utils/util';
import elementResizeEvent from '../../utils/elementResizeEvent';

export default {
    components: {
        Icon
    },
    props: {
        title: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            default: undefined
        },
        width: {
            type: [Number, String],
            default: 400
        },
        closeOnClickShadow: {
            type: Boolean,
            default: true
        },
        canFullScreen: {
            type: Boolean,
            default: false
        },
        disableEsc: {
            type: Boolean,
            default: false
        },
        beforeClose: {
            type: Function,
            default: undefined
        }
    },
    data() {
        return {
            isShow: false,
            isScroll: false,
            isFullScreen: false
        };
    },
    computed: {
        getStyle() {
            if (this.width) {
                return {
                    width: `${this.width}px`
                };
            }
            return {};
        }
    },
    watch: {
        isShow() {
            const body = document.body;
            if (this.isShow) {
                // 必须这样，要不然，这个点击事件会触发
                if (this.closeOnClickShadow) {
                    setTimeout(() => {
                        this.$el.addEventListener('click', this.clickFn, false);
                    }, 0);
                }
                util.addClass(body, 'ui-modal-open');

                // 当modal中的内容超出整个屏幕时，modal-dialog用absolute定位不能撑开滚动，导致看不全，需要特殊处理
                this.$nextTick(this.computeScroll);
            } else {
                util.removeClass(body, 'ui-modal-open');
                if (this.closeOnClickShadow) {
                    this.$el.removeEventListener('click', this.clickFn);
                }
            }
        }
    },
    mounted() {
        // 监听esc
        document.addEventListener('keydown', this.esc, false);
        elementResizeEvent(this.$refs.dialog, this.computeScroll);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.esc);
        elementResizeEvent.unbind(this.$refs.dialog);
    },
    methods: {
        computeScroll() {
            const bodyHeight = window.innerHeight;
            const dialogElemStyle = window.getComputedStyle(this.$refs.dialog, null);
            const height = /^([0-9]*)/.exec(dialogElemStyle.height)[0];
            if (height > bodyHeight - 50) {
                this.isScroll = true;
            } else {
                this.isScroll = false;
            }
        },
        esc(event) {
            // 禁止esc键
            if (this.disableEsc) return;
            const which = event.which || event.keyCode;

            if (this.isShow && which == 27) {
                // 若modal已全屏，esc先取消全屏
                if (this.isFullScreen) {
                    return this.fullScreen();
                }
                this.handleClose();
            }
        },
        clickFn(event) {
            if (event.target === this.$el && this.isShow) {
                this.handleClose();
            }
        },
        async handleClose() {
            // beforeClose 关闭前钩子函数，可以返回promise
            let close = true;
            if (this.beforeClose) {
                try {
                    close = await this.beforeClose({ isFullScreen: this.isFullScreen });
                } catch (e) {
                    close = false;
                }
            }
            if (close) {
                this.close();
            }
        },
        close() {
            this.isShow = false;
            this.$emit('on-close');
        },
        hide() {
            this.handleClose();
        },
        scroll(event) {
            this.$emit('on-scroll', event);
        },
        show() {
            this.isShow = true;
        },
        fullScreen() {
            this.isFullScreen = !this.isFullScreen;
        }
    }
};
</script>
