<template>
    <div class="onepiece m-10px text-yellow-700">
        fes h5 & 拉夫德鲁<br />
        <fes-icon :spin="true" class="one-icon" type="smile" @click="clickIcon" />
        <HelloWorld />
    </div>
</template>
<script>
import { ref } from 'vue';
import { request, defineRouteMeta, useRoute } from '@fesjs/fes';
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
        console.log(process.env.NODE_ENV, process.env.HELLO);
        console.log(useRoute());
        request('/v2/movie/in_theaters_proxy', (res) => {
            console.log(res);
        });

        const get = (id) => {
            request(
                '/get/api',
                { id },
                {
                    method: 'get',
                },
            );
        };

        const post = (id) => {
            request(
                '/api',
                { id },
                {
                    responseType: 'blob',
                },
            ).then((data) => {
                console.log(data);
            });
        };

        // get(1);
        // post(3);

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
