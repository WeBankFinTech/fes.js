```html
<template>
    <Wb-button type="error" @click="click2">点我弹出错误的toast</Wb-button>
    <Wb-button type="warn" @click="click4">点我弹出警告的toast</Wb-button>
    <Wb-button type="success" @click="click3">点我弹出成功的toast</Wb-button>
</template>
<script>
    export default {
        methods: {
            click2: function () {
                this.$Toast.error("用户名或者密码不正确")
            },
            click3: function () {
                this.$Toast.success("创建订单成功")
            },
            click4: function () {
                this.$Toast.warn("请输入正确的用户名")
            }
        }
    }
</script>
```