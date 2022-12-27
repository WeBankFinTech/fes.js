<template>
    <div class="page bg-black">
        home
        <FButton class="m-2">Button</FButton>
    </div>
</template>

<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { FButton } from '@fesjs/fes-design';

defineRouteMeta({
    name: 'index',
    title: '$home',
});
console.log('123123'.replaceAll('123', '234'));
</script>

<style>
.page {
    height: 1000px;
}
</style>
