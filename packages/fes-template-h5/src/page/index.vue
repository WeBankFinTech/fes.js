<template>
    <div class="onepiece">
        fes & 拉夫德鲁 <br />
        <fes-icon @click="clickIcon" :spin="true" class="one-icon" type="smile" />
    </div>
</template>
<config>
{
    "title": "首页",
    "layout": "false"
}
</config>
<script>
import { ref, onMounted } from 'vue';
import { useRouter } from '@webank/fes';
// import Icon from '@/components/Icon';

export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        const rotate = ref(90);
        const router = useRouter();
        onMounted(() => {
            console.log(router);
            console.log('mounted1!!');
            // router.push('/onepiece');
        });
        onMounted(() => {
            console.log('mounted2!!');
        });
        const clickIcon = () => {
            console.log('click Icon');
        };
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
