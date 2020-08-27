```html
<template>
  <Dropdown :data="data2">
    <Wb-button type="primary">Hover</Wb-button>
  </Dropdown>
</template>
<script>
    export default {

        data: function() {
            return {
                data2: [
                    {
                        content: 'number 1'
                    },
                    {
                        content: 'number 2'
                    },
                    {
                        content: 'number 3',
                        disabled: true
                    },
                    {
                        content: 'number 4',
                        divided: true
                    }
                ]
            }
        }
    }
</script>
```
