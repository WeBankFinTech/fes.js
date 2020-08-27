```html
<Fes-search-panel>
    <Wb-form type="query" :label-width="150">
        <Form-item label="姓名：">
            <wb-input placeholder="请输入"></wb-input>
        </Form-item>
    </Wb-form>
    <div slot="button">
        <Wb-button type="primary" icon="search" @click="search">查询</Wb-button>
    </div>
</Fes-search-panel>
<Fes-list-panel>
    <Wb-table :data="data">
        <Column key="date" name="日期"></Column>
        <Column key="name" name="姓名"></Column>
        <Column key="age" name="年龄"></Column>
        <Column key="adr" name="地址"></Column>
        <Column key="status" name="等级"></Column>
    </Wb-table>
</Fes-list-panel>
<script type="text/ecmascript-6">
    export default {
        FesData: {
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
            }]
        },
        methods:{
            search(){
            },
            changePage(){
            }
        }
    }
</script>
```