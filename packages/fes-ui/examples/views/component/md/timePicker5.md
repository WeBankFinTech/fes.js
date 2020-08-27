```html
<template>
    <time-picker
        v-model="pickeredTime"
        :disabledHours="disabledHours"
        :disabledMinutes="disabledMinutes"
        :disabledSeconds="disabledSeconds"
    >
        <template slot="addon"> <p>hello world</p></template>
    </time-picker>
</template>
<script>
    export default {
        data: function () {
            return {
                primaryTime: ''
            }
        },
        watch: {
            pickeredTime() {
                console.log('example', this.pickeredTime);
            }
        },
        methods: {
            disabledHours() {
                return [2];
            },
            disabledMinutes(hour) {
                console.log(hour);
                if (hour === '03) {
                    return [3, 4, 5];
                }
            },
            disabledSeconds(hour, minute) {
                console.log(hour, minute);
                if (hour === '04' && minute === '05') {
                    return [3,4];
                }
            }
        }
    }
</script>
```