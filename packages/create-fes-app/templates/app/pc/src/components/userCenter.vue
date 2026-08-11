<script setup lang="ts">
import { useModel } from '@fesjs/fes'

const initialState = useModel('@@initialState')
</script>

<template>
  <div class="right">
    {{ initialState.userName }}
  </div>
</template>

<style scope>
.right {
    text-align: right;
    padding: 0 20px;
}
</style>
