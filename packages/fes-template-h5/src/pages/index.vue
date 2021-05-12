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
import { ref, onMounted } from 'vue';
import { useRouter, request } from '@fesjs/fes';

export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        const rotate = ref(90);
        const router = useRouter();
        onMounted(() => {
            console.log(router);
            console.log('mounted1!!');
        });
        const clickIcon = () => {
            console.log('click Icon');
        };
        request('/api', null, {
            dataField: false
        }).then((res) => {
            console.log(res);
        });
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
