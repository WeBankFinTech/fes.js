<template>
    <div class="user-center">{{ initialState.userName }}</div>
</template>
<script>
import { useModel } from '@fesjs/fes';

export default {
    setup() {
        const initialState = useModel('@@initialState');
        return {
            initialState,
        };
    },
};
</script>
<style lang="less">
.user-center {
    text-align: right;
}
</style>
