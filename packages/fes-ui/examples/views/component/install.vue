<template>
    <div class="article">
        <h1>Install 安装</h1>
        <h2>NPM安装</h2>
        <markdown></markdown>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown from './md/install.md'
    export default {
        components: {
            markdown,
        },
        data: function () {
            return {
                markdown
            }
        },
        ready: function () {
        },
        methods: {
        }
    }
</script>
