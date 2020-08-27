```html
<template>
    <Process-circle
        :size="250"
        :trail-width="4"
        :stroke-width="5"
        :percent="percent2"
        stroke-type="square"
        stroke-color="#3399ff">
        <div class="center-style">
            <p>统计结果</p>
            <span>占比{{percent2}}%</span>
        </div>
    </Process-circle>
</template>

<script>
  export default {
    data: function () {
        return {
            percent2:80
        }
    }
  }
</script>

<style lang="scss">
    .center-style{
        > p{
            color: #657180;
            font-size: 14px;
            margin: 10px 0 15px;
        }
        > span{
            display: block;
            padding-top: 15px;
            color: #657180;
            font-size: 14px;
        }
    }
</style>
  ```
