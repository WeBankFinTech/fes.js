<template>
    <div class="zoom-page article">
        <h1>Zoom 图片放大镜</h1>

        <h2>概述</h2>
        <p>把小图片放大显示在屏幕中间</p>
        <p>当按下Esc或者关闭按钮时隐藏图片</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <img src="../../images/girl.jpg" v-zoom  style="width: 100px;"/>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>在img标签上设置v-zoom指令，点击显示原图片</p>
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
                    <Wb-button v-zoom="zoomOption" type="primary">点击查看图片</Wb-button>
                </div>
                <div class="panel-header">
                    <span>高级用法</span>
                </div>
                <div class="panel-desc">
                    <p>在任何dom或者组件上设置zoom指令，当点击时都会显示放大的图片</p>
                    <p>src表示图片的路径，minWidth表示图片的最小宽度，maxWidth表示图片的最大宽度</p>
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
        <h3>Zoom props</h3>
        <markdown3 />
    </div>
</template>
<script>
import markdown1 from './md/zoom1.md'
import markdown2 from './md/zoom2.md'
import markdown3 from './md/zoom3.md'
export default {
    components: {
        markdown1, markdown2, markdown3
    },
    data() {
        return {
            zoomOption: {
                src: 'images/girl.jpg',
                minWidth: 200,
                maxWidth: 500
            }
        }
    },
    mounted: function () {
    },
    methods: {
    }
}
</script>

