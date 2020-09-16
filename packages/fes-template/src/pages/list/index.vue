<template>
    <div class="page">
        <div class="page-header">
            <div class="page-header-title">查询列表</div>
        </div>
        <div class="page-body">
            <fes-search-panel>
                <Wb-form :label-width="150" type="query">
                    <Form-item label="姓名：">
                        <wb-input v-model="query.name" placeholder="请输入" />
                    </Form-item>
                    <Form-item label="身份证：">
                        <wb-input v-model="query.id" placeholder="请输入" />
                    </Form-item>
                </Wb-form>
                <div slot="button">
                    <Wb-button @click="search" type="primary" icon="md-search">查询</Wb-button>
                    <Wb-button @click="add" type="primary" icon="md-add">新增</Wb-button>
                </div>
            </fes-search-panel>
            <fes-list-panel>
                <Wb-table :data="data">
                    <Column prop="date" name="日期" />
                    <Column prop="name" name="姓名" />
                    <Column prop="age" name="年龄" />
                    <Column prop="adr" name="地址" />
                    <Column :filter="FesMap.level" prop="status" name="等级" />
                    <Column :action="action" name="配置" />
                </Wb-table>
                <Pagination
                    :size="paginationOption.pageSize"
                    :current="paginationOption.currentPage"
                    :total="paginationOption.totalPage"
                    @on-change="changePage"
                />
            </fes-list-panel>
        </div>
        <modal ref="createModal" title="新增用户">
            <Wb-form ref="formValidate" :label-width="60">
                <Form-item label="姓名：" prop="name">
                    <wb-input placeholder="请输入用户名"></wb-input>
                </Form-item>
                <Form-item label="年龄：" prop="name">
                    <wb-input type="number" placeholder="请输入用户名"></wb-input>
                </Form-item>
                <Form-item label="日期：" prop="name">
                    <Wb-input-date-picker />
                </Form-item>
                <Form-item>
                    <Wb-button ref="addButton" @click="handleAdd" type="primary">提交</Wb-button>
                </Form-item>
            </Wb-form>
        </modal>
        <modal ref="editModal" title="编辑用户">
            <Wb-form ref="formValidate" :label-width="60">
                <Form-item label="姓名：" prop="name">
                    <wb-input v-model="editObj.name" placeholder="请输入用户名"></wb-input>
                </Form-item>
                <Form-item label="年龄：" prop="name">
                    <wb-input v-model="editObj.age" type="number" placeholder="请输入用户名"></wb-input>
                </Form-item>
                <Form-item label="日期：" prop="name">
                    <Wb-input-date-picker v-model="editObj.date" />
                </Form-item>
                <Form-item>
                    <Wb-button ref="editButton" @click="handleEdit" type="primary">提交</Wb-button>
                </Form-item>
            </Wb-form>
        </modal>
    </div>
</template>
<script>
export default {
    FesData() {
        return {
            query: {
                name: '',
                id: ''
            },
            editObj: {
                name: '',
                age: '',
                date: ''
            },
            data: [
                {
                    name: '张晓刚',
                    age: 24,
                    date: new Date(2016, 9, 10),
                    adr: '北京市海淀区西二旗',
                    status: 1
                },
                {
                    name: '李晓红',
                    age: 26,
                    date: new Date(2016, 9, 11),
                    adr: '北京市海淀区西二旗',
                    status: 2
                },
                {
                    name: '隔壁老王',
                    age: 22,
                    date: new Date(2016, 9, 12),
                    adr: '北京市海淀区西二旗',
                    status: 3
                },
                {
                    name: '我爸是李刚',
                    age: 19,
                    date: new Date(2016, 9, 13),
                    adr: '北京市海淀区西二旗',
                    status: 4
                }
            ],
            paginationOption: {
                pageSize: 10,
                currentPage: 1,
                totalPage: 2
            },
            action: [
                {
                    text: '修改',
                    func(trData) {
                        Object.assign(this.editObj, trData);
                        this.$refs.editModal.show();
                    }
                },
                {
                    text: '删除',
                    func(trData) {
                        this.$Message.confirm('警告', `确认删除用户${trData.name}吗`).then((index) => {
                            if (index === 0) {
                                this.$Toast.success('删除用户成功！', { align: 'top' });
                            }
                        });
                    }
                }
            ]
        };
    },
    FesReady() {},
    methods: {
        changePage({ current, size }) {
            this.paginationOption.currentPage = current;
            this.paginationOption.pageSize = size;
        },
        search() {},
        add() {
            this.$refs.createModal.show();
        },
        handleAdd() {
            this.$refs.createModal.close();
            this.$Toast.success('创建用户成功！', { align: 'top' });
        },
        handleEdit() {
            this.$refs.editModal.close();
            this.$Toast.success('编辑用户成功！', { align: 'top' });
        }
    }
};
</script>
