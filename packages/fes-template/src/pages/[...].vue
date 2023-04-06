<template>
    <div> * </div>
</template>
<script setup>
import { useRoute } from '@fesjs/fes';

const route = useRoute();
console.log(route.params);
</script>
