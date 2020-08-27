<template>
    <div
        :class="getClass"
        :style="styleObject"
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
        class="ui-tooltip"
    >
        <div class="ui-tooltip-swap">
            <div class="ui-tooltip-arrow" />
            <div class="ui-tooltip-inner">
                <div v-if="isText" class="ui-tooltip-text">
                    <Icon v-if="confirm" type="md-help-circle" />
                    {{text}}
                </div>
                <div v-if="isHtml" v-html="xssFilter(html)" />
                <div v-if="isComponent">
                    <tooltip-component :component="component" />
                </div>
                <div v-if="confirm" class="ui-tooltip-buttons">
                    <div @click="ok" class="ui-button">
                        {{t('el.tooltip.confirm')}}
                    </div>
                    <div @click="cancel" class="ui-button">
                        {{t('el.tooltip.cancel')}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import xss, { safeAttrValue } from 'xss';
import emitter from '../../mixins/emitter';
import tooltipComponent from './tooltipComponent.vue';
import locale from '../../i18n/mixin';
import Icon from '../icon';

export default {
    name: 'Tooltip',
    components: {
        Icon,
        tooltipComponent
    },
    mixins: [emitter, locale],
    props: {
        text: {
            type: String,
            default: undefined
        },
        html: {
            type: String,
            default: undefined
        },
        component: {
            type: [Object, null],
            default: undefined
        },
        styleObject: {
            type: Object,
            default: undefined
        },
        direction: {
            type: String,
            default: undefined
        },
        align: {
            type: String,
            default: undefined
        },
        confirm: {
            type: [Boolean, String],
            default: undefined
        }
    },
    computed: {
        isComponent() {
            return this.component != null && this.component.constructor === Vue;
        },
        isHtml() {
            return !this.isComponent && this.html && this.html.length > 0;
        },
        isText() {
            return (
                !this.isComponent && !this.isHtml && this.text && this.text.length > 0
            );
        },
        getClass() {
            const arr = [
                `ui-tooltip-direction-${this.direction}`,
                `ui-tooltip-align-${this.align}`
            ];
            if (this.isHtml || this.isComponent) {
                arr.push('ui-tooltip-rich');
            }
            if (
                this.confirm === 'true'
                || this.confirm === 'confirm'
                || this.confirm
            ) {
                arr.push('ui-tooltip-confirm');
            }
            return arr;
        }
    },
    methods: {
        xssFilter(html) {
            return xss(html, {
                onIgnoreTagAttr(tag, name, value) {
                    if (name === 'style' || name === 'class') {
                        // 通过内置的escapeAttrValue函数来对属性值进行转义
                        return `${name}="${safeAttrValue(tag, name, value)}"`;
                    }
                }
            });
        },
        ok() {
            this.dispatch('TooltipDirective', 'tooltip.ok');
        },
        cancel() {
            this.dispatch('TooltipDirective', 'tooltip.cancel');
        },
        mouseenter() {
            this.dispatch('TooltipDirective', 'tooltip.mouseenter');
        },
        mouseleave() {
            this.dispatch('TooltipDirective', 'tooltip.mouseleave');
        }
    }
};
</script>
