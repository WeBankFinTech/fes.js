<template>
    <div class="onepiece">
        fes & 拉夫德鲁 <br />
        <!-- <Icon type="smile"></Icon> -->
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
        const router = useRouter();
        onMounted(() => {
            console.log(router);
            console.log('mounted1!!');
            // router.push('/onepiece');
        });
        onMounted(() => {
            console.log('mounted2!!');
        });
        return {
            fes
        };
    }
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixins/hairline";

div {
    padding: 20px;
    p {
        margin: 20px;
    }
}
.onepiece {
    .hairline("top");
    background: url('../images/male.png');
}
</style>
