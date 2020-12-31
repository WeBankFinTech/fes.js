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
import { useRouter, request } from '@webank/fes';

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
        request('api', {}, {
            cache: {
                cacheType: 'ram',
                cacheTime: 5 * 1000
            }
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
        setTimeout(() => {
            request('api', {}, {
                cache: {
                    cacheType: 'ram',
                    cacheTime: 5 * 1000
                }
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            });
        }, 200);
        setTimeout(() => {
            request('api', {}, {
                cache: {
                    cacheType: 'ram',
                    cacheTime: 5 * 1000
                }
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            });
        }, 6000);
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
