<template>
    <div class="page">
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
</script>

<style>
.page {
    height: 1000px;
}
</style>
