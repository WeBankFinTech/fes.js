<template>
    <div class="article">
        <h1>Process-circle 进度环</h1>
        <h2>代码示例</h2>
        <Row class="panel">
            <Cell  class="son-panel" span="12">
                <div class="panel-case">
                    <Row>
                        <Cell span="12">
                                <Process-circle :percent="100" stroke-color="#00cc66" >
                                    <Icon type="check" size="50" color="#00cc66"></Icon>
                                </Process-circle>
                        </Cell>
                        <Cell span="12">
                            <Process-circle :percent="80" stroke-type="square" :stroke-width="4" :trail-width="3">
                                <Icon type="download" size="50" color="#3399ff"></Icon>
                            </Process-circle>
                        </Cell>
                    </Row>
                </div>
                <div class="panel-header">
                    <span>基本用法</span>
                </div>
                <div class="panel-desc">
                    <p>Process-circle的属性有：percent百分比，size宽高，stroke-type,stroke-width,stroke-color,trail-width,trail-color</p>
                    <p>具体属性配置请查看下方的API表</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1></markdown1>
                </div>
            </Cell>
        </Row>


        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Process-circle :percent="percent" :size="100" :stroke-width="4" :trail-width="3" :stroke-color="color">
                        <span style="font-size:20px">{{percent}}%</span>
                    </Process-circle>
                    <Wb-button @click="add">+</Wb-button>
                    <Wb-button @click="minus">-</Wb-button>
                </div>
                <div class="panel-header">
                    <span>配合其他组件使用</span>
                </div>
                <div class="panel-desc">
                    <p>通过数据驱动实现视觉效果</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2></markdown2>
                </div>
            </Cell>
        </Row>



      <Row class="panel">
          <Cell class="son-panel" span="12">
              <div class="panel-case">
                  <Process-circle
                      :size="250"
                      :trail-width="4"
                      :stroke-width="5"
                      :percent="percent2"
                      stroke-type="square"
                      stroke-color="#3399ff">
                      <div class="center-style">
                          <p>统计结果</p>
                          <span>占比{{percent2}}%</span>
                      </div>
                  </Process-circle>
              </div>
              <div class="panel-header">
                  <span>自定义样式</span>
              </div>
              <div class="panel-desc">
                  <p>圆环中间设置居中的自定义样式可以按需求显示，实现图表统计功能</p>
              </div>
          </Cell>
          <div class="panel-split"></div>
          <Cell class="son-panel" span="12">
              <div class="code">
                  <markdown3></markdown3>
              </div>
          </Cell>
      </Row>

      <h2>API</h2>
      <h3>Process-circle props</h3>
      <markdown4></markdown4>
   </div>

</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/processCircle1.md'
    import markdown2 from './md/processCircle2.md'
    import markdown3 from './md/processCircle3.md'
    import markdown4 from './md/processCircle4.md'
    export default {
        components: {
            markdown1,markdown2,markdown3,markdown4
        },
        data: function () {
            return {
                percent:20,
                percent2:80
            }
        },
        ready: function () {
        },
        methods: {
            add () {
                if (this.percent >= 100) {
                    return false;
                }
                this.percent += 5;
            },
            minus () {
                if (this.percent <= 0){
                    return false;
                }
                this.percent -= 5;
            }
        },
        computed:{
            color () {
                let color = "#43a3fb";
                if(this.percent == 100){
                    color = "#00cc66";
                }
                return color;
            }
        }
    }
</script>

<style lang="scss">
    .center-style{
        > p{
            color: #657180;
            font-size: 14px;
            margin: 10px 0 15px;
        }
        > span{
            display: block;
            padding-top: 15px;
            color: #657180;
            font-size: 14px;
        }
    }
</style>
