<template>
    <div class="page">
        {{ t('home') }}
        <fes-icon type="smile" />
        <FButton class="m-2">Button</FButton>
    </div>
</template>

<script>
import { useI18n } from '@fesjs/fes';
import { FButton } from '@fesjs/fes-design';

export default {
    components: {
        FButton,
    },
    setup() {
        const { t } = useI18n();
        const a = 'aa'.replaceAll('a', 1);
        return {
            a,
            t,
        };
    },
};
</script>

<style>
.page {
    height: 1000px;
}
</style>

<config>
{
    "name": "index",
    "title": "$home"
}
</config>
