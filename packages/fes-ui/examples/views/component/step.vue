<template>
    <div class="step-page article">
        <h1>Step 步骤条</h1>
        <h2>概述</h2>
        <p>拆分某项流程的步骤，引导用户按流程完成任务。</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Steps :current="2">
                        <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                        <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                    </Steps>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>基本用法，组件会根据current自动判断各步骤状态。</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1></markdown1>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Steps :current="2" size="small">
                        <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                        <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                    </Steps>
                </div>
                <div class="panel-header">
                    <span>迷你版</span>
                </div>
                <div class="panel-desc">
                    <p>设置属性size为small启用迷你版。</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2></markdown2>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <steps :current="2" direction="vertical">
                        <step title="已完成" content="这里是该步骤的描述信息"></step>
                        <step title="进行中" content="这里是该步骤的描述信息"></step>
                        <step title="待进行" content="这里是该步骤的描述信息"></step>
                        <step title="待进行" content="这里是该步骤的描述信息"></step>
                    </steps>
                </div>
                <div class="panel-header">
                    <span>垂直方向</span>
                </div>
                <div class="panel-desc">
                    <p>设置属性direction为vertical在垂直方向展示。</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown3></markdown3>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <steps :current="current" direction="vertical">
                        <step title="已完成" content="这里是该步骤的描述信息"></step>
                        <step title="进行中" content="这里是该步骤的描述信息"></step>
                        <step title="待进行" content="这里是该步骤的描述信息"></step>
                        <step title="待进行" content="这里是该步骤的描述信息"></step>
                    </steps>
                    <Wb-button type="primary" @click="next">下一步</Wb-button>
                </div>
                <div class="panel-header">
                    <span>切换步骤</span>
                </div>
                <div class="panel-desc">
                    <p>点击下一步改变current的值</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown4></markdown4>
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Steps props</h3>
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
                    <td style="text-align:left">current</td>
                    <td style="text-align:left">表示当前步骤，从1开始</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">1</td>
                </tr>
                <tr>
                    <td style="text-align:left">size</td>
                    <td style="text-align:left">步骤条的尺寸，可选值为small或者不写</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">direction</td>
                    <td style="text-align:left">步骤条的方向，可选值为horizontal（水平）或vertical（垂直）</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">horizontal</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>Step props</h3>
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
                    <td style="text-align:left">title</td>
                    <td style="text-align:left">标题</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">content</td>
                    <td style="text-align:left">步骤的描述内容，可选</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
                </tr>
                </tbody>
            </table>
        </section>
    </div>

</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/step1.md'
    import markdown2 from './md/step2.md'
    import markdown3 from './md/step3.md'
    import markdown4 from './md/step4.md'
    export default {
        components: {
            markdown1,markdown2,markdown3,markdown4
        },
        data: function () {
          return {
              current: 1
          }
        },
        ready: function () {
        },
        methods: {
            next: function () {
                this.current += 1;
                if(this.current > 4){
                    this.current = 1;
                }
            }
        }
    }
</script>

