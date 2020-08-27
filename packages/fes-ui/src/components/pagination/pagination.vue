<template>
    <ul v-show="total > 0" class="ui-page">
        <li :title="t('el.pagination.prev')" @click="last" class="ui-page-prev">
            <Icon type="ios-arrow-back" />
        </li>
        <li
            v-if="showFirst"
            :title="t('el.pagination.first')"
            @click="go(1)"
            class="ui-page-item"
        >
            1
        </li>
        <li
            v-if="showFirst"
            :title="t('el.pagination.pprev', { n: len })"
            @click="prev()"
            class="ui-page-item-jump-prev"
        >
            <Icon type="ios-arrow-back" />
            <Icon class="second-icon" type="ios-arrow-back" />
        </li>
        <li
            v-for="(code, index) in codes"
            :key="index"
            :class="{ 'ui-page-item-active': myCurrent == code }"
            :title="t('el.pagination.n', { n: code })"
            @click="go(code)"
            class="ui-page-item"
        >
            {{code}}
        </li>
        <li
            v-if="showLast"
            :title="t('el.pagination.nnext', { n: len })"
            @click="nnext()"
            class="ui-page-item-jump-next"
        >
            <Icon type="ios-arrow-forward" />
            <Icon class="second-icon" type="ios-arrow-forward" />
        </li>
        <li
            v-if="showLast"
            :title="t('el.pagination.last')"
            @click="go(total)"
            class="ui-page-item"
        >
            {{total}}
        </li>
        <li :title="t('el.pagination.next')" @click="next" class="ui-page-next">
            <Icon type="ios-arrow-forward" />
        </li>
        <li v-if="showSizeChanger" class="ui-page-select">
            <wb-select
                v-model="mySize"
                :clearable="false"
                @on-change="changePageSize"
            >
                <wb-option
                    v-for="(i, index) in pageSizeList"
                    :key="index"
                    :value="i"
                >
                    {{t("el.pagination.select", { n: i })}}
                </wb-option>
            </wb-select>
        </li>
        <li
            v-if="showQuickJumper"
            @keydown.enter="jumper"
            class="ui-page-quick-jumper"
        >
            {{t("el.pagination.jumper.pre")}}
            <wb-input v-model="jumperPage" class="jumper-input" />
            {{t("el.pagination.jumper.next")}}
        </li>
    </ul>
</template>
<script>
import Icon from '../icon';
import Select from '../select';
import WbInput from '../input';
import locale from '../../i18n/mixin';

const { WbSelect, WbOption } = Select;
export default {
    components: {
        Icon,
        WbSelect,
        WbOption,
        WbInput
    },
    mixins: [locale],
    props: {
        size: {
            // 分页大小
            type: Number,
            default: 8
        },
        current: {
            // 当前页面
            type: Number,
            default: 1
        },
        total: {
            // 总页数
            type: Number,
            default: 0
        },
        locking: {
            type: Boolean,
            default: false
        },
        showSizeChanger: {
            type: Boolean,
            default: true
        },
        showQuickJumper: {
            type: Boolean,
            default: false
        },
        sizeList: {
            type: Array,
            default() {
                return [8, 16, 32, 50, 100];
            }
        }
    },
    data() {
        return {
            pageSizeList: this.sizeList,
            len: 6,
            myCurrent: this.current,
            mySize: this.size,
            jumperPage: ''
        };
    },
    computed: {
        pageCode() {
            const pageCode = [];
            for (let i = 1; i <= this.total; i++) {
                pageCode.push(i);
            }
            return pageCode;
        },
        codes() {
            const result = [];
            if (this.pageCode.length > 0) {
                this.pageCode.slice(0).forEach((item) => {
                    if (
                        Math.floor((this.myCurrent - 1) / this.len) * this.len
                        < item
                    ) {
                        result.push(item);
                    }
                });
            }
            return result.slice(0, this.len);
        },
        showFirst() {
            return this.codes[0] > this.len;
        },
        showLast() {
            return this.codes[this.len - 1] < this.total;
        }
    },
    watch: {
        current(value) {
            if (this.myCurrent === value) {
                return;
            }
            this.myCurrent = value;
        }
    },
    mounted() {
        if (this.pageSizeList.indexOf(this.size) == -1) {
            this.pageSizeList.push(this.size);
        }
    },
    methods: {
        dispatch() {
            this.$emit('on-change', {
                current: this.myCurrent,
                size: this.mySize
            });
            this.$emit('update:current', this.myCurrent);
            this.$emit('update:size', this.mySize);
        },
        last() {
            if (this.myCurrent > 1 && !this.locking) {
                this.myCurrent -= 1;
                this.dispatch();
            }
        },
        next() {
            if (this.myCurrent < this.total && !this.locking) {
                this.myCurrent += 1;
                this.dispatch();
            }
        },
        prev() {
            if (this.myCurrent > 1 && !this.locking) {
                this.myCurrent -= this.len;
                if (this.myCurrent < 1) {
                    this.myCurrent = 1;
                }
                this.dispatch();
            }
        },
        nnext() {
            if (this.myCurrent < this.total && !this.locking) {
                this.myCurrent += this.len;
                if (this.myCurrent > this.total) {
                    this.myCurrent = this.total;
                }
                this.dispatch();
            }
        },
        go(code) {
            if (
                this.myCurrent >= 1
                && this.myCurrent <= this.total
                && !this.locking
            ) {
                this.myCurrent = code;
                this.dispatch();
            }
        },
        jumper() {
            this.go(this.jumperPage);
        },
        changePageSize() {
            this.myCurrent = 1;
            this.dispatch();
        }
    }
};
</script>
