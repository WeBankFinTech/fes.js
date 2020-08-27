<template>
    <div :class="{ bordered }" class="ui-collapse">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Collapse',
    props: {
        value: {
            type: [String, Number, Array],
            default: null
        },
        bordered: {
            type: Boolean,
            default: false
        },
        accordion: {
            type: Boolean,
            default: false
        },
        iconPosition: {
            validator(value) {
                return ['left', 'right'].includes(value);
            },
            default: 'right'
        }
    },
    data() {
        return {
            activeNames: null
        };
    },
    watch: {
        value: {
            handler() {
                if (JSON.stringify(this.value) !== JSON.stringify(this.activeNames)) {
                    this.resetActiveNames();
                }
            },
            immediate: true
        }
    },
    methods: {
        resetActiveNames() {
            if (this.accordion && Array.isArray(this.value)) {
                this.activeNames = this.value[0];
                this.noticeParent();
            } else {
                this.activeNames = this.value;
            }
        },
        change(key, del) {
            if (this.accordion) {
                this.activeNames = del ? '' : key;
            } else if (del) {
                if (Array.isArray(this.activeNames)) {
                    this.activeNames = this.activeNames.filter(name => name !== key);
                } else {
                    this.activeNames = '';
                }
            } else if (Array.isArray(this.activeNames)) {
                this.activeNames.push(key);
            } else if (this.activeNames) {
                this.activeNames = [this.activeNames, key];
            } else {
                this.activeNames = [key];
            }
            this.noticeParent();
        },
        noticeParent() {
            this.$emit('input', this.activeNames);
            this.$emit('change', this.activeNames);
        }
    }
};
</script>
