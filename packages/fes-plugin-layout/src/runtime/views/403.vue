<template>
    <a-result status="403" title="403" sub-title="对不起，您没有权限访问此页面。">
        <template #extra>
            <a-button type="primary" @click="click">上一页</a-button>
        </template>
    </a-result>
</template>
<config>
{
    "layout": false
}
</config>
<script>
import { useRouter } from '@@/core/coreExports';
import Result from 'ant-design-vue/lib/result';
import 'ant-design-vue/lib/result/style/css';
import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/lib/button/style/css';

export default {
    components: {
        [Result.name]: Result,
        [Button.name]: Button
    },
    setup() {
        const router = useRouter();
        const click = () => {
            router.back();
        };
        return {
            click
        };
    }
};
</script>
