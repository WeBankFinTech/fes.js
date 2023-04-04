<template>
    <Wrapper :iconSrc="img403" title="没有访问权限，请联系管理人员" subTitle="" />
</template>
<script>
import { defineComponent } from 'vue';
import img403 from '../assets/403.png';
import Wrapper from './components/Wrapper.vue';

export default defineComponent({
    components: {
        Wrapper,
    },
    setup() {
        return {
            img403,
        };
    },
});
</script>
