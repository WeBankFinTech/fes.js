<template>
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
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
