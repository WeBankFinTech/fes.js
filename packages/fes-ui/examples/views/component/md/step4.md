```html
<template>
    <steps :current="current" direction="vertical">
        <step title="已完成" content="这里是该步骤的描述信息"></step>
        <step title="进行中" content="这里是该步骤的描述信息"></step>
        <step title="待进行" content="这里是该步骤的描述信息"></step>
        <step title="待进行" content="这里是该步骤的描述信息"></step>
    </steps>
    <Wb-button type="primary" @click="next">下一步</Wb-button>
</template>
<script>
    export default {
        data: function () {
          return {
              current: 1
          }
        },
        methods: {
            next: function () {
                this.current += 1;
                if(this.current > 4){
                    this.current = 1;
                }
            }
        }
    }
</script>
```