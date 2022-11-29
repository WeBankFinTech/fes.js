<template>
    <FTabs v-model="activeKey">
        <FTabPane name="webpack子应用首页" value="1">
            <MicroAppWithMemoHistory key="1" name="webpack-micro" url="/webpack" />
        </FTabPane>
        <FTabPane name="webpack子应用测试页" value="2">
            <MicroAppWithMemoHistory key="2" name="webpack-micro" url="/webpack/test" />
        </FTabPane>
        <FTabPane name="vite子应用首页" value="3">
            <MicroAppWithMemoHistory key="3" name="vite-micro" url="/vite" />
        </FTabPane>
        <FTabPane name="vite子应用测试页" value="4">
            <MicroAppWithMemoHistory key="4" name="vite-micro" url="/vite/test" />
        </FTabPane>
    </FTabs>
</template>
<config>
{
    "name": "index",
    "title": "首页"
}
</config>
<script>
import { ref } from 'vue';
import { MicroAppWithMemoHistory } from '@fesjs/fes';
import { FTabPane, FTabs } from '@fesjs/fes-design';

export default {
    components: { FTabs, FTabPane, MicroAppWithMemoHistory },
    setup() {
        return {
            activeKey: ref('1'),
        };
    },
};
</script>
