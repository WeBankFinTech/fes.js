```html
<template>
  <Dropdown :data="data3" @on-choose="clickItem">
    <a href="javascript:void(0)">Hover</a>
  </Dropdown>
</template>
<script>
export default {
    data: function() {
        return {  
            data3: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'sub 1',
                    children: [
                        {
                            content: 'number 3'
                        },
                        {
                            content: 'number 4',
                            divided: true
                        },
                        {
                            content: 'sub 2',
                            children: [
                                {
                                    content: 'sub 3',
                                    children: [
                                        {
                                            content: 'number 6'
                                        }
                                    ]
                                },
                                {
                                    content: 'number 5',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        clickItem (data){
          alert(data.content+' is clicked');
        }
    }
}
</script>
```
