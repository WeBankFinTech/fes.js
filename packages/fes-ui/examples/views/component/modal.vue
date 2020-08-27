<template>
    <div class="modal-page article">
        <h1>Modal 模态框</h1>
        <h2>概述</h2>
        <p>主要用于在不跳转页面的前提下，在当前流程里面展示部分内容，可以是表单可以是一大段描述。</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-button @click="showModal1">
                        显示普通模态框
                    </Wb-button>
                    <modal ref="modal1"
                           title="新增"
                           sub-title="客户信息"
                           :can-full-screen="true"
                           :before-close="beforeClose"
                           @on-close="close">
                        <Wb-form>
                            <Form-item label="输入框">
                                <Wb-input placeholder="我是文本哦" />
                            </Form-item>
                            <Form-item label="下拉框">
                                <Wb-select>
                                    <wb-option :value="1">
                                        北京市
                                    </wb-option>
                                    <wb-option :value="2">
                                        上海市
                                    </wb-option>
                                    <wb-option :value="3">
                                        深圳市
                                    </wb-option>
                                    <wb-option :value="4">
                                        杭州市
                                    </wb-option>
                                    <wb-option :value="5">
                                        南京市
                                    </wb-option>
                                    <wb-option :value="6">
                                        重庆市
                                    </wb-option>
                                </Wb-select>
                            </Form-item>
                            <Form-item label="单选框">
                                <Radio-group>
                                    <Radio value="1">
                                        <Icon type="apple-o" />apple
                                    </Radio>
                                    <Radio value="2">
                                        <Icon type="android" />android
                                    </Radio>
                                    <Radio value="3">
                                        <Icon type="github" />github
                                    </Radio>
                                </Radio-group>
                            </Form-item>
                            <Form-item label="多选框">
                                <Checkbox-group>
                                    <Checkbox value="1">
                                        <Icon type="apple-o" />apple
                                    </Checkbox>
                                    <Checkbox value="2">
                                        <Icon type="android" />android
                                    </Checkbox>
                                    <Checkbox value="3">
                                        <Icon type="github" />github
                                    </Checkbox>
                                </Checkbox-group>
                            </Form-item>
                            <Form-item label="开关">
                                <Wb-switch>
                                    <span slot="close">关</span>
                                    <span slot="open">开</span>
                                </Wb-switch>
                            </Form-item>
                            <Form-item>
                                <wb-button class="ui-button" @click="test">
                                    提交
                                </wb-button>
                            </Form-item>
                        </Wb-form>
                    </modal>
                </div>
                <div class="panel-header">
                    <span>普通模态框</span>
                </div>
                <div class="panel-desc">
                    <p>最基本的模态框</p>
                    <p>按下Esc、按下关闭按钮、点击Modal之外的区域均可以关闭Modal</p>
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
                    <Wb-button @click="showModal2">
                        显示超出屏幕高的模态框
                    </Wb-button>
                    <modal ref="modal2"
                           width="600"
                           title="我是标题"
                           sub-title="我是副标题"
                           @on-close="close"
                           @on-scroll="scroll">
                        <Wb-button type="primary" @click="open3">
                            增加高度
                        </Wb-button>
                        <div v-for="i in len" :key="i" style="height:300px;">
                            我是内容，我是内容
                        </div>
                    </modal>
                    <modal ref="modal3"
                           width="600"
                           title="我是标题"
                           sub-title="我是副标题"
                           @on-close="close"
                           @on-scroll="scroll">
                        <Wb-button type="primary" @click="add">
                            增加高度
                        </Wb-button>
                        <div v-for="i in len" :key="i" style="height:300px;">
                            我是内容，我是内容
                        </div>
                    </modal>
                </div>
                <div class="panel-header">
                    <span>超屏模态框</span>
                </div>
                <div class="panel-desc">
                    <p>超出屏幕高的模态框显示时，可以滚动查看</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2 />
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Modal props</h3>
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
                            主标题
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
                            subTitle
                        </td>
                        <td style="text-align:left">
                            副标题
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
                            width
                        </td>
                        <td style="text-align:left">
                            模态框的宽度
                        </td>
                        <td style="text-align:left">
                            String|Number
                        </td>
                        <td style="text-align:left">
                            400
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            show
                        </td>
                        <td style="text-align:left">
                            是否显示模态框, tips: 此属性必须设置为sync的
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
                            closeOnClickShadow
                        </td>
                        <td style="text-align:left">
                            点击阴影蒙层时是否关闭模态框
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            true
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <h3>Modal events</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">
                            事件名
                        </th>
                        <th style="text-align:left">
                            说明
                        </th>
                        <th style="text-align:left">
                            返回值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">
                            on-close
                        </td>
                        <td style="text-align:left">
                            关闭模态框时触发
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            on-scroll
                        </td>
                        <td style="text-align:left">
                            滚动模态框时触发
                        </td>
                        <td style="text-align:left">
                            event
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">import markdown1 from './md/modal1.md'
import markdown2 from './md/modal2.md'
export default {
    components: {
        markdown1, markdown2
    },
    data: function () {
        return {
            len: 1
        }
    },
    methods: {
        showModal1: function () {
            this.$refs.modal1.show()
        },
        showModal2: function () {
            this.$refs.modal2.show()
        },
        open3: function () {
            this.$refs.modal3.show()
        },
        close: function () {
            //
        },
        scroll: function () {
            //
        },
        add() {
            this.len += 1;
        },
        test() {
            this.$refs.modal2.show()
        },
        beforeClose() {
            // return true 执行关闭
            // 或者返回一个promise， resolve(true)
            return true
        }
    }
}
</script>
