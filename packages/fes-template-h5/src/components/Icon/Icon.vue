<template>
    <span
        :aria-label="type"
        v-bind="$attrs"
        :tabIndex="iconTabIndex"
        role="img"
        class="inner-icon"
    >
        <!-- <VueIcon :class="svgCls" :icon="icon" :style="svgStyle" /> -->
    </span>
</template>

<script>
// import VueIcon from './IconBase';
import icons from './icons';

export default {
    name: 'Icon',
    components: {
        // VueIcon
    },
    props: ['type', 'spin', 'rotate', 'tabIndex'],
    computed: {
        icon() {
            console.log(icons[this.type]);
            return icons[this.type];
        },
        svgCls() {
            return {
                'inner-icon--spin': !!this.spin || this.type === 'loading'
            };
        },
        svgStyle() {
            return this.rotate
                ? {
                    msTransform: `rotate(${this.rotate}deg)`,
                    transform: `rotate(${this.rotate}deg)`
                }
                : null;
        },
        iconTabIndex() {
            let iconTabIndex = this.tabIndex;
            if (iconTabIndex == null && this.$listeners.click) {
                iconTabIndex = -1;
            }
            return iconTabIndex;
        }
    }
};
</script>
