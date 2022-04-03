<template>
    <div class="onepiece m-10px text-green">
        fes h5 & 拉夫德鲁
        <br />

        <fes-icon :spin="true" :class="$style.oneIcon" type="smile" @click="clickIcon" />
        <p :class="$style.oneIcon">hello css module</p>
        <HelloWorld />
    </div>
</template>
<script>
import { ref } from 'vue';
import { request, defineRouteMeta } from '@fesjs/fes';
import HelloWorld from '@/components/helloWorld.vue';

defineRouteMeta({
    title: '首页',
    name: 'testIndex',
    layout: false,
});

export default {
    components: {
        HelloWorld,
    },
    setup() {
        const fes = ref('fes upgrade to vue3');
        const rotate = ref(90);
        const clickIcon = () => {
            console.log('click Icon');
        };

        request('/v2/movie/in_theaters_proxy', (res) => {
            console.log(res);
        });

        return {
            fes,
            rotate,
            clickIcon,
        };
    },
};
</script>

<style lang="less" module>
.oneIcon {
    color: yellow;
    font-size: 24px;
}
.onepiece {
    text-align: center;
}
</style>
