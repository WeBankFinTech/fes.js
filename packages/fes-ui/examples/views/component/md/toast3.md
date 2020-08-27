```html
<template>
    <Wb-button @click="click5">显示普通的提示</Wb-button>
</template>
<script>
    export default {
        methods: {
            click5: function () {
                this.$Toast("正在加载中", 10000, function () {
                    console.log("关闭了")
                })
            }
        }
    }
</script>
```