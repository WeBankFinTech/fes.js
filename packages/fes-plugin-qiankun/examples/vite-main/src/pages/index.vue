<template>
    <div>
        main
        <input />
        <FTabs v-model="activeKey">
            <FTabPane name="Tab 1" value="1">
                <MicroAppWithMemoHistory key="1" name="micro" url="/micro" />
            </FTabPane>
            <FTabPane name="Tab 2" value="2">
                <MicroAppWithMemoHistory key="2" name="micro" url="/micro/test" />
            </FTabPane>
            <FTabPane name="Tab 3" value="3"> Content of Tab Pane 3 </FTabPane>
        </FTabs>
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
import { FTabPane, FTabs } from '@fesjs/fes-design';

export default {
    components: { FTabs, FTabPane, MicroAppWithMemoHistory },
    setup() {
        const url = ref('/micro/test');
        onMounted(() => {
            setTimeout(() => {
                url.value = '/micro';
            }, 3000);
        });
        return {
            activeKey: ref('1'),
            url,
        };
    },
};
</script>
