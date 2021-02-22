<template>
    <div class="generic-list-page">
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24">
                        <a-form-item label="规则编号">
                            <a-input v-model="queryParam.id" placeholder="" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="使用状态">
                            <a-select
                                v-model="queryParam.status"
                                placeholder="请选择"
                                default-value="0"
                            >
                                <a-select-option value="0">全部</a-select-option>
                                <a-select-option value="1">关闭</a-select-option>
                                <a-select-option value="2">运行中</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <template v-if="advanced">
                        <a-col :md="8" :sm="24">
                            <a-form-item label="调用次数">
                                <a-input-number
                                    v-model="queryParam.callNo"
                                    style="width: 100%"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                            <a-form-item label="更新日期">
                                <a-date-picker
                                    v-model="queryParam.date"
                                    style="width: 100%"
                                    placeholder="请输入更新日期"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                            <a-form-item label="使用状态">
                                <a-select
                                    v-model="queryParam.useStatus"
                                    placeholder="请选择"
                                    default-value="0"
                                >
                                    <a-select-option value="0">全部</a-select-option>
                                    <a-select-option value="1">关闭</a-select-option>
                                    <a-select-option value="2">运行中</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                            <a-form-item label="使用状态">
                                <a-select
                                    placeholder="请选择"
                                    default-value="0"
                                >
                                    <a-select-option value="0">全部</a-select-option>
                                    <a-select-option value="1">关闭</a-select-option>
                                    <a-select-option value="2">运行中</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col :md="(!advanced && 8) || 24" :sm="24">
                        <span
                            class="table-page-search-submitButtons"
                            :style="
                                (advanced && {
                                    float: 'right',
                                    overflow: 'hidden'
                                }) || {}"
                        >
                            <a-button type="primary" @click="search">查询</a-button>
                            <a-button
                                style="margin-left: 8px"
                                @click="() => (queryParam = {})"
                            >重置</a-button>
                            <a style="margin-left: 8px" @click="toggleAdvanced">
                                {{advanced ? "收起" : "展开"}}
                                <a-icon :type="advanced ? 'up' : 'down'" />
                            </a>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>

        <!-- <div class="table-operator">
            <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
            <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
                <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
                <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
                批量操作 <a-icon type="down" />
            </a-button>
            </a-dropdown>
        </div> -->
        <a-table
            :columns="columns"
            :data-source="listData"
            :loading="queryListDataLoading"
            :pagination="pagination"
            @change="change"
        >
            <template #action="{ record }">
                <span>
                    <a>Invite 一 {{record.name}}</a>
                    <a-divider type="vertical" />
                    <a-popconfirm
                        title="Are you sure delete this task?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="confirmDelete(record)"
                    >
                        <a href="#">Delete</a>
                    </a-popconfirm>
                </span>
            </template>
        </a-table>
        <!-- <create-form
            ref="createModal"
            :visible="visible"
            :loading="confirmLoading"
            :model="mdl"
            @cancel="handleCancel"
            @ok="handleOk"
        /> -->
    </div>
</template>

<script>
import {
    computed, reactive, ref
} from 'vue';
import { message } from 'ant-design-vue';
import { request, enums } from '@webank/fes';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address 1',
        ellipsis: true
    },
    {
        title: 'Long Column Long Column Long Column',
        dataIndex: 'address',
        key: 'address 2',
        ellipsis: true
    },
    {
        title: 'Long Column Long Column',
        dataIndex: 'address',
        key: 'address 3',
        ellipsis: true
    },
    {
        title: 'Long Column',
        dataIndex: 'address',
        key: 'address 4',
        ellipsis: true
    },
    {
        title: '操作',
        key: 'action',
        slots: { customRender: 'action' }
    }
];

// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
//         tags: ['nice', 'developer']
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 2 Lake Park, London No. 2 Lake Park',
//         tags: ['loser']
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
//         tags: ['cool', 'teacher']
//     }
// ];

/**
 * TODO
 * 新增操作
 * 修改操作
 * 导出操作
 */

export default {
    setup() {
        // 搜索条件
        let currentQueryParam = null;
        const queryParam = reactive({
            id: '',
            status: '',
            callNo: 0,
            date: null,
            useStatus: ''
        });
        // 搜索条件 展开隐藏控制
        const advanced = ref(false);
        const toggleAdvanced = () => {
            advanced.value = !advanced.value;
        };

        const pagination = reactive({
            current: 1,
            pageSize: 15,
            showSizeChanger: true,
            total: 0
        });
        const queryListDataLoading = ref(true);
        const listData = ref([]);
        const queryTableData = () => {
            queryListDataLoading.value = true;
            request('api/simple/list', {
                ...currentQueryParam,
                page: pagination
            }).then((res) => {
                listData.value = res.data;
                queryListDataLoading.value = false;
                if (res.page) {
                    pagination.total = res.page.total;
                }
            });
        };
        queryTableData();
        const change = (currentPagination) => {
            pagination.current = currentPagination.current;
            pagination.pageSize = currentPagination.pageSize;
            queryTableData();
        };

        /**
         * 有两种可以选择的模式
         * 1. 点击搜索的时候才进行查询
         *      适合搜索条件多的情况
         * 2. 改变搜素条件的时候，自动进行搜索
         *      适合搜索条件少的情况
         *
         * 默认 <=3 三个搜索条件，采用自动索索的方式，> 3 采用手动搜索
         */
        const search = () => {
            pagination.current = 1;
            currentQueryParam = { ...queryParam };
        };

        // 自动搜索
        // watch(queryParam, () => {
        //     pagination.current = 1;
        //     currentQueryParam = { ...queryParam };
        //     queryTableData();
        // });

        // 数据转换
        const transferData = computed(() => {
            if (!listData.value) return [];
            // TODO 数据转换
            const transferKeys = [];
            return listData.value.map((item) => {
                transferKeys.forEach((key) => {
                    item[key] = enums.get(key, item[key]);
                });
                return item;
            });
        });

        // 操作
        const confirmDelete = (record) => {
            console.log('confirm delete');
            console.log(record);
            request('url', ...record).then(() => {
                message.success('删除成功');
                this.queryTableData();
            });
        };

        // 导出
        // const exportData = () => {
        //     console.log('confirm delete');
        //     // TODO 支持额外参数
        //     request('url', ...queryParam).then(() => {
        //         message.success('导出成功');
        //         this.queryTableData();
        //     });
        // };

        return {
            queryListDataLoading,
            listData: transferData,
            columns,
            change,
            pagination,
            queryParam,
            search,
            advanced,
            toggleAdvanced,
            confirmDelete
        };
    }
};
</script>

<style lang="less">
.generic-list-page {
    padding: 32px;
}
// 数据列表 搜索条件
.table-page-search-wrapper {

  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 24px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
}
</style>

<config>
{
    "name": "simpleList",
    "title": "列表页面"
}
</config>
