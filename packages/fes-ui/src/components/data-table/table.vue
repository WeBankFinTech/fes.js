<template>
    <div :class="classes" class="ui-table-swap">
        <slot />
        <table class="ui-table">
            <thead class="ui-table-thead">
                <tr v-for="(row, rowIndex) in headerRows" :key="rowIndex">
                    <th
                        v-for="(col, colIndex) in row"
                        :key="col.uid"
                        :colspan="col.colSpan"
                        :rowspan="col.rowSpan"
                        :style="getTdStyle(col)"
                        :class="getThClass(col, colIndex)"
                        @click="thClick(col, colIndex, $event)"
                    >
                        <template v-if="!col.type">
                            <template v-if="col.headTip">
                                <span v-tooltip="col.headTip">{{col.name}}</span>
                                <Icon type="md-information-circle-outline" color="#aaa" size="12" />
                            </template>
                            <template v-else>
                                <template v-if="typeof col.name === 'string'">
                                    {{col.name}}
                                </template>
                                <template v-else>
                                    <head-component :col="col" />
                                </template>
                                <div v-if="col.sort" class="ui-table-column-sorter">
                                    <span
                                        :class="getSortClass(col, 'up')"
                                        @click.stop="sortUp(col)"
                                        class="ui-table-column-sorter-up"
                                        title="↑"
                                    >
                                        <Icon type="md-arrow-dropup" />
                                    </span>
                                    <span
                                        :class="getSortClass(col, 'down')"
                                        @click.stop="sortDown(col)"
                                        class="ui-table-column-sorter-down"
                                        title="↓"
                                    >
                                        <Icon type="md-arrow-dropdown" />
                                    </span>
                                </div>
                            </template>
                        </template>
                        <template v-if="col.type == 'selection'">
                            <Checkbox :value="selectedAllRow" @click="changeRowsSelected" />
                        </template>
                    </th>
                </tr>
            </thead>
            <tbody class="ui-table-tbody">
                <template v-for="(trData, rowIndex) in showData">
                    <tr
                        :key="trData._rowKey"
                        :class="getTrClass(rowIndex, data[trData._index])"
                        @click="trClick(data[trData._index], rowIndex, $event)"
                    >
                        <td
                            v-for="(col, colIndex) in cols"
                            :key="col.uid"
                            :style="getTdStyle(col)"
                            :class="getTdClass(col, colIndex, data[trData._index][col.prop], data[trData._index])"
                            @click="tdClick(data[trData._index], data[trData._index][col.prop], colIndex, $event, col, trData._rowKey)"
                        >
                            <template v-if="col.type === 'expand'">
                                <div
                                    v-show="expandedList.indexOf(rowIndex) == -1"
                                    :title="t(`el.table.expandOpen`)"
                                    @click="expand(data[trData._index], rowIndex, $event)"
                                    class="ui-table-icon"
                                >
                                    <Icon type="ios-arrow-forward" />
                                </div>
                                <div
                                    v-show="expandedList.indexOf(rowIndex) != -1"
                                    :title="t(`el.table.expandClose`)"
                                    @click="expand(data[trData._index], rowIndex, $event)"
                                    class="ui-table-icon"
                                >
                                    <Icon type="ios-arrow-down" />
                                </div>
                            </template>
                            <template v-if="col.type === 'selection'">
                                <Checkbox
                                    v-model="trData._selected"
                                    :disabled="disabledRow(data[trData._index], rowIndex)"
                                    @on-change="changeRowSelected(data[trData._index], rowIndex, trData._selected)"
                                />
                            </template>
                            <template v-else>
                                <table-text
                                    v-if="!col.action && !col.component && !col.editable"
                                    :col="col"
                                    :tr-data="data[trData._index]"
                                />
                                <table-action
                                    v-if="col.action"
                                    :col="col"
                                    :tr-data="data[trData._index]"
                                    @on-click="fireAction"
                                />
                                <table-component
                                    v-if="!col.editable && col.component"
                                    :col="col"
                                    :tr-data="data[trData._index]"
                                />
                                <edit-cell
                                    v-if="col.editable && !col.component"
                                    :col="col"
                                    :tr-data="data[trData._index]"
                                />
                            </template>
                            <Icon
                                v-if="col.detailComponent"
                                :type="getTdDetailType(col, trData._rowKey)"
                                class="ui-table-detail-icon"
                            />
                        </td>
                    </tr>
                    <tr v-if="renderExpanded" :key="trData._rowKey + '_expanded'">
                        <table-expand
                            v-show="expandedList.indexOf(rowIndex) != -1"
                            :render-expanded="renderExpanded"
                            :cols="cols"
                            :tr-data="data[trData._index]"
                        />
                    </tr>
                    <tr v-for="detail in getTrDetailList(trData._rowKey)" :key="detail.key">
                        <table-detail-component
                            v-show="detail.show"
                            :cols="cols"
                            :col="detail.col"
                            :tr-data="data[trData._index]"
                        />
                    </tr>
                </template>
            </tbody>
        </table>
        <div v-if="noDataText" v-show="showData.length == 0" class="ui-table-empty">
            {{noDataText}}
        </div>
    </div>
</template>
<script>
import * as util from '../../utils/util';
import locale from '../../i18n/mixin';
import Icon from '../icon';
import tableAction from './tableAction.vue';
import tableText from './tableText.vue';
import tableComponent from './tableComponent.vue';
import tableDetailComponent from './tableDetailComponent.vue';
import headComponent from './headComponent.vue';
import tableExpand from './tableExpand.vue';
import editCell from './editCell.vue';

let rowKey = 1;
export default {
    name: 'Table',
    components: {
        Icon,
        tableAction,
        tableText,
        tableComponent,
        tableExpand,
        headComponent,
        tableDetailComponent,
        editCell
    },
    mixins: [locale],
    props: {
        data: {
            type: Array,
            default: undefined
        },
        border: {
            type: Boolean,
            default: false
        },
        trClass: {
            type: Function,
            default: undefined
        },
        noDataText: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            sortCol: null,
            renderExpanded: null,
            expandedList: [],
            showData: [],
            children: [],
            detailList: {}
        };
    },
    computed: {
        cols() {
            return this.getAllColumns(this.children).filter(
                item => !item.children.length
            );
        },
        headerRows() {
            return this.convertToRows(this.children);
        },
        classes() {
            return this.border ? 'ui-table-swap-border' : '';
        },
        selectedAllRow() {
            const ableRow = this.showData.filter(
                (...args) => !this.disabledRow(...args)
            );
            return ableRow.length && ableRow.every(item => item._selected);
        }
    },
    watch: {
        data: {
            handler() {
                this.showData = this.makeData();
            },
            deep: true
        },
        selectedAllRow() {
            this.$emit('on-select-all', this.getSelected());
        }
    },
    created() {
        this.showData = this.makeData();
    },
    methods: {
        addColumn(column) {
            this.children.push(column);
        },
        removeColumn(column) {
            const index = this.children.indexOf(column);
            if (index != -1) {
                this.children.splice(index, 1);
            }
        },
        makeData(data) {
            data = data || this.data;
            let arr = [];
            if (util.isArray(data)) {
                arr = util.deepCopy(data);
                arr.forEach((obj, index) => {
                    obj._index = index;
                    obj._rowKey = rowKey++;
                    if (obj._selected === undefined) {
                        obj._selected = false;
                    }
                });
                if (this.sortCol) {
                    this.sortData(arr);
                }
            }
            return arr;
        },
        getAllColumns(columns) {
            const result = [];
            columns.forEach((column) => {
                if (column.$options.name == 'Column') {
                    result.push(column);
                    if (column.children && column.children.length > 0) {
                        result.push.apply(result, this.getAllColumns(column.children));
                    }
                }
            });
            result.forEach((item, index) => (item.__old_index = index));
            return result.sort(
                (a, b) => a.index - b.index || a.__old_index - b.__old_index
            );
        },
        convertToRows(originColumns) {
            let maxLevel = 1;
            const traverse = (column, parent) => {
                if (parent) {
                    column.level = parent.level + 1;
                    if (maxLevel < column.level) {
                        maxLevel = column.level;
                    }
                }
                if (column.children && column.children.length > 0) {
                    let colSpan = 0;
                    column.children.forEach((subColumn) => {
                        traverse(subColumn, column);
                        colSpan += subColumn.colSpan || 1;
                    });
                    column.colSpan = colSpan;
                } else {
                    column.colSpan = 1;
                }
            };

            originColumns.forEach((column) => {
                if (column.$options.name == 'Column') {
                    column.level = 1;
                    traverse(column);
                }
            });

            const rows = [];
            for (let i = 0; i < maxLevel; i++) {
                rows.push([]);
            }

            const allColumns = this.getAllColumns(originColumns);

            allColumns.forEach((column) => {
                if (column.children.length == 0) {
                    column.rowSpan = maxLevel - column.level + 1;
                } else {
                    column.rowSpan = 1;
                }
                rows[column.level - 1].push(column);
            });

            return rows;
        },
        // 设置Tr的样式
        getTrClass(rowIndex, trData) {
            let result = `row_${rowIndex + 1} `;
            if (this.trClass && util.isFunction(this.trClass)) {
                let parent = null;
                if (this.$vnode) {
                    parent = this.$vnode.context;
                }
                const rst = this.trClass.call(parent || this, trData, rowIndex);
                if (rst) {
                    result += rst;
                }
            }
            return result;
        },
        // 设置td的个性样式
        getTdClass(col, index, tdData, trData) {
            const arr = [`col_${index + 1}`];
            if (col.classes) {
                let classes;
                if (util.isString(col.classes)) {
                    classes = col.classes.split(' ');
                } else if (util.isFunction(col.classes)) {
                    const rst = col.classes(tdData, trData);
                    if (util.isString(rst)) {
                        classes = rst.split(' ');
                    }
                }
                if (classes && classes.length > 0) {
                    classes.forEach((key) => {
                        arr.push(key);
                    });
                }
            }
            return arr;
        },
        getThClass(col) {
            let classStr = '';
            const classPrefix = 'ui-table-th-';
            if (col.headTip) {
                classStr = `${classPrefix}headtip`;
            }
            return classStr;
        },
        // 设置样式
        getTdStyle(col) {
            return {
                'text-align': col.align,
                width: col.width
            };
        },
        getSortClass(col, direction) {
            const arr = [];
            if (this.sortCol == col && col.sortDirection == direction) {
                arr.push('on');
            }
            return arr;
        },
        sortData(arr) {
            arr.sort((a, b) => {
                const direction = this.sortCol.sortDirection;
                if (direction === 'up') {
                    return a[this.sortCol.prop] > b[this.sortCol.prop] ? 1 : -1;
                } if (direction === 'down') {
                    return b[this.sortCol.prop] > a[this.sortCol.prop] ? 1 : -1;
                }
                return 0;
            });
        },
        sortUp(col) {
            this.sortCol = col;
            this.sortCol.sortDirection = 'up';
            this.sortData(this.showData);
        },
        sortDown(col) {
            this.sortCol = col;
            this.sortCol.sortDirection = 'down';
            this.sortData(this.showData);
        },
        // 点击th列
        thClick(col, index, event) {
            if (col.sort) {
                this.sortCol = col;
                if (this.sortCol.sortDirection == '') {
                    this.sortCol.sortDirection = 'up';
                } else if (this.sortCol.sortDirection == 'up') {
                    this.sortCol.sortDirection = 'down';
                } else if (this.sortCol.sortDirection == 'down') {
                    this.sortCol.sortDirection = 'up';
                } else {
                    this.sortCol = null;
                }
                this.sortData(this.showData);
            }
            this.$emit('on-th-click', col, index, event);
        },
        // 点击内容行
        trClick(trData, index, event) {
            this.$emit('on-tr-click', trData, index, event);
        },
        // 点击td
        tdClick(trData, tdData, index, event, col, rowkey) {
            this.$emit('on-td-click', trData, tdData, index, event);
            if (col && col.detailComponent) {
                const key = `${rowkey}_detail_${col.prop}`;
                if (!this.detailList[key]) {
                    this.$set(this.detailList, key, {
                        rowkey,
                        key,
                        col,
                        show: true,
                        updateTime: Date.now()
                    });
                } else {
                    this.detailList[key].show = !this.detailList[key].show;
                    this.detailList[key].updateTime = Date.now();
                }
            }
        },
        // 触发action动作
        fireAction(action, trData, event) {
            let parent = null;
            if (this.$vnode) {
                parent = this.$vnode.context;
            }
            if (util.isString(action.func) && parent && parent[action.func]) {
                parent[action.func].call(parent || this, trData, event);
            }
            if (util.isFunction(action.func)) {
                action.func.call(parent || this, trData, event);
            }
        },
        expand(trData, index, event) {
            const i = this.expandedList.indexOf(index);
            if (i != -1) {
                this.expandedList.splice(i, 1);
                this.$emit('on-expand-hide', trData, index, event);
            } else {
                this.expandedList.push(index);
                this.$emit('on-expand-show', trData, index, event);
            }
        },
        disabledRow() {
            return false;
        },
        changeRowsSelected(selected) {
            if (selected) {
                this.showData
                    .filter((obj, index) => !this.disabledRow(obj, index))
                    .forEach((obj) => {
                        obj._selected = true;
                    });
            } else {
                this.showData
                    .filter((obj, index) => !this.disabledRow(obj, index))
                    .forEach((obj) => {
                        obj._selected = false;
                    });
            }
        },
        changeRowSelected(trData, index, selected) {
            this.$emit('on-select', trData, index, selected);
        },
        getSelected() {
            const arr = [];
            this.showData
                .filter(obj => obj._selected)
                .forEach((obj) => {
                    arr.push(this.data[obj._index]);
                });
            return arr;
        },
        getTrDetailList(rowkey) {
            let obj = [];
            for (const p in this.detailList) {
                if (this.detailList[p].rowkey === rowkey) {
                    obj.push(this.detailList[p]);
                }
            }
            obj = obj.sort((a, b) => b.updateTime - a.updateTime);
            return obj;
        },
        getTdDetailType(col, rowkey) {
            const key = `${rowkey}_detail_${col.prop}`;
            return this.detailList[key] && this.detailList[key].show
                ? 'down'
                : 'ellipsis';
        }
    }
};
</script>
