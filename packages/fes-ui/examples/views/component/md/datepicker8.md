```html
<template>
    <Wb-input-date-picker :value.sync="value"></Wb-input-date-picker>
</template>
<script>
    export default {
        data: function () {
            return {
                value: "",
            }
        },
    }
</script>
```