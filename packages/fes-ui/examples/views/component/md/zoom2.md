```html
<template>
    <Wb-button v-zoom :zoom-option="zoomOption" type="primary">点击查看图片</Wb-button>
</template>
<script>
    export default {
        data: function () {
          return {
              zoomOption: {
                  src: "images/girl.jpg",
                  minWidth: 200,
                  maxWidth: 500
              }
          }
        }
    }
</script>
```