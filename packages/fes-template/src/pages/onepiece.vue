<template>
    <div>{{fes}}</div>
</template>
<config>
{
    "name": "onepiece",
    "title": "onepiece"
}
</config>
<script>
import { ref } from 'vue';

export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        return {
            fes
        };
    }
};
</script>
