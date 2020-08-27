```html
<template>
    <Radio-group :value.sync="value" @on-change="change" type="button">
        <Radio value="1">
            北京
        </Radio>
        <Radio value="2">
            上海
        </Radio>
        <Radio value="3" :disabled="true">
            深圳
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