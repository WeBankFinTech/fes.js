<template>
    <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
    >
        <slot />
    </transition>
</template>

<script>
export default {
    methods: {
        beforeEnter(el) {
            // 动画之前
            el.style.height = 0;
            el.style.transition = 'height .15s ease-out';
        },
        enter(el) {
            // 动画过程
            if (el.scrollHeight !== 0) {
                el.style.height = `${el.scrollHeight}px`;
            } else {
                el.style.height = '';
            }
        },
        afterEnter(el) {
            // 动画之后
            el.style.transition = '';
            el.style.height = '';
        },
        beforeLeave(el) {
            el.style.height = `${el.scrollHeight}px`;
            el.style.overflow = 'hidden';
        },
        leave(el) {
            if (el.scrollHeight !== 0) {
                el.style.transition = 'height .15s cubic-bezier(0.55, 0.055, 0.675, 0.19)';
                el.style.height = 0;
            }
        },
        afterLeave(el) {
            el.style.transition = '';
            el.style.height = '';
        }
    }
};
</script>
