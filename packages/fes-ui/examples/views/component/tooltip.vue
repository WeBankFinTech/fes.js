<template>
    <div class="tooltip-page article">
        <h1>Tooltip 文本提示</h1>
        <h2>概述</h2>
        <p>文字提示气泡框，在鼠标悬停时显示，代替了系统的title提示。</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <span v-tooltip="'这里是提示文字'">当鼠标经过这段文字时，会显示一个气泡框</span>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>最简单的用法。</p>
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
                <div class="panel-case swap">
                    <div class="top">
                        <Wb-button v-tooltip="option1">
                            上左
                        </Wb-button>
                        <Wb-button v-tooltip="option2">
                            上中
                        </Wb-button>
                        <Wb-button v-tooltip="option3">
                            上右
                        </Wb-button>
                    </div>
                    <div class="center">
                        <div class="center-left">
                            <Wb-button v-tooltip="option4">
                                左上
                            </Wb-button>
                            <Wb-button v-tooltip="option5">
                                左中
                            </Wb-button>
                            <Wb-button v-tooltip="option6">
                                左下
                            </Wb-button>
                        </div>
                        <div class="center-right">
                            <Wb-button v-tooltip="option7">
                                右上
                            </Wb-button>
                            <Wb-button v-tooltip="option8">
                                右中
                            </Wb-button>
                            <Wb-button v-tooltip="option9">
                                右下
                            </Wb-button>
                        </div>
                    </div>
                    <div class="bottom">
                        <Wb-button v-tooltip="option10">
                            下左
                        </Wb-button>
                        <Wb-button v-tooltip="option11">
                            下中
                        </Wb-button>
                        <Wb-button v-tooltip="option12">
                            下右
                        </Wb-button>
                    </div>
                </div>
                <div class="panel-header">
                    <span>位置</span>
                </div>
                <div class="panel-desc">
                    <p>组件提供了12个不同的方向显示Tooltip，具体配置可查看API。</p>
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
                    <Wb-button v-tooltip="option13">
                        html字符串
                    </Wb-button>
                </div>
                <div class="panel-header">
                    <span>html字符串</span>
                </div>
                <div class="panel-desc">
                    <p>提示内容可以是html结构的字符串</p>
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
                    <Wb-button v-tooltip="option14">
                        component模版
                    </Wb-button>
                </div>
                <div class="panel-header">
                    <span>自定义组件</span>
                </div>
                <div class="panel-desc">
                    <p>提示内容可以是自定义的组件</p>
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
                    <Wb-button v-tooltip="option15">
                        confirm模式
                    </Wb-button>
                </div>
                <div class="panel-header">
                    <span>confirm模式</span>
                </div>
                <div class="panel-desc">
                    <p>提示是一个confirm框</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown5 />
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Tooltip props</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">
                            属性
                        </th>
                        <th style="text-align:left">
                            说明
                        </th>
                        <th style="text-align:left">
                            类型
                        </th>
                        <th style="text-align:left">
                            默认值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">
                            text
                        </td>
                        <td style="text-align:left">
                            提示的内容
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            html
                        </td>
                        <td style="text-align:left">
                            提示的内容，是html结构的字符串
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            component
                        </td>
                        <td style="text-align:left">
                            提示的内容，是一个vue组件
                        </td>
                        <td style="text-align:left">
                            Object
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            direction
                        </td>
                        <td style="text-align:left">
                            提示的朝向，相对于dom来说，默认是朝下。可选值有“left”、“right”、“top”、“bottom”
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            bottom
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            align
                        </td>
                        <td style="text-align:left">
                            提示的文字相对于dom的位置，默认是center。可选值有“top”、“bottom”、“center”、“right”、“left”
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            center
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            confirm
                        </td>
                        <td style="text-align:left">
                            是否是询问模式
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            onOk
                        </td>
                        <td style="text-align:left">
                            点击确认触发
                        </td>
                        <td style="text-align:left">
                            Function
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            align
                        </td>
                        <td style="text-align:left">
                            点击取消触发
                        </td>
                        <td style="text-align:left">
                            Function
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script>
import Vue from 'vue'
import markdown1 from './md/tooltip1.md'
import markdown2 from './md/tooltip2.md'
import markdown3 from './md/tooltip3.md'
import markdown4 from './md/tooltip4.md'
import markdown5 from './md/tooltip5.md'
export default {
    components: {
        markdown1, markdown2, markdown3, markdown4, markdown5
    },
    data() {
        const _this = this;
        return {
            option1: {
                direction: 'top',
                align: 'left',
                text: '上左'
            },
            option2: {
                direction: 'top',
                align: 'center',
                text: '上中'
            },
            option3: {
                direction: 'top',
                align: 'right',
                text: '上右'
            },
            option4: {
                direction: 'left',
                align: 'top',
                text: '左上'
            },
            option5: {
                direction: 'left',
                align: 'center',
                text: '左中'
            },
            option6: {
                direction: 'left',
                align: 'bottom',
                text: '左下'
            },
            option7: {
                direction: 'right',
                align: 'top',
                text: '右上'
            },
            option8: {
                direction: 'right',
                align: 'center',
                text: '右中'
            },
            option9: {
                direction: 'right',
                align: 'bottom',
                text: '右下'
            },
            option10: {
                direction: 'bottom',
                align: 'left',
                text: '下左'
            },
            option11: {
                direction: 'bottom',
                align: 'center',
                text: '下中'
            },
            option12: {
                direction: 'bottom',
                align: 'right',
                text: '下右'
            },
            option13: {
                direction: 'bottom',
                align: 'left',
                html: '<em style="color:red">我是带em标签的字符串</em>'
            },
            option14: {
                direction: 'bottom',
                align: 'left',
                component: new Vue({
                    data: function () {
                        return {
                            a: '组件'
                        }
                    },
                    render(h){
                        return h("Wb-button", {}, [`我是${this.a}`])
                    }
                })
            },
            option15: {
                text: '确认删除吗？',
                confirm: true,
                onOk: function () {
                    _this.$Toast('点击了确定')
                },
                onCancel: function () {
                    _this.$Toast('点击了取消')
                }
            }
        }
    },
    methods: {
    }
}
</script>
