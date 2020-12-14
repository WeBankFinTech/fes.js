<template>
    <div>
        fes & 拉夫德鲁  <br />
        accessOnepicess: {{accessOnepicess}}
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {
    useAccess, access, router, useModel
} from '@webank/fes';

const { setAccess } = access;
export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        const accessOnepicess = useAccess('/onepiece');
        const { initialState } = useModel('@@initialState');
        onMounted(() => {
            console.log(initialState);
            console.log('mounted1!!!');
            console.log(router);
            setAccess(new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['/', '/onepiece']);
                }, 3000);
            }));
            // router.push('/onepiece');
        });
        onMounted(() => {
            console.log('mounted2!!!');
        });
        return {
            fes,
            accessOnepicess
        };
    }
};
</script>
