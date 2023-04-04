<template>
    <div class="wrapper">
        <img :src="iconSrc" class="icon" />
        <div class="title">{{ title }}</div>
        <div v-if="subTitle" class="sub-title">{{ subTitle }}</div>
        <div class="btn-wrapper">
            <FButton type="primary" @click="click"> 返回上一页 </FButton>
        </div>
    </div>
</template>
<script>
import { FButton } from '@fesjs/fes-design';
import { useRouter } from '@fesjs/fes';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        FButton,
    },
    props: {
        iconSrc: {
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        subTitle: {
            type: String,
        },
    },
    setup() {
        const router = useRouter();
        const click = () => {
            router.back();
        };
        return {
            click,
        };
    },
});
</script>
<style lang="less" scoped>
.wrapper {
    width: 100%;
    text-align: center;
    padding-top: 150px;
    padding-bottom: 50px;
    .icon {
        width: 240px;
        height: 220px;
    }

    .title {
        font-size: 16px;
        font-weight: 500;
        color: #0f1222;
        line-height: 24px;
        margin-top: 20px;
    }
    .sub-title {
        font-weight: 400;
        color: rgba(15, 18, 34, 0.65);
        line-height: 22px;
        margin-top: 4px;
    }

    .btn-wrapper {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>
