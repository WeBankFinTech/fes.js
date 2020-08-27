<template>
    <div v-clickoutside="reset" class="ui-table-edit-cell">
        <div v-if="!isEditing">
            {{text}}
            <Icon
                @click.stop="edit"
                type="md-create"
                size="12"
                class="edit-icon"
            />
        </div>
        <Wb-input v-else-if="editConf.type === 'input'" v-model="newValue" />
        <Wb-select
            v-else-if="editConf.type === 'select'"
            v-model="newValue"
            :multiple-limit="limit"
            :multiple="multiple"
            filterable
        >
            <wb-option
                v-for="item in optionList"
                :key="item.value"
                :value="item.value"
            >
                {{item.label}}
            </wb-option>
        </Wb-select>
        <Icon
            v-if="isEditing"
            @click="confirmChange"
            type="md-checkmark"
            size="14"
            class="edit-icon"
        />
    </div>
</template>
<script>
import Icon from '../icon';
import * as util from '../../utils/util';
import clickoutside from '../../directives/clickoutside';

export default {
    components: {
        Icon
    },
    directives: {
        clickoutside
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
    data() {
        return {
            newValue: '',
            isEditing: false,
            editConf: this.col.editableConf,
            optionList: this.col.editableConf.list || [],
            limit: this.col.editableConf.multipleLimit,
            multiple: this.col.editableConf.multiple
        };
    },
    computed: {
        text() {
            const col = this.col;
            let rst = this.trData[col.prop];
            if (util.isFunction(col.filter)) {
                rst = col.filter(rst, this.trData);
            } else if (util.isArray(rst)) {
                rst = rst.join(',');
            }
            return rst;
        }
    },
    mounted() {
        if (this.editConf.type === 'select') {
            if (this.multiple) {
                this.newValue = [];
            }
        }
    },
    methods: {
        edit() {
            this.newValue = this.text;
            if (this.editConf.type === 'select') {
                if (this.multiple) {
                    this.newValue = [].concat(this.trData[this.col.prop]);
                } else {
                    const item = this.optionList.find(
                        it => it.value === this.trData[this.col.prop]
                            || it.label === this.trData[this.col.prop]
                    );
                    this.newValue = item && item.value;
                }
            }
            this.initValue = this.newValue;
            this.isEditing = true;
        },
        confirmChange() {
            if (this.newValue === this.initValue) return this.reset();
            let valid = true;
            const { validate, confirm } = this.editConf;
            if (util.isFunction(validate)) {
                const args = [
                    this.trData[this.col.prop],
                    this.newValue,
                    this.trData
                ];
                valid = validate.apply(this.col, args);
            }
            if (confirm) {
                if (valid === true) {
                    this.showConfirm();
                } else if (valid && util.isFunction(valid.then)) {
                    valid.then(() => {
                        this.showConfirm();
                    });
                }
            } else {
                this.change();
            }
        },
        showConfirm() {
            let name = '';
            if (typeof this.col.name === 'string') {
                name = this.col.name;
            }
            this.$Message
                .confirm('修改', `是否确认修改${name}?`)
                .then((index) => {
                    if (index === 0) {
                        this.change();
                    }
                    this.reset();
                });
        },
        change() {
            if (util.isFunction(this.editConf.change)) {
                const args = [
                    this.trData[this.col.prop],
                    this.newValue,
                    this.col,
                    this.trData
                ];
                this.editConf.change.apply(null, args);
                this.reset();
            }
        },
        reset() {
            this.isEditing = false;
        }
    }
};
</script>
