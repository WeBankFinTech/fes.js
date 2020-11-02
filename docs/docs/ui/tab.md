---
pageClass: comp-page-class
---
# Tabs 标签页

## 概述
选项卡切换组件，常用于平级区域大块内容的的收纳和展现。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/tab/1.html">
            <template v-slot:demo>
                <Tabs v-model="value">
                    <Tab label="标签一">
                        <p>1</p>
                    </Tab>
                    <Tab label="标签二">
                        <p>2</p>
                    </Tab>
                    <Tab label="标签三">
                        <p>3</p>
                    </Tab>
                </Tabs>
            </template>
            <template v-slot:description>
                <p>Tabs的value值或者说v-modal值表示Tabs当前激活项。</p>
                <p>Tab的name属性默认是在Tabs的中index，从1开始。</p>
                <p>Tab的name等于Tabs的value值，则激活此Tab</p>
            </template>
        </componetTemplate>
        <componetTemplate title="卡片类型" template="ui/templates/tab/2.html">
            <template v-slot:demo>
                <Tabs type="card">
                    <Tab label="标签一">
                        <p>1</p>
                    </Tab>
                    <Tab label="标签二">
                        <p>2</p>
                    </Tab>
                    <Tab label="标签三">
                        <p>3</p>
                    </Tab>
                </Tabs>
            </template>
            <template v-slot:description>
                <p>设置type为card。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="其他参数" template="ui/templates/tab/3.html">
            <template v-slot:demo>
                <Tabs value="android">
                    <Tab label="标签一" name="android" icon="md-baseball">
                        <p>1</p>
                    </Tab>
                    <Tab label="标签二" name="apple" icon="md-bed">
                        <p>2</p>
                    </Tab>
                    <Tab label="标签三" name="windows" icon="md-boat" disabled>
                        <p>3</p>
                    </Tab>
                </Tabs>
            </template>
            <template v-slot:description>
                <p>设置Tab的icon，可以在Tab显示一个Icon</p>
                <p>设置Tab的disabled，则禁用该Tab项</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="自定义动作 + 可删除 + 滚动" template="ui/templates/tab/4.html">
            <template v-slot:demo>
                <Tabs value="1" closable @on-tab-remove="remove">
                    <Tab v-for="(item,index) in arr" :label="'标签' + item" :name="item" :key="index">
                        <p>{{item}}</p>
                    </Tab>
                    <Wb-button type="ghost" slot="action" @click="addItem">增加</Wb-button>
                </Tabs>
            </template>
            <template v-slot:description>
                <p>在Tabs添加slot为action的元素显示在Tab的头部最右边</p>
                <p>配置closable，则选项可以被删除。删除时触发on-tab-remove事件，参数为删除项的name</p>
                <p>当选项过多时，自动出现左右切换的按钮</p>
            </template>
        </componetTemplate>
        <componetTemplate title="拖拽排序" template="ui/templates/tab/5.html">
            <template v-slot:demo>
                <Tabs draggable  @on-tab-change="change">
                    <Tab label="标签一">
                        <p>1</p>
                    </Tab>
                    <Tab label="标签二">
                        <p>2</p>
                    </Tab>
                    <Tab label="标签三">
                        <p>3</p>
                    </Tab>
                </Tabs>
            </template>
            <template v-slot:description>
                <p>配置draggable，则选项可以被拖拽排序，拖拽后触发on-tab-change事件。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="自定义标题" template="ui/templates/tab/6.html">
            <template v-slot:demo>
                <Tabs>
                    <Tab :label="copm(1)">
                        <p>1</p>
                    </Tab>
                    <Tab :label="copm(2)">
                        <p>2</p>
                    </Tab>
                    <Tab :label="copm(3)">
                        <p>3</p>
                    </Tab>
                </Tabs>
            </template>
            <template v-slot:description>
                <p>传入vue组件实现自定义的标题。</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            value: '1',
            value1: 'apple',
            arr: [1, 2, 3],
            copm: function(i){
                return new Vue({
                    data: function(){
                        return{
                            i
                        }
                    },
                    render(h){
                        return h("span", {
                        }, [`标签${this.i}`])
                    }
                })
            }
        }
    },
    methods: {
        choose(index) {
            this.$Toast('选择第' + index + '个')
        },
        addItem(){
            this.arr.push(this.arr.length + 1);
        },
        remove(){
            console.log(arguments)
        },
        change({from, to }){
            var obj = this.arr[from];
            this.arr.splice(from, 1);
            this.arr.splice(to, 0, obj);
            console.log(this.arr)
        }
    }
}
</script>

## API

### Tabs Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value       | 可以使用v-modal, 表示当前激活的是那一项         | String\|Number  |        1              |
| type       |  可选值有card, 如果没配置则显示默认样式        | String  |                      |
| closable       |  选项是否可删除       | Boolean  |        false              |
| draggable       |  选项是否可拖拽       | Boolean  |        false              |

### Tabs Events
| 事件名           | 说明                            |        返回值                                          |
|:----------------|:--------------------------|:-----------------------------------------------------|
| on-click        |  tab被点击时触发  |        (name)             |
| on-tab-remove       |  tab被删除时触发  |        (name, index)             |
| on-tab-change       | 拖拽排序时触发  |        ({ from:index, to:index })             |

### Tab Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| name          |  用于标识当前选项卡 | String  |        null              |
| label          | 选项卡头部显示的文案，或者是自定义的组件 | String\|Object   |                     null                        |
| icon        |    选项卡头部显示的icon | String   |                     null                        |
| disabled          | 是否禁用该选项卡 | Boolean   |                     false                        |

