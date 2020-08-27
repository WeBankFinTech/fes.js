```html
<template>
    <Wb-input-date-picker :minDate="new Date(2019, 7, 1)" :maxDate="new Date('2019-08-31')"></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker maxRange="2D" model="range"></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker :disable="[new Date()]"></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker :enable="[new Date()]"></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker :disabledDate="disabledDate"></Wb-input-date-picker>禁止每个月 3 号
</template>
<script>
    export default {
        data: function () {
            return {
            }
        },
        methods: {
            disabledDate(time) {
                if (time.getDate() === 3) {
                    return true;
                }
                false;
            }
        }
    }
</script>

```