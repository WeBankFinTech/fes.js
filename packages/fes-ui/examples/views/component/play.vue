<template>
    <div class="article">
        <h1>快速上手</h1>

        <h2>引入 fes-ui</h2>
        <p>一般在 webpack 入口页面 main.js 中如下配置：</p>
        <markdown></markdown>

        <h2>组件使用规范</h2>
        <p>使用:prop传递数据格式为 数字、布尔值或函数时，必须带:(兼容String除外，具体看组件文档)</p>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown from './md/play.md'
    export default {
        components: {
            markdown
        },
        data: function () {
            return {
            }
        },
        ready: function () {
        },
        methods: {
        }
    }
</script>
