<template>
    <div class="article">
        <h2>{{$t('overview')}}</h2>
        <p>存放静态资源文件，不需要经过打包处理的，跟vue体系无关的前端资源可以放在这里</p>

        <a target="_blank" href="static/1.txt">
            点击下载 1.txt
        </a>
    </div>
</template>
<script>
export default {
    FesData() {
        return {
        };
    }
};
</script>
