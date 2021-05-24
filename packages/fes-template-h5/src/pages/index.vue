<template>
    <div class="onepiece">
        fes & 拉夫德鲁<br />
        <fes-icon :spin="true" class="one-icon" type="smile" @click="clickIcon" />
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

export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        const rotate = ref(90);
        const clickIcon = () => {
            console.log('click Icon');
        };
        request('/api', null).then((res) => {
            console.log(res);
        });
        // request('/api', null, {
        //     throttle: 3000,
        //     cache: true
        // }).then((res) => {
        //     console.log(res);
        // });

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
        //     cache: {
        //         cacheType: 'merge'
        //     }
        // }).then((res) => {
        //     console.log(res);
        // });
        // request('/api', null, {
        //     cache: {
        //         cacheType: 'merge'
        //     }
        // }).then((res) => {
        //     console.log(res);
        // });
        // request('/api', null, {
        //     cache: {
        //         cacheType: 'merge'
        //     }
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
    .hairline("top");
    background: url('../images/male.png');
}
</style>
