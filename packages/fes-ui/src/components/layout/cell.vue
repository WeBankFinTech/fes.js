<template>
    <div :class="getClass" class="ui-cell">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'Cell',
    props: {
        span: {
            required: true,
            type: [String, Number]
        },
        offset: {
            type: [String, Number],
            default: undefined
        }
    },
    computed: {
        getClass() {
            const classList = [`ui-cell-span-${this.span}`];
            if (this.offset) {
                classList.push(`ui-cell-offset-${this.offset}`);
            }
            return classList;
        }
    }
};
</script>
