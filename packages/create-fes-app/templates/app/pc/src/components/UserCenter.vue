<template>
    <div>{{initialState.userName}}</div>
</template>
<script>
import { useModel } from '@webank/fes';

export default {
    setup() {
        const initialState = useModel('@@initialState');
        return {
            initialState
        };
    }
};
</script>
