<template>
    <div class="ui-collapse-panel">
        <div :class="{ 'left-icon': leftArrow, disabled }" @click="handlePanel" class="ui-collapse-panel-title">
            <Icon v-if="leftArrow" :class="{ active }" type="ios-arrow-forward" />
            <div>
                <slot name="title">
                    {{title}}
                </slot>
            </div>
            <Icon v-if="rightArrow" :class="{ active }" type="ios-arrow-forward" />
        </div>
        <open-anim>
            <div v-show="active || forceRender" :class="{ 'left-icon': leftArrow }" class="ui-collapse-panel-content">
                <slot />
            </div>
        </open-anim>
    </div>
</template>

<script>
import Icon from '../icon';
import OpenAnim from './openAnim.vue';
import { findComponentUpward } from '../../utils/util';

export default {
    name: 'CollapsePanel',
    components: {
        Icon,
        OpenAnim
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        name: {
            type: [String, Number],
            required: true,
            default: null
        },
        forceRender: {
            type: Boolean,
            default: false
        },
        showArrow: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            collapse: findComponentUpward(this, 'Collapse')
        };
    },
    computed: {
        leftArrow() {
            return this.showArrow && this.collapse.iconPosition === 'left';
        },
        rightArrow() {
            return this.showArrow && this.collapse.iconPosition === 'right';
        },
        active() {
            if (this.forceRender) return true;

            const activeNames = this.collapse.activeNames;
            if (Array.isArray(activeNames)) {
                return activeNames.includes(this.name);
            }
            return this.collapse.value === this.name;
        }
    },
    methods: {
        handlePanel() {
            if (!this.disabled) {
                const active = this.forceRender ? false : this.active;
                this.collapse.change(this.name, active);
            }
        }
    }
};
</script>
