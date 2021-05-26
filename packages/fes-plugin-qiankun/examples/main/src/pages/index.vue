<template>
    <div>
        main
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="Tab 1"><MicroAppWithMemoHistory key="1" name="app1" url="/app1" /></a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2"><MicroAppWithMemoHistory key="2" name="app1" url="/app1/test" /></a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
        </a-tabs>
    </div>
</template>
<config>
{
    "name": "index",
    "title": "首页"
}
</config>
<script>
import { ref, onMounted } from 'vue';
import { MicroAppWithMemoHistory } from '@fesjs/fes';

export default {
    components: { MicroAppWithMemoHistory },
    setup() {
        const url = ref('/app1/test');
        onMounted(() => {
            setTimeout(() => {
                url.value = '/app1';
            }, 3000);
        });
        return {
            activeKey: ref('1'),
            url
        };
    }
};
</script>
