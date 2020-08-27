```html
<template>
    <Draggable v-model="list" @on-sort-ready="dragready" @on-sort-end="dragend" class="category-draggable">
        <template slot-scope="{item, index}">
            <p>{{item.content}}</p>
        </template>
    </Draggable>
    <!--注意：vue2.5以下的写法有所不同-->
    <Draggable v-model="list" @on-sort-ready="dragready" @on-sort-end="dragend" class="category-draggable">
        <template scope="{item, index}">
            <p>{{item.content}}</p>
        </template>
    </Draggable>
</template>
<script>
    export default {
        data: function () {
            return {
                list: [
                    {
                        content: '序号一',
                        key: 1
                    },
                    {
                        content: '序号二',
                        key: 2
                    },
                    {
                        content: '序号三',
                        key: 3
                    }
                ]
            }
        },
         methods: {
        }
    }
</script>
<style>
 .ui-dragging-item{
     background: #eee;
 }
</style>
```
