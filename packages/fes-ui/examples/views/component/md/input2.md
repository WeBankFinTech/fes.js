```html
<template>
    <Wb-input :value.sync="text2" placeholder="请输入密码" type="password"></Wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
                text2: "",
            }
        },
    }
</script>
```