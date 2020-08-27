---
pageClass: comp-page-class
---
# Tooltip 文本提示

## 概述
文字提示气泡框，在鼠标悬停时显示，代替了系统的title提示。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/tooltip/1.html">
            <template v-slot:demo>
                <span v-tooltip="'这里是提示文字'">当鼠标经过这段文字时，会显示一个气泡框</span>
            </template>
            <template v-slot:description>
                <p>最简单的用法。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="html字符串" template="ui/templates/tooltip/2.html">
            <template v-slot:demo>
                <span v-tooltip="option13">当鼠标经过这段文字时，会显示一个内容是html的气泡框</span>
            </template>
            <template v-slot:description>
                <p>提示内容可以是html结构的字符串。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="confirm模式" template="ui/templates/tooltip/3.html">
            <template v-slot:demo>
                <span v-tooltip="option15">当鼠标经过这段文字时，会显示一个内容是询问的气泡框</span>
            </template>
            <template v-slot:description>
                <p>提示内容是一个confirm框。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="提示位置" template="ui/templates/tooltip/4.html">
            <template v-slot:demo>
                <div class="swap">
                    <div class="top">
                        <Wb-button v-tooltip="option1">上左</Wb-button>
                        <Wb-button v-tooltip="option2">上中</Wb-button>
                        <Wb-button v-tooltip="option3">上右</Wb-button>
                    </div>
                    <div class="center">
                        <div class="center-left">
                            <Wb-button v-tooltip="option4">左上</Wb-button>
                            <Wb-button v-tooltip="option5">左中</Wb-button>
                            <Wb-button v-tooltip="option6">左下</Wb-button>
                        </div>
                        <div class="center-right">
                            <Wb-button v-tooltip="option7">右上</Wb-button>
                            <Wb-button v-tooltip="option8">右中</Wb-button>
                            <Wb-button v-tooltip="option9">右下</Wb-button>
                        </div>
                    </div>
                    <div class="bottom">
                        <Wb-button v-tooltip="option10">下左</Wb-button>
                        <Wb-button v-tooltip="option11">下中</Wb-button>
                        <Wb-button v-tooltip="option12">下右</Wb-button>
                    </div>
                </div>
            </template>
            <template v-slot:description>
                <p>提供12个不同的方向显示Tooltip，具体配置可查看API。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="自定义组件" template="ui/templates/tooltip/5.html">
            <template v-slot:demo>
                <span v-tooltip="option14">当鼠标经过这段文字时，会显示一个内容是组件的气泡框</span>
            </template>
            <template v-slot:description>
                <p>提示内容可以是自定义的组件。</p>
            </template>
        </componetTemplate>
    </cell>
</row>
</ClientOnly>

<style lang="scss">
.ui-tooltip-text{
    font-size: 12px;
}
.swap{
    width: 500px;
    text-align: center;
    .top,
    .center,
    .bottom {
        width: 100%;
    }
    .center {
        padding: 0px 50px;
        height: 170px;
        .ui-button {
            margin-top: 20px;
        }
    }
    .center-left {
        float: left;
        width: 100px;
        height: 170px;
    }
    .center-right {
        float: right;
        width: 100px;
        height: 170px;
    }
}
</style>

<script>
import Vue from "vue"
export default {
    data() {
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
                html: '<em>我是带em标签的字符串</em>'
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

## API

### Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| text          |  提示的内容  | String  |        null              |
| html       | 提示的内容，是html结构的字符串 | String   |                 null                        |
| component       | 提示的内容，是一个vue组件 | Object   |                400            |
| direction        | 提示的朝向，相对于dom来说，可选值有`left`、`right`、`top`、`bottom` | String   |                   `bottom`              |
| align        | 提示内容相对于dom的位置，可选值有`top`、`bottom`、`center`、`right`、`left` | String   |                    `center`              |
| confirm        | 是否是询问模式 | Boolean   |                    false              |
| onOk        | 当询问模式时，点击确认按钮触发的函数 | Function   |                    null              |
| onCancel        | 当询问模式时，点击取消按钮触发的函数 | Function   |                    null              |