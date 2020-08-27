```html
<template>
    <Affix :offset-bottom="0" :target = "getTarget" @on-change="change">
        <WB-button type="primary" long>距离滚动元素.right-panel底部80px</WB-button>
    </Affix>
</template>
<script>
    export default {
      methods: {
        methods: {
            change (status) {
                this.$Toast(`第三个图钉当前状态：${status}`);
            },
            getTarget () {
                return document.getElementsByClassName('right-panel')[0]
            }
        }
      }
    }
</script>
```
