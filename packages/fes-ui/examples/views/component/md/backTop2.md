```html
<template>
    <Back-top style="bottom: 100px" :target="getTarget" :height-to-show="500">
        <div class = "self-cls">TOP</div>
    </Back-top>
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
<style scoped>
    .self-cls{
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 50%;
        text-align: center;
        color: #fff;
        fontSize: 20px;
        background-color: #5cadff;
    }
    .self-cls:hover{
        background-color: #3399ff;
    }
</style>
```
