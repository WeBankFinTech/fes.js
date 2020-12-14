<template>
    <div class="ui-table-action">
        <Wb-button
            v-for="(item, index) in actions"
            :key="index"
            :disabled="item._disabled"
            :class="['ui-table-action-text', item.disabledClassName, item._disabled && 'disabled']"
            type="text"
            @click.stop="fireAction(item, $event)"
        >
            {{ item.text }}
        </Wb-button>
    </div>
</template>
<script>
import WbButton from '../button';
export default {
    components: {
        WbButton
    },
    props: {
        col: {
            type: Object,
            default: undefined
        },
        trData: {
            type: Object,
            default: undefined
        }
    },
    computed: {
        actions() {
            return this.col.action.map((item) => {
                let _disabled = false;
                if (typeof item.disabled === 'boolean') {
                    _disabled = item.disabled;
                }
                if (typeof item.disabled === 'function') {
                    _disabled = item.disabled(this.trData);
                }
                return Object.assign({_disabled}, item);
            })
        }
    },
    methods: {
        fireAction(item, event) {
            if (!item._disabled) {
                this.$emit('on-click', item, this.trData, event);
            }
        }
    }
};
</script>
