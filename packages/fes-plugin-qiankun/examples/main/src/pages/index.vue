<template>
    <div>
        main
    </div>
    <MicroAppWithMemoHistory name="app1" :url="url" />
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
            url
        };
    }
};
</script>
