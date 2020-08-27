<template>
    <div>
        <Fes-search-panel>
            <Wb-form :label-width="150" type="query">
                <Form-item label="姓名：">
                    <wb-input placeholder="请输入" />
                </Form-item>
                <Form-item label="身份证：">
                    <wb-input placeholder="请输入" />
                </Form-item>
            </Wb-form>
            <div slot="button">
                <Wb-button @click="search" type="primary" icon="search">
                    查询
                </Wb-button>
            </div>
        </Fes-search-panel>
        <Fes-list-panel>
            <Wb-table :data="data">
                <Column prop="date" name="日期" />
                <Column prop="name" name="姓名" />
                <Column prop="age" name="年龄" />
                <Column prop="adr" name="地址" />
                <Column prop="status" name="等级" />
            </Wb-table>
            <Pagination :size="paginationOption.pageSize" :current="paginationOption.currentPage" :total="paginationOption.totalPage" @on-change="changePage" />
        </Fes-list-panel>
    </div>
</template>
<script>
export default {
    FesHeader: true,
    FesData() {
        return {
            data: [{
                name: '张晓刚',
                age: 24,
                date: new Date(2016, 9, 10),
                adr: '北京市海淀区西二旗',
                status: 1
            }, {
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
            paginationOption: {
                pageSize: 10,
                currentPage: 1,
                totalPage: 1
            }
        };
    },
    methods: {
        search() {
            // do something
        },
        changePage() {
            // do something
        }
    }
};

</script>
