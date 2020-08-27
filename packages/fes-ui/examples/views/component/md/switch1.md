```html
<template>
    <Switch v-model="switch1" @on-change="change"></Switch>
</template>
<script>
    export default {
        data () {
            return {
                switch1: false
            }
        },
        methods: {
            change (status) {
                this.$Toast('开关状态：' + status);
            }
        }
    }
</script>
```