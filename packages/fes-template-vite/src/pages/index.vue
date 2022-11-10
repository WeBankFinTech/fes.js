<template>
    <div class="page">
        {{ t('home') }}
        <fes-icon type="smile" />
        <FButton class="m-2">Button</FButton>
    </div>
</template>

<script lang="ts">
import { useI18n, defineRouteMeta } from '@fesjs/fes';
import { FButton } from '@fesjs/fes-design';

defineRouteMeta({
    name: 'index',
    title: '$home',
    'keep-alive': true,
});

export default {
    components: {
        FButton,
    },
    setup() {
        const { t } = useI18n();
        return {
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
