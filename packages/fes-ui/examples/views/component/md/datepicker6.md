```html
<template>
    <Date-picker :disable="disableDate"></Date-picker>
</template>
<script>
    export default {
        data: function () {
            let today = new Date().getTime();
            let minDate = new Date(new Date().getTime() - 1000*3600*24*5);
            let maxDate = new Date(new Date().getTime() + 1000*3600*24*5);
            return {
                disableDate: [new Date(today), function (date) {
                    if(date.day == 6){
                        return true
                    }
                }, {
                    from : minDate,
                    to: maxDate
                }]
            }
        },
    }
</script>
```