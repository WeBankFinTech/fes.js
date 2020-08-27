```html
<template>
    <Wb-input :value.sync="text1" placeholder="请输入文本"></Wb-input>
    <Wb-input :value.sync="text1" :maxlength="10" placeholder="请输入文本"></Wb-input>
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