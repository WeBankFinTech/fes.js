```html
<template>
  <Dropdown :data="data1">
    <Wb-button type="primary">Hover</Wb-button>
  </Dropdown>
</template>
<script>
    export default {
        data: function() {
            return {
                data1: [
                    {
                        content: 'number 1'
                    },
                    {
                        content: 'number 2'
                    },
                    {
                        content: 'number 3'
                    }
                ]
            }
        }
    }
</script>
```
