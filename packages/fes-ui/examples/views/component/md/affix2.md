```html
<template>
    <Affix :offset-top="40" :target = "getTarget">
        <span class="demo-class">距离滚动元素.right-panel顶部200px</span>
    </Affix>
</template>
<script>
    export default {
      methods: {
          getTarget () {
              return document.getElementsByClassName('right-panel')[0]
          }
      }
    }
</script>
<style>
    .demo-class{
        height: 30px;
        padding:0px 10px;
        text-align:center;
        line-height: 30px;
        background: #3399ff;
        color: #fff;
        display: inline-block;
    }
</style>
```
