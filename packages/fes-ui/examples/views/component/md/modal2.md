```html
<template>
    <Wb-button @click='showModal2'>显示超出屏幕高的模态框</Wb-button>
    <modal :show.sync="show2"
           width="600"
           title="我是标题"
           sub-title="我是副标题"
           @on-close="close"
           @on-scroll="scroll">
        <div style="height:1000px">
            我是内容，我是内容
        </div>
    </modal>
</template>
<script>
    export default {
        data: function () {
            return {
                show2: false
            }
        },
        ready: function () {
        },
        methods: {
            showModal2: function () {
                this.show2 = true;
            },
            close: function () {

            },
            scroll: function (event) {

            }
        }
    }
</script>
```