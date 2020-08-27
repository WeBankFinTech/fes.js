```html
<template>
    <Wb-table :data="data">
        <Column key="date" name="日期"></Column>
        <Column key="name" name="姓名"></Column>
        <Column key="age" name="年龄"></Column>
        <Column key="adr" name="地址"></Column>
        <Column key="status" name="等级"></Column>
    </Wb-table>
</template>
<script>
    export default {
        data: function(){
            return {
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
```