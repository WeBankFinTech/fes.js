<template>
    <span
        :class="{ disabled: disabled }"
        :tabindex="tabindex"
        @mouseenter="showClear = true"
        @mouseleave="showClear = false"
        @click="$emit('click')"
        @focus="$emit('on-focus', $event)"
        @blur="$emit('on-blur', $event)"
        @keydown="$emit('keydown', $event)"
        class="ui-readonly-input"
    >
        <span :class="{ placeholder: !value }" class="ui-readonly-input-content">
            <slot>{{value || placeholder}}</slot>
        </span>
        <Icon v-if="icon" v-show="!showClearIcon" :type="icon" />
        <Icon v-show="showClearIcon" @click.stop="$emit('clear')" type="md-close-circle" />
    </span>
</template>

<script>
import Icon from '../icon';

export default {
    components: {
        Icon
    },
    props: {
        value: {
            type: [String, Array],
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showClear: false
        };
    },
    computed: {
        showClearIcon() {
            return this.clearable && !this.disabled && !this.readonly && this.value && this.showClear;
        },
        tabindex() {
            if (this.disabled || this.readonly) {
                return -1;
            }
            return 0;
        }
    }
};
</script>
