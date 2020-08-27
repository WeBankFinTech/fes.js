```html
<template>
    <Wb-input-date-picker :value="new Date()" disabled ></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker :value="new Date()" readonly ></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker :value="[new Date('2018-08-09'), new Date()]" model="range" disabled></Wb-input-date-picker>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
    }
</script>

```