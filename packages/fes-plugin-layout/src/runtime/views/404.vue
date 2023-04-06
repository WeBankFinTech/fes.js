<template>
    <Wrapper :iconSrc="img404" title="哎呀！这个页面找不到了" subTitle="" />
</template>
<script>
import { defineComponent } from 'vue';
import img404 from '../assets/404.png';
import Wrapper from './components/Wrapper.vue';

export default defineComponent({
    components: {
        Wrapper,
    },
    setup() {
        return {
            img404,
        };
    },
});
</script>
