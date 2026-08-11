<template>
    <div class="onepiece m-10px text-yellow-700">
        fes h5 & 拉夫德鲁<br>
    </div>
</template>

<script setup>
import { defineRouteMeta, request } from '@fesjs/fes';

defineRouteMeta({
    title: '首页',
    name: 'testIndex',
    layout: false,
});

request('/ras-mas/a/b').then((res) => {
    console.log('res', res);
});
</script>
