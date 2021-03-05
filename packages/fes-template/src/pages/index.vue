<template>
    <div class="haizekuo">
        <div>国际化 {{t("test")}}</div>
        fes & 拉夫德鲁 <br />
        <access :id="accessId"> accessOnepicess1 <input /> </access>
        <div v-access="accessId"> accessOnepicess2 <input /> </div>
        <input />
        <h4>数据字典</h4>
        <div v-for="item in enumsGet('status')" :key="item.key">{{item.value}}：{{item.key}}</div>
        <div v-for="item in roles" :key="item.key">{{item.name}}：{{item.disabled}}</div>
        <div>{{enumsGet('roles', '2', { dir: 'eName' })}}</div>
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
    access, useAccess, useRouter, useI18n, locale, enums, request
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
        onMounted(() => {
            console.log(router);
            setTimeout(() => {
                locale.setLocale({ lang: 'en-US' });
                locale.addLocale({ lang: 'ja-JP', messages: { test: 'テスト' } });
                console.log(locale.getAllLocales());
            }, 2000);
            setTimeout(() => {
                accessId.value = '11';
            }, 4000);

            console.log('测试 mock!!');
            request('/v2/file').then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            });
            request('/v2/movie/in_theaters_mock').then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            });

            console.log('测试 proxy!!');
            request('/v2/movie/in_theaters_proxy').then((resp) => {
                console.log(resp);
            }).catch((err) => {
                console.log(err);
            });
        });
        return {
            accessId,
            fes,
            accessOnepicess,
            t: localI18n.t,
            enumsGet: enums.get,
            roles
        };
    }
};
</script>

<style scoped>
.haizekuo {
    /* background: url('../images/icon.png'); */
}
</style>
