```html
<template>
    <wb-input placeholder="请输入文本" :disabled="true"></wb-input>
    <wb-input type="textarea" placeholder="请输入文本" disabled></wb-input>
    <wb-input placeholder="请输入文本" :readonly="true"></wb-input>
    <wb-input type="textarea" placeholder="请输入文本" readonly></wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
            }
        },
    }
</script>
```