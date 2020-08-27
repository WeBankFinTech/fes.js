<template>
    <div class="checkbox-page article">
        <h1>Checkbox 多选</h1>
        <h2>概述</h2>
        <p>基本组件-多选框。基本组件-多选框。主要用于一组可选项多项选择，或者单独用于标记切换某种状态。</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    {{ single }}
                    <Checkbox v-model="single">checkbox</Checkbox>
                </div>
                <div class="panel-header">
                    <span>单独使用</span>
                </div>
                <div class="panel-desc">
                    <p>通过设置checked来标记是否选择，因为组件内部是使用v-model来绑定，所以需要将checked设置.sync实现数据的双向绑定，否则在改变状态时，使用者的数据并没有变化。</p>
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
                    <Checkbox-group v-model="value" @on-change="change">
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
                </div>
                <div class="panel-header">
                    <span>组合使用</span>
                </div>
                <div class="panel-desc">
                    <p>使用Checkbox-group配合数组来生成组合。在组合使用时，Checkbox不再根据checked参数来判断状态，而是根据传入的数组和value的值自动判断。需要将model设置.sync实现数据的双向绑定，否则在改变状态时，使用者的数据并没有变化。每个 Checkbox 的内容可以自定义，如不填写则默认使用 value 的值。</p>
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
                    <Checkbox-group v-model="value" vertical @on-change="change">
                        <Checkbox value="1">
                            <Icon type="apple-o" />apple
                        </Checkbox>
                        <Checkbox value="2" disabled>
                            <Icon type="android" />android
                        </Checkbox>
                        <Checkbox value="3">
                            <Icon type="github" />github
                        </Checkbox>
                    </Checkbox-group>
                </div>
                <div class="panel-header">
                    <span>垂直方向</span>
                </div>
                <div class="panel-desc">
                    <p>设置vertical 能让选项垂直排列</p>
                    <p>给checkbox 设置disabled，禁用此选项</p>
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
        <h3>CheckboxGroup props</h3>
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
                        <td style="text-align:left">Array</td>
                        <td style="text-align:left">[]</td>
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

        <h3>CheckboxGroup events</h3>
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

        <h3>Checkbox props</h3>
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
import markdown1 from './md/checkbox1.md'
import markdown2 from './md/checkbox2.md'
import markdown3 from './md/checkbox3.md'
export default {
    components: {
        markdown1, markdown2, markdown3
    },
    data: function () {
        return {
            single: false,
            value: ['3']
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
