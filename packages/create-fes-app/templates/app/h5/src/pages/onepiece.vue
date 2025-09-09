<script setup lang="ts">
import { defineRouteMeta } from '@fesjs/fes'
import { ref } from 'vue'

defineRouteMeta({
  title: 'one piece',
})

const fes = ref('fes upgrade to vue3')
</script>

<template>
  <div>{{ fes }}</div>
</template>
