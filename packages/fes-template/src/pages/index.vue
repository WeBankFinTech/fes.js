<template>
    <div>
        fes & 拉夫德鲁 <br />
        accessOnepicess: {{accessOnepicess}}
    </div>
</template>
<config>
{
    "name": "index",
    "title": "首页",
    "layout": false
}
</config>
<script>
import { ref, onMounted } from 'vue';
import { useAccess, useModel, useRouter } from '@webank/fes';

export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        const accessOnepicess = useAccess('/onepiece');
        const { initialState } = useModel('@@initialState');
        const router = useRouter();
        onMounted(() => {
            console.log(router);
            console.log(initialState);
            console.log('mounted1!!');
            // router.push('/onepiece');
        });
        onMounted(() => {
            console.log('mounted2!!');
        });
        return {
            fes,
            accessOnepicess
        };
    }
};
</script>
