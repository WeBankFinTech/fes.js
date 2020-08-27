```html
<template>
    <date-picker :value="new Date()"></date-picker>
    <br>
    <date-picker :value="[new Date()]" model="multiple"></date-picker>
    <br>
    <date-picker :value="[new Date('2018-08-09'), new Date()]" model="range"></date-picker>
</template>
<script>
    export default {
        data: function () {
            return {
            }
        },
    }
</script>

```