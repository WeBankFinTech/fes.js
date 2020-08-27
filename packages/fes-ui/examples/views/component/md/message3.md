```html
<template>
    <Wb-button @click="click5">可配置的Message</Wb-button>
</template>
<script>
    export default {
         methods: {
            click5: function () {
                this.$Message({
                    title: '标题',              //可以传入文本和domString
                    template: '我是模版',        //可以传入文本和domString
                    buttons: [{                 //最多有两个, 第一条配置第一个button
                        text: '确定',
                        show: true,
                        class: "xx"
                    },{                         //配置第二个button
                        text: "放弃",
                        show: true,
                        class: "yy"
                    }]
                }).then(function (index) {
                    console.log(index)
                })
            }
         }
    }
</script>
```