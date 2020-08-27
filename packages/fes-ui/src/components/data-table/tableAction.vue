<template>
    <div class="ui-table-action">
        <Wb-button
            v-for="(item, index) in col.action"
            :key="index"
            @click.stop="fireAction(item, $event)"
            class="ui-table-action-text"
            type="text"
        >
            {{item.text}}
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
    methods: {
        fireAction(item, event) {
            this.$emit('on-click', item, this.trData, event);
        }
    }
};
</script>
