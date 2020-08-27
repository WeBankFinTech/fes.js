```html
<template>
    <Checkbox-group :value.sync="value" @on-change="change">
        <Checkbox value="1">
            <Icon type="apple-o"></Icon>apple
        </Checkbox>
        <Checkbox value="2">
            <Icon type="android"></Icon>android
        </Checkbox>
        <Checkbox value="3">
            <Icon type="github"></Icon>github
        </Checkbox>
    </Checkbox-group>
</template>
<script>
    export default {
        data: function () {
            return {
                value: "3"
            }
        },
        methods: {
            change: function (value) {
                console.log(value)
            }
        }
    }
</script>
```