<template>
    <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
        <template #extra>
            <a-button type="primary">上一页</a-button>
        </template>
    </a-result>
</template>
<config>
{
    "layout": false
}
</config>
<script>
import Result from 'ant-design-vue/lib/result';
import 'ant-design-vue/lib/result/style';
import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/lib/button/style';

export default {
    components: {
        [Result.name]: Result,
        [Button.name]: Button
    }
};
</script>
