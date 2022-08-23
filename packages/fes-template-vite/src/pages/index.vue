<template>
    <div class="page">
        home
        <fes-icon type="smile" />
        <FButton class="m-2">Button</FButton>
    </div>
</template>

<script>
import { FButton } from '@fesjs/fes-design';

export default {
    components: {
        FButton,
    },
    setup() {
        const a = 'aa'.replaceAll('a', 1);
        return {
            a,
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
