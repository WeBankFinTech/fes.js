```html
<template>
    <Radio-group :value.sync="value" @on-change="change" vertical>
        <Radio value="1">
            <Icon type="apple-o"></Icon>apple
        </Radio>
        <Radio value="2">
            <Icon type="android"></Icon>android
        </Radio>
        <Radio value="3" :disabled="true">
            <Icon type="github"></Icon>github
        </Radio>
    </Radio-group>
</template>
<script>
    export default {
        data: function () {
            return {
                value: "1"
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