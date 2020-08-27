<template>
    <div class="article">
        <h1>何为Fes</h1>
        <p>Fast！ Easy！ Strong！</p>

        <h2>为何需要Fes？</h2>
        <p>
            不管啥产品出来，总会有一个对应的管理后台系统。管理后台系统呢，大致就是权限、查询、增删改这些东西，技术含量低。但是大量的查询、表单处理、接口又要耗费不少开发调试时间。
            Fes应运而生，管理开发到部署整个流程。提供cli工具、提供丰富的组件、提供便捷的开发体验。降低开发的门槛，减少开发的工作量。
        </p>

        <h2>Fes是什么？</h2>
        <p>
            Fes是一整套解决方案。包含cli工具、fes-ui、fes.js三部分。cli解决创建工程、开发调试、打包发布。
            fes-ui则是一套基于ant.design的PC端组件库。fes.js是对Vue.js的扩展，Vue的API都可以用使用，建议先阅读学习<a target="_blank" href="http://v1-cn.vuejs.org/guide/">vue1.0</a>。
        </p>

        <h2>愿景</h2>
        <p>
           开发着只需要写写表单，调调接口就够了。不需要关系发布，不需要关系底层技术比如Vue.js。解放咋们的生产力。
        </p>
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
        methods: {}
    }
</script>
