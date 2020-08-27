```html
<template>
    <Wb-button @click="click2">alert模式</Wb-button>
    <Wb-button @click="click3">confirm模式</Wb-button>
</template>
<script>
    export default {
         methods: {
            click2: function () {
                this.$Message.alert("标题", "我是提示").then(function (index) {
                    console.log(index)
                })
            },
            click3: function () {
                this.$Message.confirm("标题", "我是提示").then(function (index) {
                    console.log(index)
                })
            },
         }
    }
</script>
```