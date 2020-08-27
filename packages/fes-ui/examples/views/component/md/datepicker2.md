```html
<template>
    <Wb-input-date-picker v-model="model1"></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker v-model="model2" model="multiple"></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker v-model="model3" model="range"></Wb-input-date-picker>
    <Wb-input-date-picker v-model="model4" format="YYYY-MM" model="range"></Wb-input-date-picker>
</template>
<script>
    export default {
        data() {
            return {
                model1: null,
                model2: null,
                model3: null,
                model4: null,
                model5: null
            }
        },
    }
</script>
```