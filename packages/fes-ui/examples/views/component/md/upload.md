```html
<template>
    <Wb-button v-upload :upload-option="option">点击上传</Wb-button>
</template>
<script>
    export default {
        data: function () {
            return {
                option: {
                    multiple: true,
                    api : "/upload"
                }
            }
        },
        ready: function () {
          this.$on("on-upload-success", function (data) {
          })
        }
    }
</script>
```