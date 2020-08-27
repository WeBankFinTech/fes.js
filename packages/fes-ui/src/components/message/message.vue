<template>
    <div class="ui-message">
        <div class="ui-message-swap">
            <div class="ui-message-body">
                <div v-if="title" class="ui-message-title">
                    <Icon type="md-help-circle" />
                    <span v-html="xssFilter(title)" class="ui-message-title-text" />
                </div>
                <div v-html="xssFilter(template)" class="ui-message-content" />
            </div>
            <div class="ui-message-buttons">
                <div v-for="(button,index) in buttons" v-show="button.show" :key="index" :class="getButtonClass(button)" @click="click(index, $event)"
                     v-text="button.text" class="ui-button"
                />
            </div>
        </div>
    </div>
</template>
<script>
import xss, { safeAttrValue } from 'xss';
import emitter from '../../mixins/emitter';
import Icon from '../icon';

export default {
    name: 'Message',
    components: {
        Icon
    },
    mixins: [emitter],
    props: {
        title: {
            type: String,
            default: undefined
        },
        template: {
            type: String,
            required: true
        },
        buttons: {
            type: Array,
            default: undefined
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
        getButtonClass(button) {
            return button.class;
        },
        click(index) {
            this.dispatch('MessageSwap', 'on-close', index);
        }
    }
};
</script>
