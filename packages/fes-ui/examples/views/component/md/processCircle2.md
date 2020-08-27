```html
<template>
  <Process-circle :percent="percent" :size="100" :stroke-width="4" :trail-width="3" :stroke-color="color">
      <span style="font-size:20px">{{percent}}%</span>
  </Process-circle>
  <Wb-button @click="add">+</Wb-button>
  <Wb-button @click="minus">-</Wb-button>
</template>
<script>
    export default {
        data: function () {
            return {
                percent:20
            }
        },
        methods: {
            add () {
                if (this.percent >= 100) {
                    return false;
                }
                this.percent += 5;
            },
            minus () {
                if (this.percent <= 0){
                    return false;
                }
                this.percent -= 5;
            }
        },
        computed:{
            color () {
                let color = "#43a3fb";
                if(this.percent == 100){
                    color = "#00cc66";
                }
                return color;
            }
        }
    }
</script>
```
