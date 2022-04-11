<template>
    <div class="page">
        home
        <FButton class="m-2">Button</FButton>
    </div>
</template>

<script>
import { FButton } from '@fesjs/fes-design';
import { useModel } from '@fesjs/fes';

export default {
    components: {
        FButton
    },
    setup() {
        const initialState = useModel('@@initialState');
        setTimeout(() => {
            initialState.userName = '1';
        }, 1000);
        console.log('index.vue');
        return {
        };
    }
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
