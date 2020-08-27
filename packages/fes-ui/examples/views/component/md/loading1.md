```html
<template>
    <Loading :show="show"></Loading>
    <Wb-button @click="show=!show">隐藏/显示</Wb-button>
</template>
<script>
    export default {
        data: function () {
            return {
                show: true
            }
        },
    }
</script>
```