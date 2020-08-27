<template>
    <section class="code-box">
        <section class="code-box-demo">
            <slot name="demo"></slot>
        </section>
        <section class="code-box-meta">
            <div class="code-box-title">
                {{this.title}}
            </div>
            <div class="code-box-description">
                <slot name="description"></slot>
            </div>
            <div class="code-box-actions">
                <span v-show="!show" @click="toggle">显示代码</span>
                <span v-show="show" @click="toggle">隐藏代码</span>
            </div>
            <div v-show="show" class="code-box-template">
                <iframe :src="this.tp" />
            </div>
        </section>
    </section>
</template>
<script>
export default {
    name: "componetTemplate",
    props: {
        title: String,
        template: String
    },
    data() {
        return {
            show: false
        }
    },
    computed: {
        tp(){
            return this.$site.base + this.template
        }
    },
    methods: {
        toggle(){
            this.show = !this.show;
        }
    }
}
</script>
<style lang="scss" scoped>
.code-box{
    position: relative;
    display: inline-block;
    width: 100%;
    margin: 16px 0;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    transition: all .2s;
    .code-box-demo{
        background-color: #fff;
        padding: 42px 24px 50px;
        color: rgba(0,0,0,.85);
        border-bottom: 1px solid #f0f0f0;
    }
    .code-box-meta{
        position: relative;
        width: 100%;
        font-size: 14px;
        border-radius: 0 0 2px 2px;
        transition: background-color .4s;
        .code-box-title{
            position: absolute;
            top: -14px;
            margin-left: 16px;
            padding: 1px 8px;
            color: #777;
            background: #fff;
            border-radius: 2px 2px 0 0;
        }
        .code-box-description{
            padding: 18px 24px 12px;
        }
        .code-box-actions{
            display: flex;
            justify-content: center;
            padding: 12px 0;
            border-top: 1px dashed #f0f0f0;
            opacity: .7;
            transition: opacity .3s;
        }
        .code-box-template iframe{
            border: 0;
            width: 100%;
            height: 300px;
        }
    }
}
</style>
