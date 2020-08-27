```html
<template>
    <Wb-input :value.sync="text6" type="textarea" placeholder="请输入文本"></Wb-input>
    <Wb-input :value.sync="text6" type="textarea" :rows="4" placeholder="请输入文本"></Wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
                text6: "",
            }
        },
    }
</script>
```