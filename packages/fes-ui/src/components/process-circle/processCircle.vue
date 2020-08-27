<template>
    <div :style="getSize" class="ui-process-circle">
        <svg viewBox="0 0 100 100">
            <path :d="pathString" :stroke="trailColor" :stroke-width="trailWidth" :fill-opacity="0" />
            <path :d="pathString" :stroke-linecap="strokeType" :stroke="strokeColor" :stroke-width="strokeWidth" :style="pathStyle" fill-opacity="0" />
        </svg>
        <div class="ui-process-circle-inner">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProcessCircle',
    props: {
        percent: {
            type: Number,
            default: 0
        },
        size: {
            type: Number,
            default: 120
        },
        strokeWidth: {
            type: Number,
            default: 6
        },
        strokeColor: {
            type: String,
            default: '#3399ff'
        },
        strokeType: {
            validator: value => ['square', 'round'].indexOf(value) !== -1,
            default: 'round'
        },
        trailWidth: {
            type: Number,
            default: 5
        },
        trailColor: {
            type: String,
            default: '#eaeef2'
        }
    },
    computed: {
        getSize() {
            return {
                width: `${this.size}px`,
                height: `${this.size}px`
            };
        },
        radius() {
            return 50 - (this.strokeWidth / 2);
        },
        pathString() {
            return `M 50 , 50 m 0 ,-${this.radius} a ${this.radius} , ${this.radius} 0 1 1 0 , ${2 * this.radius} a ${this.radius} , ${this.radius} 0 1 1 0 , -${2 * this.radius}`;
        },
        circleLen() {
            return Math.PI * 2 * this.radius;
        },
        pathStyle() {
            return {
                'stroke-dasharray': `${this.circleLen}px ${this.circleLen}px`,
                'stroke-dashoffset': `${((100 - this.percent) / 100 * this.circleLen)}px`,
                transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
            };
        }
    }
};
</script>
