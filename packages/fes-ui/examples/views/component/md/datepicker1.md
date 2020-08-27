```html
<template>
    <Wb-input-date-picker v-model="single1" clearable></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker v-model="single2" format="YYYY" placeholder="请选择年份"></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker v-model="single3" format="YYYY-MM" placeholder="请选择月份"></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker v-model="single4" format="YYYY-MM-DD HH:mm" placeholder="请选择日期"></Wb-input-date-picker>
    <br>
    <Wb-input-date-picker v-model="single5" format="YYYY-MM-DD HH:mm:ss" placeholder="请选择日期"></Wb-input-date-picker>
</template>
<script>
    export default {
        data() {
            return {
                single1: new Date(),
                single2: null,
                single3: null,
                single4: null,
                single5: null
            }
        },
    }
</script>
```