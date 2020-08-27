<template>
    <div :class="getClass" :style="getStyle" class="ui-input-swap">
        <div ref="prepend" v-if="prepend" class="ui-input-prepend">
            <slot name="prepend" />
        </div>
        <div @mouseenter="over = true" @mouseleave="over = false" class="ui-input-content">
            <template v-if="icon">
                <Icon :type="icon" @click.stop="handleIconClick" class="ui-input-icon" />
            </template>
            <template v-if="password">
                <Icon v-if="showPassword" @click.stop="changeInputType" class="ui-input-icon" type="md-eye" />
                <Icon v-if="!showPassword" @click.stop="changeInputType" class="ui-input-icon" type="md-eye-off" />
            </template>
            <template v-if="clearable && !readonly && !disabled && over">
                <Icon @click.stop="clear" class="ui-input-icon" type="md-close-circle" />
            </template>
            <template v-if="isNormal">
                <input :value="currentValue"
                       :maxlength="maxlength"
                       :readonly="readonly"
                       :type="currentType"
                       :disabled="disabled"
                       :placeholder="placeholder"
                       :autocomplete="autocomplete"
                       :name="name"
                       @keyup.enter="handleEnter"
                       @keyup.delete="handleDelete"
                       @focus="handleFocus"
                       @blur="handleBlur"
                       @input="handleInput"
                       @click="click"
                       class="ui-input"
                >
            </template>
            <template v-if="type == 'file'">
                <div class="ui-upload">
                    <Wb-button :disabled="disabled || readonly" @click="chooseFile" type="ghost" icon="md-cloud-upload">
                        {{placeholder || t('el.input.chooseFile')}}
                    </Wb-button>
                    <span class="ui-input-file-text">{{currentValue && currentValue.name}}</span>
                    <input ref="input" :accept="accept" @change="updateFile" type="file" class="ui-upload-file">
                </div>
            </template>
            <template v-if="textarea">
                <textarea v-auto-row="autosize"
                          :value="currentValue"
                          :rows="rows"
                          :maxlength="maxlength"
                          :readonly="readonly"
                          :disabled="disabled"
                          :placeholder="placeholder"
                          @keyup.enter="handleEnter"
                          @keyup.delete="handleDelete"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          @input="handleInput"
                          @click="click"
                          class="ui-input"
                />
            </template>
        </div>
        <div ref="append" v-if="append" class="ui-input-append">
            <slot name="append" />
        </div>
    </div>
</template>
<script>
import autoRow from '../../directives/autoRow';
import emitter from '../../mixins/emitter';
import locale from '../../i18n/mixin';
import Icon from '../icon';

export default {
    name: 'Input',
    components: {
        Icon
    },
    directives: {
        autoRow
    },
    mixins: [emitter, locale],
    props: {
        value: {
            type: [Number, String, File],
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: undefined
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            default: undefined
        },
        icon: {
            type: String,
            default: undefined
        },
        rows: {
            type: Number,
            default: undefined
        },
        width: {
            type: String,
            default: undefined
        },
        name: {
            type: String,
            default: undefined
        },
        autocomplete: {
            type: String,
            default: undefined
        },
        autosize: {
            type: [Boolean, Object],
            default: undefined
        },
        accept: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            currentValue: this.value,
            password: false,
            textarea: false,
            showPassword: true,
            prepend: true,
            append: true,
            currentType: this.type,
            over: false
        };
    },
    computed: {
        isNormal() {
            return ['text', 'password', 'number'].indexOf(this.currentType) != -1;
        },
        getClass() {
            const arr = [`ui-input-${this.currentType}`];
            if (this.prepend || this.append) {
                arr.push('ui-input-group');
                this.prepend && arr.push('ui-input-group-prepend');
                this.append && arr.push('ui-input-group-append');
            }
            if (this.readonly) {
                arr.push('ui-input-readonly');
            }
            if (this.disabled) {
                arr.push('ui-input-disabled');
            }
            return arr;
        },
        getStyle() {
            if (this.width) {
                return {
                    width: this.width
                };
            }
            return null;
        }
    },
    watch: {
        value(val) {
            this.setCurrentValue(val);
        }
    },
    created() {
        if (this.currentType !== 'textarea') {
            this.prepend = this.$slots.prepend !== undefined;
            this.append = this.$slots.append !== undefined;
        } else {
            this.prepend = false;
            this.append = false;
        }
        this.slotReady = true;

        if (this.currentType == 'password') {
            this.password = true;
        } else if (this.currentType == 'textarea') {
            this.textarea = true;
        }
    },
    methods: {
        handleDelete(event) {
            // IE9删除时不触发input事件
            if (navigator.userAgent.indexOf('MSIE 9') === -1) return;
            this.handleInput(event);
        },
        handleIconClick(event) {
            if (this.readonly || this.disabled) {
                return;
            }
            this.$emit('on-click', event);
        },
        handleEnter(event) {
            this.$emit('on-enter', event);
        },
        handleFocus(event) {
            this.$emit('on-focus', event);
        },
        handleBlur(event) {
            this.$emit('on-blur', event);
            this.dispatch('FormItem', 'on-form-blur', [this.currentValue]);
        },
        handleInput(event) {
            if (this.disabled || this.readonly) return;
            let value = event.target.value;
            if (this.number) value = Number.isNaN(Number(value)) ? value : Number(value);
            this.$emit('input', value, event);
            this.$emit('on-input', value, event);
            this.$emit('on-change', value, event);
            this.setCurrentValue(value);
        },
        changeInputType() {
            this.showPassword = !this.showPassword;
            this.currentType = this.showPassword ? 'password' : 'text';
        },
        setCurrentValue(value) {
            if (value === this.currentValue) return;
            this.currentValue = value;
            this.dispatch('FormItem', 'on-form-change', [this.currentValue]);
        },
        click(e) {
            this.$emit('click', e);
        },
        chooseFile() {
            this.$refs.input.click();
        },
        updateFile(e) {
            if (this.disabled || this.readonly) return;
            const files = e.target.files;
            this.setCurrentValue(files[0]);
            this.$emit('input', files[0], e);
            this.$emit('on-change', files[0], e);
            e.target.value = '';
        },
        clear() {
            if (this.disabled || this.readonly) return;
            if (this.currentValue === '') return;
            this.$emit('input', '');
            this.$emit('on-input', '');
            this.$emit('on-change', '');
            this.setCurrentValue('');
        }
    }
};
</script>
