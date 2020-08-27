---
pageClass: comp-page-class
---
# Zoom 图片放大镜

## 概述
把小图片放大显示在屏幕中间，当按下Esc或者关闭按钮时隐藏图片。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/zoom/1.html">
            <template v-slot:demo>
                <img src="../../images/framework.jpg" v-zoom  style="width: 100px;"/>
            </template>
            <template v-slot:description>
                <p>在img标签上设置v-zoom指令，点击显示原图片。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="高级用法" template="ui/templates/zoom/2.html">
            <template v-slot:demo>
                <Wb-button v-zoom="zoomOption" type="primary">点击查看图片</Wb-button>
            </template>
            <template v-slot:description>
                <p>在任何dom或者组件上设置zoom指令，当点击时都会显示放大的图片</p>
                <p>src表示图片的路径，minWidth表示图片的最小宽度，maxWidth表示图片的最大宽度</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<script>
import png from "../../images/framework.jpg"
export default {
    data() {
        return {
            zoomOption: {
                src: png,
                minWidth: 200,
                maxWidth: 500
            }
        }
    },
    methods: {
    }
}
</script>

## API

### Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| src          |  图片路径  | String  |        null              |
| minWidth       | 图片最小宽度 | Number   |                     140                        |
| maxWidth        | 图片最大宽度 | Number   |                     window.innerWidth * 0.8                        |


