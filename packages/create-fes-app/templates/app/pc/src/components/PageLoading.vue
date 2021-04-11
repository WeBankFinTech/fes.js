<template>
    <div class="page-loading">
        <Spin size="large" />
    </div>
</template>
<script>
import Spin from 'ant-design-vue/lib/spin';
import 'ant-design-vue/lib/spin/style/css';

export default {
    components: {
        Spin
    }
};
</script>
<style>
.page-loading{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
