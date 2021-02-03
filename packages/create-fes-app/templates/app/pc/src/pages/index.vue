<template>
    <div class="haizekuo">
        <div>国际化： {{t("test")}}</div>
        fes & 拉夫德鲁 <br />
        <access :id="accessId"> accessOnepicess1 <input /> </access>
        <div v-access="accessId"> accessOnepicess2 <input /> </div>
        <input />
        <h4>数据字典</h4>
        <div v-for="item in enumsGet('status')" :key="item.key">{{item.value}}：{{item.key}}</div>
        <div v-for="item in roles" :key="item.key">{{item.name}}：{{item.disabled}}</div>
        <div>{{enumsGet('roles', '2', { dir: 'eName' })}}</div>
        <h4>Vuex <button @click="increment">click me：{{count}}</button></h4>
    </div>
</template>
<config>
{
    "name": "index",
    "title": "首页"
}
</config>
<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import {
    access, useAccess, useRouter, useI18n, locale, enums
} from '@webank/fes';

export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        const accessOnepicess = useAccess('/onepiece1');
        const localI18n = useI18n();
        const router = useRouter();
        const accessId = ref('/onepiece1');
        enums.push('roles', [
            {
                id: '1',
                cName: '系统管理员',
                eName: 'System',
                perm: ['1', '2', '3']
            },
            {
                id: '2',
                cName: '业务管理员',
                eName: 'Business',
                perm: ['1', '2']
            },
            {
                id: '3',
                cName: '普通用户',
                eName: 'User',
                perm: ['1']
            }
        ], { keyName: 'id' });
        const roles = enums.get('roles', {
            extend: [
                {
                    key: 'name',
                    dir: 'cName'
                },
                {
                    key: 'disabled',
                    transfer: item => item.value.perm.some(i => i >= 2)
                }
            ]
        });
        console.log(roles);
        const store = useStore();
        console.log('store==>', store);
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
            t: localI18n.t,
            enumsGet: enums.get,
            roles,
            count: computed(() => store.state.counter.count),
            increment: () => store.commit('counter/increment')
        };
    }
};
</script>

<style scoped>
.haizekuo {
    /* background: url('../images/icon.png'); */
}
</style>
