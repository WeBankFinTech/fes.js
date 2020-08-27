```html
<template>
    <Affix :target = "getTarget">
        <WB-button type="primary" long>默认距离顶部0px(此处为.right-panel,默认为window)</span>
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
```
