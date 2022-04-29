<template>
    <div class="onepiece m-10px text-green">
        fes h5 & 拉夫德鲁<br />
        <fes-icon
            :spin="true"
            class="one-icon"
            type="smile"
            @click="clickIcon"
        />
        <HelloWorld />
        <HelloTSX />
        <helloTS />
    </div>
</template>
<script>
import { ref } from 'vue';
import { request, defineRouteMeta, useRoute } from '@fesjs/fes';
import HelloWorld from '@/components/helloWorld';
import HelloTSX from '@/components/helloTSX';
import helloTS from '@/components/helloTS';

defineRouteMeta({
    title: '首页',
    name: 'testIndex',
    layout: false
});

export default {
    components: {
        HelloWorld,
        HelloTSX,
        helloTS
    },
    setup() {
        const fes = ref('fes upgrade to vue3');
        const rotate = ref(90);
        const clickIcon = () => {
            console.log('click Icon');
        };
        console.log(useRoute());

        const get = () => {
            request('/api', null, {
                skipErrorHandler: '123'
            }).catch((err) => {
                console.log('skip error', err);
            });
        };

        get(1);

        return {
            fes,
            rotate,
            clickIcon
        };
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/mixins/hairline';
@import '~@/styles/mixins/hover';

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
