<template>
    <div>
        fes & 拉夫德鲁  <br />
        accessOnepicess: {{accessOnepicess}}
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAccess, access, router } from '@webank/fes';

const { setAccess } = access;
export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        const accessOnepicess = useAccess('/onepiece');
        onMounted(() => {
            console.log('mounted!!!');
            console.log(router);
            setAccess(new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['/', '/onepiece']);
                }, 3000);
            }));
            // router.push('/onepiece');
        });
        return {
            fes,
            accessOnepicess
        };
    }
};
</script>
