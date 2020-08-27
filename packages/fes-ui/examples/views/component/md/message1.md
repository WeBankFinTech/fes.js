```html
<template>
    <Wb-button @click="click1">只显示内容</Wb-button>
    <Wb-button @click="click4">显示标题和内容</Wb-button>
</template>
<script>
    export default {
         methods: {
            click1: function () {
                this.$Message("我是提示").then(function (index) {
                    console.log(index)
                })
            },
         }
    }
</script>
```