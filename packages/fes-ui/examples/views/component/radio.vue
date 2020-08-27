<template>
    <div class="radio-page article">
        <h1>Radio 单选</h1>
        <h2>概述</h2>
        <p>基本组件-单选框。主要用于一组可选项单项选择，或者单独用于切换到选中状态。</p>

        <h2>代码示例</h2>
        <!-- <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Radio v-model="checked">
                        是否同意xxxx
                    </Radio>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>使用Radio-group实现一组互斥的选项组。在组合使用时，Radio不再根据checked参数来判断状态，而是根据传入的model和value的值自动判断。需要将model设置.sync实现数据的双向绑定，否则在改变状态时，使用者的数据并没有变化。每个 Radio 的内容可以自定义，如不填写则默认使用 value 的值。</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1 />
                </div>
            </Cell>
        </Row> -->


        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Radio-group v-model="value1" @on-change="change">
                        <Radio value="1">
                            <Icon type="apple-o" />apple
                        </Radio>
                        <Radio value="2">
                            <Icon type="android" />android
                        </Radio>
                        <Radio value="3" disabled>
                            <Icon type="github" />github
                        </Radio>
                    </Radio-group>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>使用Radio-group实现一组互斥的选项组。在组合使用时，Radio不再根据checked参数来判断状态，而是根据传入的model和value的值自动判断。需要将model设置.sync实现数据的双向绑定，否则在改变状态时，使用者的数据并没有变化。每个 Radio 的内容可以自定义，如不填写则默认使用 value 的值。</p>
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
                    <Radio-group v-model="value2" vertical @on-change="change">
                        <Radio value="1">
                            <Icon type="apple-o" />apple
                        </Radio>
                        <Radio value="2">
                            <Icon type="android" />android
                        </Radio>
                        <Radio value="3" disabled>
                            <Icon type="github" />github
                        </Radio>
                    </Radio-group>
                </div>
                <div class="panel-header">
                    <span>垂直方向</span>
                </div>
                <div class="panel-desc">
                    <p>设置属性 vertical ，选项垂直排列</p>
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
                    <Radio-group v-model="value3" type="button" @on-change="change">
                        <Radio value="1">
                            北京
                        </Radio>
                        <Radio value="2">
                            上海
                        </Radio>
                        <Radio value="3" disabled>
                            深圳
                        </Radio>
                    </Radio-group>
                </div>
                <div class="panel-header">
                    <span>按钮</span>
                </div>
                <div class="panel-desc">
                    <p>设置属性 type=button ，radio显示为按钮的样子</p>
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
        <h3>RadioGroup props</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">属性</th>
                        <th style="text-align:left">说明</th>
                        <th style="text-align:left">类型</th>
                        <th style="text-align:left">默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">value</td>
                        <td style="text-align:left">选择的值，必须设置为.sync</td>
                        <td style="text-align:left">Number, String</td>
                        <td style="text-align:left">""</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">vertical</td>
                        <td style="text-align:left">选项排列方向</td>
                        <td style="text-align:left">Boolean</td>
                        <td style="text-align:left">false</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <h3>Input events</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">事件名</th>
                        <th style="text-align:left">说明</th>
                        <th style="text-align:left">返回值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">on-change</td>
                        <td style="text-align:left">值改变时触发</td>
                        <td style="text-align:left">event</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <h3>Radio props</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">属性</th>
                        <th style="text-align:left">说明</th>
                        <th style="text-align:left">类型</th>
                        <th style="text-align:left">默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">value</td>
                        <td style="text-align:left">选项的值，必输</td>
                        <td style="text-align:left">Number, String</td>
                        <td style="text-align:left">""</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">checked</td>
                        <td style="text-align:left">是否被选中</td>
                        <td style="text-align:left">Boolean</td>
                        <td style="text-align:left">false</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">disabled</td>
                        <td style="text-align:left">是否禁用</td>
                        <td style="text-align:left">Boolean</td>
                        <td style="text-align:left">false</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
import markdown1 from './md/radio1.md'
import markdown2 from './md/radio2.md'
import markdown3 from './md/radio3.md'
export default {
    components: {
        markdown1, markdown2, markdown3
    },
    data: function () {
        return {
            checked: false,
            value1: '1',
            value2: '1',
            value3: '1'
        }
    },
    ready: function () {
    },
    methods: {
        change(val) {
            console.log(val)
        }
    }
}
</script>
