```html
<template>
    <Wb-input :value.sync="text3" placeholder="请输入数字" type="number"></Wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
                text3: "",
            }
        },
    }
</script>
```