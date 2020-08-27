<template>
    <div class="article">
        <h2>{{$t('overview')}}</h2>
        <p>
            根路由下所有page共用的外层
        </p>
        <router-view />
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    FesReady() {
        // do something
    }
};
</script>
