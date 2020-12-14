<template>
    <div class="table-page article">
        <h1>Table 表格</h1>
        <h2>概述</h2>
        <p>主要用于展示大量结构化数据。</p>
        <p>支持排序、展示内容过滤器、自定义样式、自定义操作、td支持组件、树形展示数据等复杂功能。</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-table ref="table" :data="data" @on-select-all="trClick" @on-select="tdClick">
                        <Column :disabled="canSelectRow" type="selection" />
                        <Column prop="date" name="日期" />
                        <Column prop="name" name="姓名" />
                        <Column prop="age" name="年龄" sort />
                        <Column prop="adr" name="地址" />
                        <Column prop="status" name="等级" />
                        <Column name="操作" :action="action" />
                    </Wb-table>
                    <Wb-button class="mt20" @click="getSelectedTr">获取选择的行</Wb-button>
                </div>
                <div class="panel-header">
                    <span>多选</span>
                </div>
                <div class="panel-desc">
                    <p>支持多选行</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1 />
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-table :data="data" @on-tr-click="trClick" @on-td-click="tdClick">
                        <template v-for="col in cols">
                            <Column v-if="col.prop==='name'||col.prop==='age'" :key="col.prop" :index="col.index" :prop="col.prop" :name="col.name" :component="component" />
                            <Column v-else :key="col.prop" :prop="col.prop" :name="col.name" />
                        </template>
                    </Wb-table>
                    <Wb-button type="primary" class="mt20" @click="toggle">切换姓名列</Wb-button>
                </div>
                <div class="panel-header">
                    <span>动态列</span>
                </div>
                <div class="panel-desc">
                    <p>可以通过给column配置index属性控制列相对位置</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown3 />
                </div>
            </Cell>
        </Row>


        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-table ref="table" :data="data">
                        <Column :editable="editNameConfig" prop="name" name="姓名" />
                        <Column prop="date" name="日期" width="100px" />
                        <Column prop="age" name="年龄" sort />
                        <Column :editable="editAdrConfig" prop="adr" name="地址" />
                        <Column prop="status" name="等级" />
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>可编辑表格</span>
                </div>
                <div class="panel-desc">
                    <p>支持配置单元格可编辑,通过为Column配置editable来控制列是否可编辑，可用配置：</p>
                    <p>type: 'input',    说明： 单元格编辑组件类型，仅支持input，select</p>
                    <p>multiple: false,  说明： 仅type为select时有效，提供多选</p>
                    <p>multipleLimit: 1, 说明： 多选限制</p>
                    <p>confirm: true,    说明： 是否提示修改，默认显示</p>
                    <p>validate: () => {return true}, 说明： 触发change前校验，默认不校验</p>
                    <p>change: () => {} 说明： change 确认修改触发change回调</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown4 />
                </div>
            </Cell>
        </Row>


        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-table :data="data" no-data-text="暂无数据" @on-tr-click="trClick" @on-td-click="tdClick">
                        <Column type="expand">
                            <template slot-scope="props">
                                <Row>
                                    <Cell span="8">
                                        <span>{{ props.name }}</span>
                                    </Cell>
                                    <Cell span="8">
                                        <span>{{ props.age }}</span>
                                    </Cell>
                                    <Cell span="8">
                                        <span>{{ props.delay }}</span>
                                    </Cell>
                                </Row>
                            </template>
                        </Column>
                        <Column :filter="formatDate" :detail-component="component" prop="date" name="日期" />
                        <Column :detail-component="component" prop="name" name="姓名" />
                        <Column :detail-component="component" prop="age" name="年龄" />
                        <Column prop="adr" name="地址" />
                        <Column :filter="status" prop="status" name="状态" />
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>过滤器filter</span>
                </div>
                <div class="panel-desc">
                    <p>过滤器filter可以是Function或者Array</p>
                    <p>当filter是Function时，用函数执行结果替换td显示的原始内容。当filter是Array时，用td原始值匹配数组中的value, 找出对应的text替换显示。</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2 />
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Tree-table :data="treeDate" @on-tr-click="trClick" @on-td-click="tdClick">
                        <Column prop="sid" name="Col-a" />
                        <Column prop="scenario_name" name="Col-b" />
                    </Tree-table>
                </div>
                <div class="panel-header">
                    <span>TreeTable</span>
                </div>
                <div class="panel-desc">
                    <p>TreeTable继承于Table，多了tree的特性，需要传入树状结构数据</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown7 />
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Table props</h3>
        <markdown8 />

        <h3>Column props</h3>
        <markdown9 />

        <h3>Table events</h3>
        <markdown10 />
    </div>
</template>
<script>
import markdown1 from './md/table1.md'
import markdown2 from './md/table2.md'
import markdown3 from './md/table3.md'
import markdown4 from './md/table4.md'
import markdown5 from './md/table5.md'
import markdown6 from './md/table6.md'
import markdown7 from './md/table7.md'
import markdown8 from './md/table8.md'
import markdown9 from './md/table9.md'
import markdown10 from './md/table10.md'
import Vue from 'vue'
export default {
    components: {
        markdown1, markdown2, markdown3, markdown4, markdown5, markdown6, markdown7, markdown8, markdown9, markdown10
    },
    data: function () {
        return {
            status: [{
                value: 1,
                text: '黄铜'
            }, {
                value: 2,
                text: '白银'
            }, {
                value: 3,
                text: '黄金'
            }, {
                value: 4,
                text: '铂金'
            }],
            cols: [{
                prop: 'name',
                name: '姓名',
                index: -1,
                show: true
            }, {
                prop: 'age',
                name: '年龄',
                show: true
            }, {
                prop: 'date',
                name: '日期',
                show: true
            }, {
                prop: 'adr',
                name: '地址',
                show: true
            }, {
                prop: 'status',
                name: '状态',
                show: true
            }],
            data: [{
                name: '张晓刚',
                age: 24,
                date: new Date(2016, 9, 10),
                adr: '北京市海淀区西一旗',
                status: 1
            }, {
                _selected: true,
                name: '李晓红',
                age: 26,
                date: new Date(2016, 9, 11),
                adr: '北京市海淀区西二旗',
                status: 2
            }, {
                name: '隔壁老王',
                age: 22,
                date: new Date(2016, 9, 12),
                adr: '北京市海淀区西二旗',
                status: 3
            }, {
                name: '我爸是李刚',
                age: 19,
                date: new Date(2016, 9, 13),
                adr: '北京市海淀区西二旗',
                status: 4
            }],
            data3: [],
            action: [{
                text: '编辑',
                func: function () {
                    console.log(this)
                    console.log(arguments)
                },
                disabled(trData) {
                    if (trData.name === '张晓刚') {
                        return true;
                    }
                    return false;
                }
            }, {
                text: '删除',
                func: function () {
                    console.log(this)
                    console.log(arguments)
                },
                disabled(trData) {
                    if (trData.name !== '张晓刚') {
                        return true;
                    }
                    return false;
                }
            }],
            component: function (trData, tdData) {
                return new Vue({
                    data: function () {
                        return {
                            trData,
                            tdData
                        }
                    },
                    render(h){
                        return h("Wb-Input", {
                            props: {
                                value: this.tdData,
                                readonly: true
                            }
                        }, [this.tdData])
                    }
                    // template: "<Wb-Input :value='tdData' readonly>{{tdData}}</Wb-Input>"
                })
            },
            trClass() {
                console.log(arguments)
            },
            treeDate: [{
                sid: '1',
                scenario_name: 'js',
                children: [{
                    sid: '1.1',
                    scenario_name: 'nj'
                }, {
                    sid: '1.2',
                    scenario_name: 'sz',
                    children: [{
                        sid: '1.2.1',
                        scenario_name: 'wj'
                    }, {
                        sid: '1.2.2',
                        scenario_name: 'cs'
                    }]
                }]
            }, {
                sid: '2',
                scenario_name: 'yn',
                children: [{
                    sid: '2.1',
                    scenario_name: 'wj'
                }, {
                    sid: '2.2',
                    scenario_name: 'cs'
                }]
            }, {
                sid: '3',
                scenario_name: 'fj'
            }],
            canSelectRow(trData, index) {
                return index == 0;
            },
            editNameConfig: {
                change: this.changeName
            },
            editAdrConfig: {
                type: 'select',
                list: [ {value: '1', label: '北京市海淀区西一旗'}, {value: '2', label: '深圳市南山区'}, {value: '3', label: '深圳市罗湖区'} ],
                validate: ( ...args ) => {
                    console.log(args);
                    return true
                },
                change: this.changeAddr
            }
        }
    },
    mounted() {

    },
    methods: {
        disabledCell(trData) {
            if (trData.name === '张晓刚') {
                return true;
            }
            return false;
        },
        formatDate: function (data) {
            var year = data.getFullYear();
            var m = data.getMonth();
            var date = data.getDate();
            return year + '-' + m + '-' + date
        },
        fixWarnStyle: function (data) {
            if (data < 3) {
                return 'error'
            }
        },
        getSelectedTr: function () {
            console.log(this.$refs.table.getSelected())
        },
        trClick() {
            console.log(arguments)
        },
        tdClick() {
            console.log(arguments)
        },
        toggle() {
            if (this.lastShift) {
                this.cols.unshift(this.lastShift);
                this.lastShift = null
            } else {
                this.lastShift = this.cols.shift();
            }
        },
        changeName( oldValue, newValue, col, trData) {
            this.$set(trData, 'name', newValue)
        },
        changeAddr( oldValue, newValue, col, trData ) {
            let adr = this.editAdrConfig.list.find(it=>it.value === newValue)
            this.$set(trData, 'adr', adr && adr.label)
        }
    }
}
</script>
<style lang="scss">
.table3 .col_1 {
    background-color: #2db7f5;
    color: #fff;
}

.table3 .row_1 {
    color: red;
}

.error {
    background-color: #f60;
    color: #fff
}
.mt20 {
    margin-top: 20px;
}
</style>
