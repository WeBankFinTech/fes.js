---
pageClass: comp-page-class
---
# Dropdown 下拉菜单
向下弹出的列表。

## 概述
当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基本使用" template="ui/templates/dropdown/1.html">
            <template v-slot:demo>
                <Dropdown :data="data1">
                    <Wb-button type="primary">Hover</Wb-button>
                </Dropdown>
            </template>
            <template v-slot:description>
                <p>在data中提供下拉菜单数据内容，数据格式见API</p>
            </template>
        </componetTemplate>
        <componetTemplate title="多级菜单" template="ui/templates/dropdown/2.html">
            <template v-slot:demo>
                <Dropdown :data="data3">
                    <Wb-button type="primary">Hover</Wb-button>
                </Dropdown>
            </template>
            <template v-slot:description>
                <p>传入的菜单里有多个层级。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="触发方式" template="ui/templates/dropdown/3.html">
            <template v-slot:demo>
                <Dropdown :data="data1" trigger="click">
                    <Wb-button type="primary">Click</Wb-button>
                </Dropdown>
            </template>
            <template v-slot:description>
                <p>下拉菜单默认是悬浮触发，当设置trigger为click时级联菜单点击触发</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="其他元素" template="ui/templates/dropdown/4.html">
            <template v-slot:demo>
                <Dropdown :data="data2">
                    <Wb-button type="primary">Hover</Wb-button>
                </Dropdown>
            </template>
            <template v-slot:description>
                <p>分割线和不可用菜单项。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="触发事件" template="ui/templates/dropdown/5.html">
            <template v-slot:demo>
                <Dropdown :data="data1" @on-choose="clickItem">
                    <a href="javascript:void(0)">Hover</a>
                </Dropdown>
            </template>
            <template v-slot:description>
                <p>点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<script>
export default {
    data() {
        return {
            data1: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'number 3'
                }
            ],
            data2: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'number 3',
                    disabled: true
                },
                {
                    content: 'number 4',
                    divided: true
                }
            ],
            data3: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'sub 1',
                    children: [
                        {
                            content: 'number 3'
                        },
                        {
                            content: 'number 4',
                            divided: true
                        },
                        {
                            content: 'sub 2',
                            children: [
                                {
                                    content: 'sub 3',
                                    children: [
                                        {
                                            content: 'number 6'
                                        }
                                    ]
                                },
                                {
                                    content: 'number 5',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        clickItem (data){
            this.$Toast(data.content+' is clicked');
        }
    }
}
</script>

## API

### Dropdown Props
|  属性   |                                 说明                                 |        类型         |       默认值        |
|:------- |:-------------------------------------------------------------------- |:------------------- |:------------------- |
| trigger | 下拉菜单及级联菜单的触发方式，可选值有`hover`、`click`                                        | String | hover               |
| data    | 菜单数据源                                                           | Array               | -                    |
| data.content  | 下拉菜单项数据源       | String  | -      |
| data.divided  | 该菜单项是否禁用       | Boolean | false  |
| data.disabled | 该菜单项是否显示分割线 | boolean | false  |

### Dropdown Events
|   事件名    |          说明          | 返回值 |
|:----------- |:---------------------- |:------ |
| on-choose | 点击菜单项时触发的事件 | (item, event) |

