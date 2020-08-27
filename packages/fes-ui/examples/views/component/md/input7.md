```html
<template>
    <wb-input type="textarea" :autosize="true" :value.sync="text7" 
        placeholder="请输入文本"></wb-input>
    <wb-input type="textarea" :autosize="{min:4, max:6}" :value.sync="text7" 
        placeholder="请输入文本"></wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
                text7: "",
            }
        },
    }
</script>
```