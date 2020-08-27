```html
<template>
    <Wb-button v-tooltip :tooltip-option="option13">html字符串</Wb-button>
</template>
<script>
    export default {
        data: function(){
            option13: {
                direction: 'bottom',
                align: "left",
                html: "<em>我是带em标签的字符串</em>",
            },
        }
    }
</script>
```