<template>
    <div class="onepiece m-10px">
        fes h5 & 拉夫德鲁<br />
        <fes-icon :spin="true" class="one-icon" type="smile" @click="clickIcon" />
        <HelloWorld />
        <HelloTSX />
        <helloTS />
    </div>
</template>
<config>
{
    "title": "首页",
    "name": "testIndex",
    "layout": "false"
}
</config>
<script>
import { ref } from 'vue';
import { request } from '@fesjs/fes';
import HelloWorld from '@/components/helloWorld';
import HelloTSX from '@/components/helloTSX';
import helloTS from '@/components/helloTS';

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
        // request('/api', null, {
        // }).then((res) => {
        //     console.log(res);
        // });
        // request('/api', null, {
        // }).then((res) => {
        //     console.log(res);
        // });
        // request('/api', null, {
        //     mergeRequest: true
        // }).then((res) => {
        //     console.log(res);
        // });
        // request('/api', null, {
        //     mergeRequest: true
        // }).then((res) => {
        //     console.log(res);
        // });
        // request('/api', null, {
        //     throttle: 3000,
        //     cache: true
        // }).then((res) => {
        //     console.log(res);
        // });

        const get = (id) => {
            request('/get/api', { id }, {
                method: 'get'
            });
        };

        const post = (id) => {
            request('/get/api', { id }, {
            });
        };

        get(1);
        get(2);
        get(3);

        post(1);
        post(2);
        post(3);


        // setTimeout(() => {
        //     request('/api', null, {
        //         throttle: 3000,
        //         cache: true
        //     }).then((res) => {
        //         console.log(res);
        //     });
        // }, 1000);

        // setTimeout(() => {
        //     request('/api', null, {
        //         throttle: 3000,
        //         cache: true
        //     }).then((res) => {
        //         console.log(res);
        //     });
        //     request('/api', null, {
        //         throttle: 3000,
        //         cache: true
        //     }).then((res) => {
        //         console.log(res);
        //     });
        // }, 3200);

        // request('/api', null, {
        //     cache: true
        // }).then((res) => {
        //     console.log(res);
        // });
        // request('/api', null, {
        //     cache: true
        // }).then((res) => {
        //     console.log(res);
        // });
        // request('/api', null, {
        //     cache: true
        // }).then((res) => {
        //     console.log(res);
        // });

        // request('/api', null, {
        //     // skipErrorHandler: [500]
        // }).then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log('inner error', err);
        // });
        return {
            fes,
            rotate,
            clickIcon
        };
    }
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixins/hairline";
@import "~@/styles/mixins/hover";

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
    .hairline("top");
}
</style>
