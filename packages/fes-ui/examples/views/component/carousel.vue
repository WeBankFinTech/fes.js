<template>
    <div class="button-page article">
        <h1>Carousel 轮播</h1>
        <h2>概述</h2>
        <p>基础组件，触发业务逻辑时使用</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Carousel :data="list" :interval="interval"></Carousel>
                </div>
                <div class="panel-header">
                    <span>基本用法</span>
                </div>
                <div class="panel-desc">
                    <p></p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                </div>
            </Cell>
        </Row>
    </div>


</template>
<script type="text/ecmascript-6">
import imgUrl from "../../images/web32002.jpg"
export default {
    data: function () {
        return {
            interval: 3000,
            list: [{
                image: imgUrl,
                link: ''
            }, {
                image: imgUrl,
                link: ''
            }]
        }
    }
}
</script>
