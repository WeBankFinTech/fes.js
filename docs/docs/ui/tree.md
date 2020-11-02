---
pageClass: comp-page-class
---
# Tree 树形控件

## 概述
文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/tree/1.html">
            <template v-slot:demo>
                <Tree :data="data"></Tree>
            </template>
            <template v-slot:description>
                <p>最简单的用法，点击节点可选中节点。节点expand属性配置节点是否展开。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="动态加载数据" template="ui/templates/tree/2.html">
            <template v-slot:demo>
                <Tree :data="data2" :load-data="loadData"></Tree>
            </template>
            <template v-slot:description>
                <p>点击展开时，动态去加载子数据，如果已经加载过，则改为展开和关闭</p>
                <p>子节点是否选中继承父节点的状态</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="多选+非inline展示" template="ui/templates/tree/3.html">
            <template v-slot:demo>
                <Tree :data="data" multiple :inline="false"></Tree>
            </template>
            <template v-slot:description>
                <p>设置multiple则Tree组件是多选的，则出现checkbox框。设置inline为false，则底层节点垂直排列，非横向排列</p>
            </template>
        </componetTemplate>
        <componetTemplate title="自定义节点内容" template="ui/templates/tree/4.html">
            <template v-slot:demo>
                <Tree ref="tree" :data="data">
                    <template slot-scope="{node, root}">
                        <contextmenu :data="actions" @on-choose="doAction(node,arguments)">
                            <span > {{ node.name }} </span>
                        </contextmenu>
                    </template>
                </Tree>
            </template>
            <template v-slot:description>
                <p>通过slot-scope自定义节点内容，包含两个字段：当前节点node(object)和跟节点root(object)</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<script>
export default {
    data() {
        return {
            data: [{
                name: 'Jiangsu',
                code: 'js',
                expand: true,
                children: [{
                    name: 'Nanjing',
                    code: 'nj',
                    selected: true
                }, {
                    name: 'Suzhou',
                    code: 'sz',
                    children: [{
                        name: 'Wujiang',
                        code: 'wj'
                    }, {
                        name: 'Changshu',
                        code: 'cs'
                    }]
                }]
            }, {
                name: 'Yunnan',
                code: 'yn'
            }, {
                name: 'Fujian',
                code: 'fj'
            }],
            data2: [{
                name: 'parent',
                children: []
            }],
            actions: [ '增加子节点', '删除节点', '复制节点']
        }
    },
    methods: {
        check: function (data) {
            console.log(data)
        },
        select: function (data) {
            console.log(data)
        },
        loadData(item, callback) {
            setTimeout(() => {
                const data = [
                    {
                        name: 'children',
                        children: []
                    },
                    {
                        name: 'children',
                        children: []
                    }
                ];
                callback(data);
            }, 1000);
        },
        doAction(node, [data, index]){
            if(index === 0){
                this.$refs.tree.addNode(node, {
                    name: "test",
                    code: "111",
                })
            }
            if(index === 1){
                this.$refs.tree.removeNode(node)
            }
        }
    }
}
</script>

## API

### Tree Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| data       | 可嵌套的节点属性的数组，生成 tree 的数据       | Array  |        Array            |
| data.name       | 节点名称       | String  |        null            |
| data.expand       | 是否展开子节点       | Boolean  |        false            |
| data.selected       | 是否选中子节点       | Boolean  |        false            |
| data.checked       | 是否勾选(如果勾选，子节点也会全部勾选)       | Boolean  |        false            |
| data.children       | 子节点属性数组       | Array  |        null            |
| multiple       |  是否支持多选        | Boolean  |      false               |
| inline       |  底层节点是否横向排列       | Boolean  |        true              |
| loadData       |  加载数据       | Function  |        null              |
| twiceClickSelected     |  当节点被选中时，再次点击是否继续选中       | Boolean  |        false              |


### Tabs Events
| 事件名           | 说明                            |        返回值                                          |
|:----------------|:--------------------------|:-----------------------------------------------------|
| on-select-change        |  点击节点时触发  |        (node)             |
| on-check-change       |  点击节点前的复选框时触发  |        ([node, node])             |



