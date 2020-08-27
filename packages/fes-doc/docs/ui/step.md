---
pageClass: comp-page-class
---
# Step 步骤条

## 概述
拆分某项流程的步骤，引导用户按流程完成任务。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/step/1.html">
            <template v-slot:demo>
                <Steps :current="2">
                    <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                    <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                    <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                    <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                </Steps>
            </template>
            <template v-slot:description>
                <p>基本用法，组件会根据current自动判断各步骤状态。。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="垂直方向" template="ui/templates/step/3.html">
            <template v-slot:demo>
                <Steps :current="2" direction="vertical">
                    <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                    <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                    <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                    <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                </Steps>
            </template>
            <template v-slot:description>
                <p>设置属性direction为vertical在垂直方向展示。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="自定义节点标志" template="ui/templates/step/5.html">
            <template v-slot:demo>
                <Steps :current="current" direction="vertical">
                    <Step title="已完成" content="这里是该步骤的描述信息">
                        <Icon type="md-done-all"/>
                    </Step>
                    <Step title="进行中" content="这里是该步骤的描述信息">
                        <Icon type="md-done-all"/>
                    </Step>
                    <Step title="待进行" content="这里是该步骤的描述信息">
                        <Icon type="md-done-all"/>
                    </Step>
                    <Step title="待进行" content="这里是该步骤的描述信息">
                        <Icon type="md-done-all"/>
                    </Step>
                </Steps>
                <Wb-button type="primary" @click="next">下一步</Wb-button>
            </template>
            <template v-slot:description>
                <p>通过slot配置Step的节点标志</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="迷你版" template="ui/templates/step/2.html">
            <template v-slot:demo>
                <Steps :current="2" size="small">
                    <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                    <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                    <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                    <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                </Steps>
            </template>
            <template v-slot:description>
                <p>设置属性size为small启用迷你版。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="切换步骤" template="ui/templates/step/4.html">
            <template v-slot:demo>
                <Steps :current="current" direction="vertical">
                    <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                    <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                    <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                    <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                </Steps>
                <Wb-button type="primary" @click="next">下一步</Wb-button>
            </template>
            <template v-slot:description>
                <p>点击下一步改变current的值。</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<script>
export default {
    data() {
        return {
            current: 1
        }
    },
    methods: {
        next() {
            this.current += 1;
            if(this.current > 4){
                this.current = 1;
            }
        }
    }
}
</script>

## API

### Steps Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| current       | 表示当前步骤，从1开始         | Number  |        1              |
| size       |  步骤条的尺寸，可选值为`small`或者不写        |  String  |           null           |
| direction       |  步骤条的方向，可选值为`horizontal`（水平）或`vertical`（垂直）       | String  |        horizontal              |

### Step Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| title          |  标题 | String  |        null              |
| content        | 步骤的描述内容，可选 | String  |                     null                        |

### Step Solts
| 属性           | 说明                       |      
|:--------------|:--------------------------|
| default          |  更换节点的默认图标  |  
