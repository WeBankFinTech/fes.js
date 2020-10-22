<template>
    <div class="page-404">
        <img class="page-404-bg" src="~assets/images/404.png" />
        <div class="page-404-title">404</div>
        <div class="page-404-subtilte">对不起, 你访问的页面不存在！</div>
        <Wb-button @click="goHome" class="page-404-button" type="primary">返回首页</Wb-button>
    </div>
</template>
<script>
export default {
    methods: {
        goHome() {
            this.FesApp.router.push('/dashboard/console');
        }
    }
};
</script>
<style lang="scss" scoped>
.page-404{
    text-align: center;
    .page-404-bg{
        display: block;
        width: 600px;
        margin:  50px auto;
    }
    .page-404-title{
        color: rgba(0, 0, 0, 0.85);
        font-size: 24px;
        line-height: 1.8;
        text-align: center;
    }
    .page-404-subtilte{
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 1.6;
        text-align: center;
    }
    .page-404-button{
        margin-top: 24px;
    }
}
</style>
