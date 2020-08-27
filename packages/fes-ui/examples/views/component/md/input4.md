```html
<template>
    <Wb-input :value.sync="text4" icon="calendar"></Wb-input>
</template>
<script>
    export default {
        data: function () {
            return {
                text4: "",
            }
        },
    }
</script>
```