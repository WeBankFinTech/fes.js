---
pageClass: comp-page-class
---
# processCircle 进度环

## 概述
用于展示操作进度，告知用户当前状态

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/process-circle/1.html">
            <template v-slot:demo>
                <Row>
                    <Cell span="12">
                        <Process-circle :percent="100" stroke-color="#00cc66" stroke-type="round">
                            <Icon type="md-checkmark" size="50" color="#00cc66"></Icon>
                        </Process-circle>
                    </Cell>
                    <Cell span="12">
                        <Process-circle :percent="80" stroke-type="round" :stroke-width="4" :trail-width="3">
                            <Icon type="md-cloud-download" size="50" color="#3399ff"></Icon>
                        </Process-circle>
                    </Cell>
                </Row>
            </template>
            <template v-slot:description>
                <p>Process-circle的属性有：percent百分比，size宽高，stroke-type,stroke-width,stroke-color,trail-width,trail-color</p>
                <p>具体属性配置请查看下方的API表</p>
            </template>
        </componetTemplate>
        <componetTemplate title="自定义样式" template="ui/templates/process-circle/3.html">
            <template v-slot:demo>
                <Process-circle 
                    :size="250" 
                    :trail-width="4" 
                    :stroke-width="5" 
                    :percent="percent2" 
                    stroke-type="round" stroke-color="#3399ff"
                >
                    <div class="center-style">
                        <p>统计结果</p>
                        <span>占比{{percent2}}%</span>
                    </div>
                </Process-circle>
            </template>
            <template v-slot:description>
                <p>圆环中间设置居中的自定义样式可以按需求显示，实现图表统计功能</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="配合其他组件使用" template="ui/templates/process-circle/2.html">
            <template v-slot:demo>
                <Process-circle 
                    :percent="percent" 
                    :size="100"      
                    :stroke-width="4" 
                    :trail-width="3" 
                    :stroke-color="color"
                >
                    <span style="font-size:20px">{{percent}}%</span>
                </Process-circle>
                <Wb-button @click="add">+</Wb-button>
                <Wb-button @click="minus">-</Wb-button>
            </template>
            <template v-slot:description>
                <p>通过数据驱动实现视觉效果</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<script>
export default {
    data: function () {
        return {
            percent: 20,
            percent2: 80
        }
    },
    ready: function () {
    },
    methods: {
        add() {
            if (this.percent >= 100) {
                return false;
            }
            this.percent += 5;
        },
        minus() {
            if (this.percent <= 0) {
                return false;
            }
            this.percent -= 5;
        }
    },
    computed: {
        color() {
            let color = "#43a3fb";
            if (this.percent == 100) {
                color = "#00cc66";
            }
            return color;
        }
    }
}
</script>

<style lang="scss">
.center-style {
    >p {
        color: #657180;
        font-size: 14px;
        margin: 10px 0 15px;
    }
    >span {
        display: block;
        padding-top: 15px;
        color: #657180;
        font-size: 14px;
    }
}
</style>

## API

|     属性     |                     说明                     |  类型  | 默认值  |
|:------------ |:-------------------------------------------- |:------ |:------- |
| percent      | 百分比（1~100）                              | Number | 0       |
| size         | 圆环宽高长度 (px)                            | Number | 120     |
| stroke-type  | 圆环线框前景色头部形状，可选有两种：square,round | String | round   |
| stroke-width | 圆环线框前景色宽度 (px)                               | Number | 5       |
| stroke-color | 圆环线框前景色颜色                               | String | #3399ff |
| trail-width  | 圆环线框背景色宽度 (px)                             | Number | 4       |
| trail-color  | 圆环线框背景色颜色                               | String | #eaeef2        |

