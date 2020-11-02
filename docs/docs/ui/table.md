---
pageClass: comp-page-class
---
# Table 表格

## 概述
主要用于展示大量结构化数据。    
支持行排序、列过滤器、自定义列样式、自定义行样式、自定义单元样式、列操作、列内容为组件、树形数据、聚合表头、等复杂功能。

## 代码示例
<ClientOnly>
<componetTemplate title="基础用法" template="ui/templates/table/1.html">
    <template v-slot:demo>
        <Wb-table :data="data">
            <Column prop="date" name="日期"></Column>
            <Column prop="name" name="姓名"></Column>
            <Column prop="age" name="年龄"></Column>
            <Column prop="adr" name="地址"></Column>
            <Column prop="status" name="等级"></Column>
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>表格的最简单用法。name表示列名，prop对应数据对象的属性</p>
    </template>
</componetTemplate>

<componetTemplate title="过滤器filter" template="ui/templates/table/2.html">
    <template v-slot:demo>
        <Wb-table :data="data">
            <Column prop="date" name="日期" :filter="formatDate"></Column>
            <Column prop="name" name="姓名"></Column>
            <Column prop="age" name="年龄"></Column>
            <Column prop="adr" name="地址"></Column>
            <Column prop="status" name="状态" :filter="status"></Column>
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>过滤器 filter 可以是 Function 或者 Array </p>
        <p>当 filter 是 Function 时，用函数执行结果替换td显示的原始内容。</p>
        <p>当 filter 是 Array 时，用初始值匹配数组中的value, 找出对应的text替换显示。</p>
    </template>
</componetTemplate>

<componetTemplate title="自定义样式" template="ui/templates/table/3.html">
    <template v-slot:demo>
        <Wb-table :data="data" class="table3">
            <Column prop="date" name="日期" align="left" width="200px"></Column>
            <Column prop="name" name="姓名" align="right"></Column>
            <Column prop="age" name="年龄" classes="error" align="center"></Column>
            <Column prop="adr" name="地址" align="center"></Column>
            <Column prop="status" name="状态" :classes="fixWarnStyle" align="center"></Column>
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>当渲染 tbody 时，给 tr 添加上row_$index样式，当渲染 tr 时，给 td 添加上col_$index样式。自定义row_$index和col_$index则可以给对应的列和行添加样式</p>
        <p>给Column设置 classes 属性能给 td 添加个性化样式, classes可以配置为 String 或者 Function。当是Function时，返回结果应该是一个class</p>
        <p>给Column设置 align 属性能控制当前列文字朝向</p>
        <p>给Column设置 width 属性能控制当前列宽度</p>
    </template>
</componetTemplate>

<componetTemplate title="排序" template="ui/templates/table/4.html">
    <template v-slot:demo>
        <Wb-table :data="data">
            <Column prop="date" name="日期"></Column>
            <Column prop="name" name="姓名"></Column>
            <Column prop="age" name="年龄" sort></Column>
            <Column prop="adr" name="地址"></Column>
            <Column prop="status" name="等级" sort></Column>
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>给Column设置sort属性，则当前列支持排序，排序按照大小排序</p>
    </template>
</componetTemplate>

<componetTemplate title="自定义操作" template="ui/templates/table/5.html">
    <template v-slot:demo>
        <Wb-table :data="data">
            <Column prop="date" name="日期"></Column>
            <Column prop="name" name="姓名"></Column>
            <Column prop="age" name="年龄"></Column>
            <Column prop="adr" name="地址"></Column>
            <Column name="操作" :action="action"></Column>
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>给Column设置action属性，则当前列显示功能按钮</p>
        <p>函数的this指向当前作用域，参数为(trData, event)</p>
    </template>
</componetTemplate>

<componetTemplate title="列自定义" template="ui/templates/table/6.html">
    <template v-slot:demo>
        <Wb-table :data="data">
            <Column prop="date" name="日期"></Column>
            <Column prop="name" name="姓名"></Column>
            <Column prop="age" name="年龄"></Column>
            <Column prop="adr" name="地址"></Column>
            <Column name="查看图片" :component="component"></Column>
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>给Column设置component属性，则会用子组件替换td的内容</p>
        <p>函数的this指向当前作用域，参数为(trData, tdData, event)</p>
    </template>
</componetTemplate>

<componetTemplate title="可编辑表格" template="ui/templates/table/7.html">
    <template v-slot:demo>
         <Wb-table :data="data">
            <Column prop="name" :editable="editNameConfig" name="姓名" />
            <Column prop="date" name="日期" />
            <Column prop="age" name="年龄" sort />
            <Column prop="adr" :editable="editAdrConfig" name="地址" />
            <Column prop="status" name="等级" />
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>支持配置单元格可编辑,通过为Column配置editable来控制列是否可编辑，可用配置：</p>
        <p>type: 'input',    说明： 单元格编辑组件类型，仅支持input，select</p>
        <p>multiple: false,  说明： 仅type为select时有效，提供多选</p>
        <p>multipleLimit: 1, 说明： 多选限制</p>
        <p>confirm: true,    说明： 是否提示修改，默认显示</p>
        <p>validate: () => {return true}, 说明： 触发change前校验，默认不校验</p>
        <p>change: () => {} 说明： change 确认修改触发change回调</p>
    </template>
</componetTemplate>

<componetTemplate title="行可选择" template="ui/templates/table/8.html">
    <template v-slot:demo>
        <Wb-table :data="data" ref="table" @on-select="sysout"  @on-select-all="sysout">
            <Column type="selection" :disabled="canSelectRow"></Column>
            <Column prop="date" name="日期"></Column>
            <Column prop="name" name="姓名"></Column>
            <Column prop="age" name="年龄"></Column>
            <Column prop="adr" name="地址"></Column>
            <Column prop="status" name="等级"></Column>
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>通过在组件实例上调用getSelected能拿到选中的行。</p>
        <p>给列设置disabled，可以控制此行是否可以被选中</p>
    </template>
</componetTemplate>

<componetTemplate title="展开更多" template="ui/templates/table/9.html">
    <template v-slot:demo>
        <Wb-table :data="data">
            <Column type="expand">
                <template slot-scope="props">
                    <Row>
                        <Cell span="12">
                            <span>{{ props.name }}</span>
                        </Cell>
                        <Cell span="12">
                            <span>{{ props.age }}</span>
                        </Cell>
                    </Row>
                </template>
            </Column>
            <Column prop="date" name="日期"></Column>
            <Column prop="name" name="姓名"></Column>
            <Column prop="age" name="年龄"></Column>
            <Column prop="adr" name="地址"></Column>
            <Column prop="status" name="等级"></Column>
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>当页面放不下一行数据时，采用展开显示详情的方式</p>
    </template>
</componetTemplate>

<componetTemplate title="数据详情" template="ui/templates/table/10.html">
    <template v-slot:demo>
        <Wb-table :data="data">
            <Column prop="date" name="日期" :detail-component="component1"></Column>
            <Column prop="name" name="姓名" :detail-component="component1"></Column>
            <Column prop="age" name="年龄" :detail-component="component1"></Column>
            <Column prop="adr" name="地址"></Column>
            <Column prop="status" name="等级"></Column>
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>针对每个数据单元格，可以展开更多</p>
    </template>
</componetTemplate>

<componetTemplate title="聚合表头" template="ui/templates/table/11.html">
    <template v-slot:demo>
        <Wb-table :data="data" border>
            <Column name="总览">
                <Column prop="date" name="日期"></Column>
                <Column prop="name" name="姓名"></Column>
                <Column prop="age" name="年龄"></Column>
            </Column>
            <Column prop="adr" name="地址"></Column>
            <Column prop="status" name="等级"></Column>
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>当时聚合表头时，建议设置table为border，带边框样式</p>
    </template>
</componetTemplate>

<componetTemplate title="树状表格" template="ui/templates/table/12.html">
    <template v-slot:demo>
         <Tree-table :data="treeDate">
            <Column prop="sid" name="Col-a"></Column>
            <Column prop="scenario_name" name="Col-b"></Column>
        </Tree-table>
    </template>
    <template v-slot:description>
        <p>TreeTable继承于Table，多了tree的特性，需要传入树状结构数据</p>
    </template>
</componetTemplate>

<componetTemplate title="动态列" template="ui/templates/table/13.html">
    <template v-slot:demo>
         <Wb-table :data="data">
            <template v-for="col in cols">
                <Column v-if="col.prop==='name'||col.prop==='age'" :key="col.prop" :index="col.index" :prop="col.prop" :name="col.name" />
                <Column v-else :key="col.prop" :prop="col.prop" :name="col.name" />
            </template>
        </Wb-table>
        <Wb-button type="primary" @click="toggle" style="margin-top:10px;">切换姓名列</Wb-button>
    </template>
    <template v-slot:description>
        <p>可以通过给column配置index属性控制列相对位置</p>
    </template>
</componetTemplate>

<componetTemplate title="无数据提示" template="ui/templates/table/14.html">
    <template v-slot:demo>
         <Wb-table :data="[]" no-data-text="暂无数据">
            <Column prop="date" name="日期"></Column>
            <Column prop="name" name="姓名"></Column>
            <Column prop="age" name="年龄"></Column>
            <Column prop="adr" name="地址"></Column>
            <Column prop="status" name="等级"></Column>
        </Wb-table>
    </template>
    <template v-slot:description>
        <p>设置noDataText，则当表格无数据时给于提示</p>
    </template>
</componetTemplate>
</ClientOnly>

<script>
import framework from "../../images/framework.jpg"
import Vue from 'vue'
export default {
    data() {
        return {
            data: [{
                name: '张晓刚',
                age: 24,
                date: new Date(2016, 9, 10),
                adr: '北京市海淀区西二旗',
                status: 1
            }, {
                name: '李晓红',
                age: 26,
                date: new Date(2016, 9, 11),
                adr: '北京市海淀区西二旗',
                status: 2,
                _selected: true
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
            action: [{
                text: '编辑',
                func: function (data) {
                    console.log(this)
                    console.log(data)
                }
            }, {
                text: '删除',
                func: function (data) {
                    console.log(this)
                    console.log(data)
                }
            }],
            component: function (trData, tdData) {
                return new Vue({
                    data: function () {
                        return {
                            zoomOption: {
                                src: framework,
                                minWidth: 200,
                                maxWidth: 500
                            }
                        }
                    },
                    render(h){
                        return h("Wb-button", {
                            props: {
                                type: "primary"
                            },
                            directives: [{
                                name: "zoom",
                                value: this.zoomOption
                            }]
                        }, ["点击查看图片"])
                    }
                })
            },
            component1: function (trData, tdData) {
                return new Vue({
                    data: function () {
                        return {
                            trData,
                            tdData
                        }
                    },
                    render(h){
                        return h("Wb-button", {
                            props: {
                                type: "primary"
                            }
                        }, [this.tdData])
                    }
                })
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
            },
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
            }]
        }
    },
    methods: {
        canSelectRow(trData, index) {
            return index == 0;
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
        sysout(){
            console.log(arguments)
        },
        trClick(data) {
            console.log(data)
        },
        toggle() {
            if(this.lastShift){
                this.cols.unshift(this.lastShift);
                this.lastShift = null
            }else {
                this.lastShift = this.cols.shift();
            }
        },
        changeName( oldValue, newValue, col, trData) {
            this.$set(trData,'name', newValue)
        },
        changeAddr( oldValue, newValue, col, trData ){
            let adr = this.editAdrConfig.list.find(it=>it.value === newValue)
            this.$set(trData, 'adr', adr && adr.label)
        }
    }
}
</script>

<style lang="scss">

.ui-table {
    margin: 0;
    tr{
        border: 0;
        &:nth-child(2n){
            background-color: transparent;
        }
    }
}
    
.ui-table-tbody > tr > td, .ui-table-thead > tr > th {
    border-top: 0;
    border-left: 0;
    border-right: 0;
}
    

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
</style>


## API

### Table Functions
```js
this.$refs.table.getSelected()
```

### Table Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| data          | 数据源  | Array  |        []              |
| border          | 是否有外边框和内边框  | Boolean  |       false             |
| trClass          | 通过function(trData，index)设置行样式，返回内容会作为行的class  | Function  |       undefined             |
| noDataText          | 配置无数据时的提示，未空则不提示  | String  |       undefined             |

### Table Events
| 事件名           | 说明                            |        参数                                          |
|:----------------|:--------------------------|:-----------------------------------------------------|
| on-th-click     |  点击列头部时触发  |       (col, colIndex, event)              |
| on-tr-click    |  点击一行时触发  |       (trData, index, event)            |
| on-td-click    |  点击td时触发  |       (trData, tdData, index, event)              |
| on-expand-hide    |  更多关闭时触发  |       (trData, index, event)            |
| on-expand-show    |  更多开展时触发  |       (trData, index, event)             |
| on-select    |  勾选或者取消勾选一行时触发  |      (trData, index, selected)              |
| on-select-all    |  勾选或者取消勾选全选按钮时触发  |    选中数据  [trData, trData]              |

### Column Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| prop          | 列的唯一标识，对应着数据源对象的属性  | String  |        null              |
| name          | 列的标题  | String  |        null              |
| index          | 列的顺序索引，动态改变列时，所有列从左向右依次递增显示  | Number  |     0              |
| align          | 列文字对齐方向，可选值有"left"、"center"、"right"  | String  |        center             |
| width          | 列的宽度，传入"200px"或者"10%"  | String  |        null             |
| classes          | 控制TD的样式，当是function时，入参是td的原始值，返回结果必须是string  | String\|Function  |        null          |
| sort          | 列是否可以排序  | Boolean  |       false              |
| filter          | 列的过滤器，把原始值转换成展示需要的内容  | Array\|Function  |        null              |
| action          | 配置按钮列，当前列只显示按钮  | Array\|Object  |        null             |
| component       | 配置子组件列, 参数为trData, tdData  | Function  |        null              |
| detailComponent       | 配置单元格详情，参数为trData, tdData  | Function  |        null              |
| type       | 列类型，可选值有expand、selection  | String  |        null              |
| disabled       | 设置列禁止被选中，只有列的type是selection时有效  | Function  |        null              |
| editable       | 配置编辑列  |         Object             |       null 



