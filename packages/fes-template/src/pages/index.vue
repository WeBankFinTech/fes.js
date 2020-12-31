<template>
    <div class="haizekuo">
        <div>国际化： {{t("test")}}</div>
        fes & 拉夫德鲁 <br />
        accessOnepicess: {{accessOnepicess}}
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
import {
    useAccess, useRouter, useI18n, setLocale
} from '@webank/fes';

export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        const accessOnepicess = useAccess('/onepiece');
        const { t } = useI18n();
        const router = useRouter();
        onMounted(() => {
            console.log(router);
            console.log('mounted1!!');
            setTimeout(() => {
                setLocale('en-US');
            }, 2000);
            // router.push('/onepiece');
        });
        onMounted(() => {
            console.log('mounted2!!');
        });
        return {
            fes,
            accessOnepicess,
            t
        };
    }
};
</script>

<style scoped>
.haizekuo {
    /* background: url('../images/icon.png'); */
}
</style>
