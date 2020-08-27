<template>
    <div :class="{ 'ui-steps-small': size == 'small' , 'ui-steps-vertical': direction == 'vertical' }" class="ui-steps">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'Steps',
    props: {
        current: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            default: undefined
        },
        direction: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            len: 0,
            sonWidth: ''
        };
    },
    watch: {
        current() {
            this.upDateChildren();
        }
    },
    mounted() {
        this.len = this.$children.length;
        this.sonWidth = `${100 / this.len}%`;
        if (this.direction == 'vertical') {
            this.sonWidth = '100%';
        }
        this.upDateChildren();
    },
    methods: {
        upDateChildren() {
            const _this = this;
            if (this.$children) {
                this.$children.forEach((step, index) => {
                    step.index = index + 1;
                    if (step.index > _this.current) {
                        step.status = 'ready';
                    } else if (step.index == _this.current) {
                        step.status = 'doing';
                    } else {
                        step.status = 'done';
                    }
                });
            }
        }
    }
};
</script>
