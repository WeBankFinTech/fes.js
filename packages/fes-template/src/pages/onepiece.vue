<template>
    <div>{{fes}}</div>
</template>
<config>
{
    "title": "onepiece",
    "layout": "true"
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
