<template>
    <Wrapper :icon-src="img404" :title="title" sub-title="" />
</template>

<script>
import { defineComponent } from 'vue';
import img404 from '../assets/404.png';
import getConfig from '../helpers/getConfig';
import Wrapper from './components/Wrapper.vue';

export default defineComponent({
    components: {
        Wrapper,
    },
    setup() {
        const config = getConfig();
        const title = computed(() => {
            return config['404']?.title || '哎呀！这个页面找不到了';
        });

        return {
            img404,
            title,
        };
    },
});
</script>
