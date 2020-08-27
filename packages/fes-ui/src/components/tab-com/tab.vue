<template>
    <transition name="tabfade">
        <div v-show="show" class="ui-tab">
            <slot />
        </div>
    </transition>
</template>
<script>
import { findComponentUpward } from '../../utils/util.js';

export default {
    name: 'Tab',
    props: {
        name: {
            type: [String, Number],
            default: undefined
        },
        label: {
            type: [String, Object],
            required: true
        },
        icon: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tabName: '',
            parent: findComponentUpward(this, 'Tabs')
        };
    },
    computed: {
        show() {
            return this.tabName == this.parent.activeKey;
        }
    },
    mounted() {
        this.parent.addTab(this);
    },
    destroyed() {
        this.parent.removeTab(this);
    }
};
</script>
