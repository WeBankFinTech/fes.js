<template>
    <div class="onepiece m-10px text-yellow-700">fes h5 & 拉夫德鲁<br /></div>
</template>

<script setup>
import { defineRouteMeta, request } from '@fesjs/fes';

defineRouteMeta({
    title: '首页',
    name: 'testIndex',
    layout: false,
});

request('http://f1.test-adm.weoa.com/rcs-cscm/user/checkAlddddive.do');
</script>
