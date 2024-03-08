<template>
    <div class="page">
        home
        <FButton class="m-2" @click="go">
            Button
        </FButton>
    </div>
</template>

<script setup>
import { defineRouteMeta, useRouter } from '@fesjs/fes';
import { FButton } from '@fesjs/fes-design';

defineRouteMeta({
    name: 'index',
    title: '$home',
});

console.log('123123'.replaceAll('123', '234'));

const router = useRouter();
function go() {
    router.push('/editor');
}
</script>

<style lang="less">
.page {
    height: 1000px;
    background-image: url('@/images/hello.png');
}
</style>
