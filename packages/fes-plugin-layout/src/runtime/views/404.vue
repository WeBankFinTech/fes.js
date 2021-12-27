<template>
    <a-result status="404" title="404" sub-title="对不起，您访问的页面不存在。">
        <template #extra>
            <f-button type="primary" @click="click">上一页</f-button>
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
import { FButton } from '@fesjs/fes-design';

export default {
    components: {
        [Result.name]: Result,
        FButton
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
