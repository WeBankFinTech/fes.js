<template>
    <div :class="$style.red">字体颜色</div>
</template>
<config>
{
    "name": "cssModule",
    "title": "css Module 测试"
}
</config>
<script>
export default {
    setup() {
        return {};
    },
};
</script>

<style module>
.red {
    color: red;
}
</style>
