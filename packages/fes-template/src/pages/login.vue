<template>
    <div class="login">
        <FButton type="primary" @click="login">登陆</FButton>
    </div>
</template>

<script setup>
import { defineRouteMeta, useRouter } from '@fesjs/fes';
import { FButton } from '@fesjs/fes-design';

const router = useRouter();
const login = () => {
    sessionStorage.setItem('login', true);
    router.push({ name: 'index' });
};

defineRouteMeta({
    name: 'login',
    layout: {
        navigation: null,
    },
});
</script>

<style lang="less" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
