```html
<template>
    <contextmenu :data="actions" @on-choose="doAction">
        右键点击看看
    </contextmenu>
</template>
<script>
    export default {
        components: {
            markdown
        },
        data(){
            return {
                actions: [ ' 新增 ', ' 删除 ', ' 复制 ']
            }
        },
        methods: {
            doAction: function (data, index) {
                this.$Toast("点击了" + data)
            }
        }
    }
</script>
```
