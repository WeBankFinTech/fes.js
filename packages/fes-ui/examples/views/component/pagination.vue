<template>
    <div class="button-page article">
        <h1>Pagination 分页</h1>
        <h2>概述</h2>
        <p>基础组件，触发业务逻辑时使用</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Pagination :current="1" :total="100" :size-list="[1,2,3]" @on-change="changePage" show-quick-jumper />
                </div>
                <div class="panel-header">
                    <span>基本用法</span>
                </div>
                <div class="panel-desc">
                    <p />
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code" />
            </Cell>
        </Row>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    data() {
        return {
        };
    },
    methods: {
        changePage({ current, size }) {
            console.log(current);
            console.log(size);
        },
        changePageSize(newSize) {
            console.log(newSize);
        }
    }
};
</script>
