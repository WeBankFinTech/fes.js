```html
<template>
    <Wb-table ref="table" :data="data">
        <Column prop="name" :editable="editableName" name="姓名" />
        <Column prop="date" name="日期" />
        <Column prop="age" name="年龄" sort />
        <Column prop="adr" :editable="editableAddr" name="地址" />
        <Column prop="status" name="等级" />
    </Wb-table>
</template>
<script>
    export default {
        data: function(){
            return {
                data: [{
                      name: '张晓刚',
                      age: 24,
                      date: new Date(2016, 9, 10),
                      adr: '北京市海淀区西一旗',
                      status: 1
                  }, {
                      _selected: true,
                      name: '李晓红',
                      age: 26,
                      date: new Date(2016, 9, 11),
                      adr: '北京市海淀区西二旗',
                      status: 2
                  }, {
                      name: '隔壁老王',
                      age: 22,
                      date: new Date(2016, 9, 12),
                      adr: '北京市海淀区西二旗',
                      status: 3
                  }, {
                      name: '我爸是李刚',
                      age: 19,
                      date: new Date(2016, 9, 13),
                      adr: '北京市海淀区西二旗',
                      status: 4
                }],
                editableName: {
                    change: ( ...args ) => {
                        console.log(args)
                    }
                },
                editableAddr: {
                    type: 'select',
                    list: [ {value: '1', label: '北京市海淀区西一旗'}, {value: '2', label: '深圳市南山区'}, {value: '3', label: '深圳市罗湖区'} ],
                    validate: ( ...args ) => {
                        console.log(args);
                        return true
                    },
                    change: ( ...args ) => {
                        console.log(args)
                    }
                }
            }
        }
    }
</script>
```