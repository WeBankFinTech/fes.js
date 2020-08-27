```html
<template>
    <Wb-button v-tooltip :tooltip-option="option14">component模版</Wb-button>
</template>
<script>
    export default {
        data: function(){
            option14: {
                direction: 'bottom',
                align: "left",
                component: new Vue({
                    data : function () {
                        return {
                            a: "组件",
                        }
                    },
                    template: "<Wb-button>我是{{a}}</Wb-button>"
                })
            },
        }
    }
</script>
```