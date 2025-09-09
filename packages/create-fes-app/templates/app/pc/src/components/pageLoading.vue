<script setup lang="ts">
import { FSpin } from '@fesjs/fes-design'
</script>

<template>
  <div class="page-loading">
    <FSpin size="large" stroke="#5384ff" />
  </div>
</template>

<style>
.page-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
