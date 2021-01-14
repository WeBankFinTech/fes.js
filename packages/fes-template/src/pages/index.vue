<template>
    <div class="haizekuo">
        <div>国际化： {{t("test")}}</div>
        fes & 拉夫德鲁 <br />
        <access :id="accessId"> accessOnepicess1 <input /> </access>
        <div v-access="accessId"> accessOnepicess2 <input /> </div>
        <input />
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
    access, useAccess, useRouter, useI18n, locale
} from '@webank/fes';

export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        const accessOnepicess = useAccess('/onepiece1');
        const localI18n = useI18n();
        const router = useRouter();
        const accessId = ref('/onepiece1');
        onMounted(() => {
            console.log(router);
            setTimeout(() => {
                locale.setLocale({ lang: 'en-US' });
                locale.addLocale({ lang: 'ja-JP', messages: { test: 'テスト' } });
                console.log(locale.getAllLocales());
                access.addAccess('/onepiece1');
            }, 2000);
            setTimeout(() => {
                accessId.value = '11';
            }, 4000);
            // router.push('/onepiece');
        });
        return {
            accessId,
            fes,
            accessOnepicess,
            t: localI18n.t
        };
    }
};
</script>

<style scoped>
.haizekuo {
    /* background: url('../images/icon.png'); */
}
</style>
