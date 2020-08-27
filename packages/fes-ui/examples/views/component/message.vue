<template>
    <div class="message-page article">
        <h1>Message 提示</h1>
        <h2>概述</h2>
        <p>重量级的信息反馈组件，在屏幕中间显示，显示少量内容，给予提示，需要用户确认。</p>


        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-button @click="click1">
                        只显示内容
                    </Wb-button>
                    <Wb-button @click="click4">
                        显示标题和内容
                    </Wb-button>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>默认只有确认按钮。</p>
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
                    <Wb-button @click="click2">
                        alert模式
                    </Wb-button>
                    <Wb-button @click="click3">
                        confirm模式
                    </Wb-button>
                </div>
                <div class="panel-header">
                    <span>Message类型</span>
                </div>
                <div class="panel-desc">
                    <p>alert模式只有确认按钮，confirm模式有确认和取消按钮。</p>
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
                    <Wb-button @click="click5">
                        可配置的Message
                    </Wb-button>
                </div>
                <div class="panel-header">
                    <span>可配置的Message</span>
                </div>
                <div class="panel-desc">
                    <p>传入配置对象，可以配置标题、内容、按钮文字</p>
                    <p>标题和内容支持传入html</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown3 />
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Message instance</h3>
        <p>通过直接在vue实例里面调用以下方法来使用组件</p>
        <ul>
            <li>this.$Message(title, template) | this.$Message(option)</li>
            <li>this.$Message.success(title, template) | this.$Message.success(option)</li>
            <li>this.$Message.error(title, template) | this.$Message.error(option)</li>
            <li>this.$Message.warn(title, template) | this.$Message.warn(option)</li>
            <li>返回值是promise，当点击按钮时触发resolve，参数是按钮的index</li>
        </ul>
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
                            title
                        </td>
                        <td style="text-align:left">
                            标题
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
                            template
                        </td>
                        <td style="text-align:left">
                            提示内容
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
                            buttons
                        </td>
                        <td style="text-align:left">
                            配置按钮的数据，最多两个，多余的不显示
                        </td>
                        <td style="text-align:left">
                            Array
                        </td>
                        <td style="text-align:left">
                            []
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            buttons.text
                        </td>
                        <td style="text-align:left">
                            按钮文字
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
                            buttons.show
                        </td>
                        <td style="text-align:left">
                            按钮是否显示
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            true
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            buttons.class
                        </td>
                        <td style="text-align:left">
                            按钮的样式
                        </td>
                        <td style="text-align:left">
                            String
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
<script type="text/ecmascript-6">
import markdown1 from './md/message1.md'
import markdown2 from './md/message2.md'
import markdown3 from './md/message3.md'
export default {
    components: {
        markdown1, markdown2, markdown3
    },
    ready: function () {
    },
    methods: {
        click1: function () {
            this.$Message('我是提示').then(function (index) {
                console.log(index)
            })
        },
        click2: function () {
            this.$Message.alert('标题', '我是提示').then(function (index) {
                console.log(index)
            })
        },
        click3: function () {
            this.$Message.confirm('标题', '我是提示').then(function (index) {
                console.log(index)
            })
        },
        click4: function () {
            this.$Message('标题', '我是提示').then(function (index) {
                console.log(index)
            })
        },
        click5: function () {
            this.$Message({
                title: '<b>标题</b>', // 可以传入文本和domString
                template: '<div style="color:red">我是模版</div>', // 可以传入文本和domString
                buttons: [{ // 最多有两个, 第一条配置第一个button
                    text: '确定',
                    class: 'xx'
                }, { // 配置第二个button
                    text: '放弃',
                    class: 'yy'
                }]
            }).then(function (index) {
                console.log(index)
            })
        }
    }
}
</script>
