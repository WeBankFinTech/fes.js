<template>
    <div class="input-page article">
        <h1>Input 输入框</h1>
        <h2>概述</h2>
        <p>基本表单组件，支持 input 和 textarea，并在原生控件基础上进行了功能扩展，可以组合使用。</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-input v-model="text11" type="file" />
                    <Wb-input v-model="text1" placeholder="请输入文本" clearable @on-change="change" @on-input="change" />
                    <Wb-input v-model="text1" :maxlength="10" placeholder="请输入文本" />
                    <Wb-input v-model="text1" placeholder="请输入文本" width="200px" />
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>默认宽度是100%</p>
                    <p>通过placeholder设置未输入时的提示文字</p>
                    <p>通过maxlength设置最大输入长度</p>
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
                    <Wb-input v-model="text2" placeholder="请输入密码" type="password" />
                </div>
                <div class="panel-header">
                    <span>Password 输入框</span>
                </div>
                <div class="panel-desc">
                    <p>设置type为password即为password输入框，支持切换显示隐藏输入内容</p>
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
                    <Wb-input v-model="text3" placeholder="请输入数字" type="number" />
                </div>
                <div class="panel-header">
                    <span>Number 输入框</span>
                </div>
                <div class="panel-desc">
                    <p>设置type为number即为number输入框，只能输入数字</p>
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
                    <Wb-input v-model="text4" icon="calendar" />
                </div>
                <div class="panel-header">
                    <span>Icon 按钮</span>
                </div>
                <div class="panel-desc">
                    <p>通过 icon 属性可以在输入框右边加一个图标</p>
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
                    <Wb-input v-model="text5" placeholder="请输入网址">
                        <span slot="prepend">http://</span>
                        <span slot="append">.com</span>
                    </Wb-input>
                    <Wb-input v-model="text5" placeholder="日活">
                        <span slot="prepend">http://</span>
                        <span slot="append"><Icon type="search" /></span>
                    </Wb-input>
                </div>
                <div class="panel-header">
                    <span>复合型输入</span>
                </div>
                <div class="panel-desc">
                    <p>通过前置和后置的 slot 可以实现复合型的输入框。</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown5 />
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-input v-model="text6" type="textarea" placeholder="请输入文本" />
                    <Wb-input v-model="text6" :rows="4" type="textarea" placeholder="请输入文本" />
                </div>
                <div class="panel-header">
                    <span>文本域</span>
                </div>
                <div class="panel-desc">
                    <p>通过设置属性 type 为 textarea 来使用文本域，用于多行输入。</p>
                    <p>通过设置属性 rows 控制文本域默认显示的行数。</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown6 />
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <wb-input :autosize="true" v-model="text7" type="textarea" placeholder="请输入文本" />
                    <wb-input :autosize="{min:4, max:6}" v-model="text7" type="textarea" placeholder="请输入文本" />
                </div>
                <div class="panel-header">
                    <span>适应文本高度的文本域</span>
                </div>
                <div class="panel-desc">
                    <p>设置属性 autosize，文本域会自动适应高度的变化。</p>
                    <p>autosize也可以设定为一个对象，指定最小行数和最大行数。</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown7 />
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <wb-input :disabled="true" placeholder="请输入文本" />
                    <wb-input type="textarea" placeholder="请输入文本" disabled />

                    <wb-input :readonly="true" placeholder="请输入文本" />
                    <wb-input type="textarea" placeholder="请输入文本" readonly />
                </div>
                <div class="panel-header">
                    <span>禁用状态/只读状态</span>
                </div>
                <div class="panel-desc">
                    <p>设置属性 disabled，文本域会禁止输入，不能获取到焦点，并且显示为disabled状态。</p>
                    <p>设置属性 readonly，文本域会不能输入。</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown8 />
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Input props</h3>
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
                        <td style="text-align:left">输入的值，必须设置为.sync</td>
                        <td style="text-align:left">Number, String</td>
                        <td style="text-align:left">""</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">type</td>
                        <td style="text-align:left">类型，可选值有"password"、"number"、"text"、"textarea"</td>
                        <td style="text-align:left">String</td>
                        <td style="text-align:left">"text"</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">placeholder</td>
                        <td style="text-align:left">内容为空时的提示语</td>
                        <td style="text-align:left">String</td>
                        <td style="text-align:left">""</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">maxlength</td>
                        <td style="text-align:left">限制输入的内容长度</td>
                        <td style="text-align:left">Number</td>
                        <td style="text-align:left">null</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">icon</td>
                        <td style="text-align:left">右侧的小图标</td>
                        <td style="text-align:left">String</td>
                        <td style="text-align:left">null</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">disabled</td>
                        <td style="text-align:left">是否禁止输入</td>
                        <td style="text-align:left">Boolean</td>
                        <td style="text-align:left">false</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">readonly</td>
                        <td style="text-align:left">是否只读</td>
                        <td style="text-align:left">Boolean</td>
                        <td style="text-align:left">false</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">rows</td>
                        <td style="text-align:left">文本域的行数</td>
                        <td style="text-align:left">Number</td>
                        <td style="text-align:left">2</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">autosize</td>
                        <td style="text-align:left">文本域的行数高度跟随内容自动变化</td>
                        <td style="text-align:left">Boolean|Object</td>
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
                        <td style="text-align:left">on-click</td>
                        <td style="text-align:left">点击icon时触发</td>
                        <td style="text-align:left">event</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">on-enter</td>
                        <td style="text-align:left">焦点在input, 按下enter键触发</td>
                        <td style="text-align:left">event</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">on-focus</td>
                        <td style="text-align:left">获取焦点时触发</td>
                        <td style="text-align:left">event</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">on-blur</td>
                        <td style="text-align:left">失去焦点时触发</td>
                        <td style="text-align:left">event</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">on-input</td>
                        <td style="text-align:left">输入时触发</td>
                        <td style="text-align:left">value, event</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">on-change</td>
                        <td style="text-align:left">值改变时触发</td>
                        <td style="text-align:left">value, event</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
import markdown1 from './md/input1.md'
import markdown2 from './md/input2.md'
import markdown3 from './md/input3.md'
import markdown4 from './md/input4.md'
import markdown5 from './md/input5.md'
import markdown6 from './md/input6.md'
import markdown7 from './md/input7.md'
import markdown8 from './md/input8.md'
export default {
    components: {
        markdown1, markdown2, markdown3, markdown4, markdown5, markdown6, markdown7, markdown8
    },
    data: function () {
        return {
            text1: '',
            text2: '',
            text3: '',
            text4: '',
            text5: '',
            text6: '',
            text7: '',
            text11: ''
        }
    },
    ready: function () {
    },
    methods: {
        change() {
            console.log(this.text1)
        }
    }
}
</script>
