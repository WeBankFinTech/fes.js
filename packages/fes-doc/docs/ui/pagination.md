---
pageClass: comp-page-class
---
# Pagination 分页
采用分页的形式分隔长列表，每次只加载一个页面。

## 概述
当加载/渲染所有数据将花费很多时间时；可切换页码浏览数据。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/pagination/1.html">
            <template v-slot:demo>
                <Pagination @on-change="changePage" :locking="pagination.locking" :current="pagination.current" :size="pagination.size" :total="pagination.total"></Pagination>
            </template>
            <template v-slot:description>
                <p>基本用法。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="快捷跳转" template="ui/templates/pagination/2.html">
            <template v-slot:demo>
                <Pagination @on-change="changePage" show-quick-jumper :locking="pagination.locking" :current="pagination.current" :size="pagination.size" :total="pagination.total"></Pagination>
            </template>
            <template v-slot:description>
                <p>快捷跳转到想去的页码。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="自定义每页条数的可选范围" template="ui/templates/pagination/3.html">
            <template v-slot:demo>
                <Pagination :size-list="sizeList" :current="pagination.current" :size="pagination.size" :total="pagination.total"></Pagination>
            </template>
            <template v-slot:description>
                <p>配置sizeList属性即可，默认为[8, 16, 32, 50, 100]</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            pagination: {
                locking: false,
                size: 10,
                current: 1,
                total: 100
            },
            sizeList: [10, 20, 30]
        }
    },
    methods: {
        changePage({ current, size}){
            console.log(arguments)
        }
    }
}
</script>

<style lang="scss">
.ui-select-dropdown-list {
    padding-left: 0;
}
</style>



## API

### Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| current       | 当前第几页         | Number  |        1              |
| size       |  每一页的条数       | Number  |          8            |
| total       |  总页数       | Number  |        0              |
| sizeList       |  每页条数的可选列表       | Array  |        [8, 16, 32, 50, 100]              |
| locking       |  是否锁定, 当锁定时，上一页下一个等操作被禁止       | Boolean  |       false           |
| showQuickJumper       |  是否开启快捷跳转       | Boolean  |       false           |
| showSizeChanger       |  是否显示分页个数的选择框      | Boolean  |       true           |


### Events
| 事件名           | 说明                            |        返回值                                          |
|:----------------|:--------------------------|:-----------------------------------------------------|
| on-change        |  上一页、下一页、回到首页、回到最后一页、跳转时触发  |      ({ current, size })          |


