<template>
    <div class="onepiece m-10px text-yellow-700">
        fes h5 & 拉夫德鲁<br />
        <fes-icon :spin="true" class="one-icon" type="smile" @click="clickIcon" />
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
            console.log('click icon');
        };

        const get = () => {
            request('/api', null, {})
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log('error', err);
                });
        };

        get(1);

        return {
            fes,
            rotate,
            clickIcon,
        };
    },
};
</script>

<style lang="less" scoped>
@import '@/styles/mixins/hairline';
@import '@/styles/mixins/hover';

div {
    padding: 20px;
    p {
        margin: 20px;
    }
}
.one-icon {
    color: yellow;
    font-size: 24px;
    .hover();
}
.onepiece {
    text-align: center;
    .hairline('top');
}
</style>
