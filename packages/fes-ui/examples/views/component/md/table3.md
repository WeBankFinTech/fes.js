```html
<template>
    <Wb-table :data="data">
        <template v-for="col in cols">
            <Column v-if="col.prop==='name'||col.prop==='age'" :key="col.prop" :index="col.index" :prop="col.prop" :name="col.name" :component="component" />
            <Column v-else :key="col.prop" :prop="col.prop" :name="col.name" />
        </template>
    </Wb-table>
</template>
<script>
    export default {
        data: function(){
            return {
                cols: [{
                    prop: 'name',
                    name: '姓名',
                    index: -1,
                    show: true
                }, {
                    prop: 'age',
                    name: '年龄',
                    show: true
                }, {
                    prop: 'date',
                    name: '日期',
                    show: true
                }, {
                    prop: 'adr',
                    name: '地址',
                    show: true
                }, {
                    prop: 'status',
                    name: '状态',
                    show: true
                }],
                data: [{
                    name: "张晓刚",
                    age: 24,
                    date: new Date(2016, 9, 10),
                    adr: "北京市海淀区西二旗",
                    status: 1
                }, {
                    name: "李晓红",
                    age: 26,
                    date: new Date(2016, 9, 11),
                    adr: "北京市海淀区西二旗",
                    status: 2
                }, {
                    name: "隔壁老王",
                    age: 22,
                    date: new Date(2016, 9, 12),
                    adr: "北京市海淀区西二旗",
                    status: 3
                }, {
                    name: "我爸是李刚",
                    age: 19,
                    date: new Date(2016, 9, 13),
                    adr: "北京市海淀区西二旗",
                    status: 4
                }],
            }
        }
    }
</script>
<style lang="scss">
    .col_1{
        background-color: #2db7f5;
        color: #fff;
    }
    .row_1{
        color: red;
    }
    .error {
        background-color: #f60;
        color: #fff
    }
</style>
```