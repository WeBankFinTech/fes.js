<template>
    <Wrapper :icon-src="img403" :title="title" sub-title="" />
</template>

<script>
import { computed, defineComponent } from 'vue';
import getConfig from '../helpers/getConfig';
import img403 from '../assets/403.png';
import Wrapper from './components/Wrapper.vue';

export default defineComponent({
    components: {
        Wrapper,
    },
    setup() {
        const config = getConfig();
        const title = computed(() => {
            return config['403']?.title || '没有访问权限，请联系管理人员';
        });
        return {
            img403,
            title,
        };
    },
});
</script>
