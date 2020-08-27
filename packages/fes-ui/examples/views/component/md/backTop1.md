```html
<template>
      <Back-top :target="getTarget" :height-to-show="100"></Back-top>
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
```
