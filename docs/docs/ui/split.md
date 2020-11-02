---
pageClass: comp-page-class
---
# split 分割面板

## 概述
用于展示操作进度，告知用户当前状态

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基本使用" template="ui/templates/split/1.html">
            <template v-slot:demo>
                <div class="panel">
                    <split diretion="vertical">
                        <split-item>
                            1
                        </split-item>
                        <split-item>
                            2
                        </split-item>
                        <split-item>
                            3
                        </split-item>
                    </split>
                    <split>
                        <splitItem>
                            1
                        </splitItem>
                        <splitItem>
                            2
                        </splitItem>
                        <splitItem>
                            3
                        </splitItem>
                    </split>
                </div>
            </template>
            <template v-slot:description>
                <p>用鼠标拖动俩面板之间的线，可以改变面板的大小</p>
                <p>有两种方向：horizontal垂直，vertical水平</p>
            </template>
        </componetTemplate>
        <componetTemplate title="事件" template="ui/templates/split/3.html">
            <template v-slot:demo>
                <split 
                    @on-move-start="movestart" 
                    @on-moving="moving" 
                    @on-move-end="moveend"
                >
                    <splitItem @on-change="change">
                        1
                    </splitItem>
                    <splitItem>
                        2
                    </splitItem>
                </split>
            </template>
            <template v-slot:description>
                <p>Split组件在拖拽时抛出on-move-start、on-moving、on-move-end三个事件</p>
                    <p>当SplitItem组件的宽度或者高度发生改变时，抛出on-change事件，参数为{width, height}</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="设置初始值和范围" template="ui/templates/split/2.html">
            <template v-slot:demo>
                <split>
                    <splitItem width="0.3" min="0.2" max="0.5">
                        1
                    </splitItem>
                    <splitItem>
                        2
                    </splitItem>
                    <splitItem>
                        3
                    </splitItem>
                </split>
            </template>
            <template v-slot:description>
                <p>水平场景下，可以设置splitItem的初始宽度width, 最小宽度min，最大宽度max</p>
                <p>垂直场景下，可以设置splitItem的初始高度height, 最小高度min，最大高度max</p>
                <p>width/height/min/max如果值大于1表示绝对值px，如果小于1表示相对容器的高度或者宽度，例如0.1表示10%</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<script>
export default {
    data: function() {
        return {
            data1: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'number 3'
                }
            ],
            data2: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'number 3',
                    disabled: true
                },
                {
                    content: 'number 4',
                    divided: true
                }
            ],
            data3: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'sub 1',
                    children: [
                        {
                            content: 'number 3'
                        },
                        {
                            content: 'number 4',
                            divided: true
                        },
                        {
                            content: 'sub 2',
                            children: [
                                {
                                    content: 'sub 3',
                                    children: [
                                        {
                                            content: 'number 6'
                                        }
                                    ]
                                },
                                {
                                    content: 'number 5',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        movestart(){

        },
        moving(){

        },
        moveend(){

        },
        change (data){
            console.log(data)
        }
    }
}
</script>

<style>
    .ui-split {
        height: 300px;
        border: 1px solid #d7d7d7;
        margin: 20px 0;
    }
    .ui-split-vertical .ui-split-item:not(:first-child){
        border-top: 1px solid #d7d7d7;
    }
    .ui-split-horizontal .ui-split-item:not(:first-child){
        border-left: 1px solid #d7d7d7;
    }
</style>

## API

### Split props

|  属性   |                                 说明                                 |        类型         |       默认值        |
|:------- |:-------------------------------------------------------------------- |:------------------- |:------------------- |
| diretion | 面板分割的方向： vertical垂直、horizontal水平                                         | String | horizontal      |

### Split event

|   事件名    |          说明          | 返回值 |
|:----------- |:---------------------- |:------ |
| on-move-start | 按下分割线触发 | event  |
| on-moving | 按下分割线移动时触发 | event  |
| on-move-end | 松开按下的分割线时触发 | event  |


### SplitItem props
|  属性   |                                 说明                                 |        类型         |       默认值        |
|:------- |:-------------------------------------------------------------------- |:------------------- |:------------------- |
| width | 宽度，当面板是水平方向有效                                      | String、Number |               |
| height | 高度，当面板是垂直方向有效                                      | String、Number |               |
| min | 最小宽度/高度                                      | String、Number |               |
| max | 最大宽度/高度                                        | String、Number |               |

### SplitItem event
|   事件名    |          说明          | 回调参数 |
|:----------- |:---------------------- |:------ |
| on-change | 当宽度或者高度改变时触发 | {width, height}  |
