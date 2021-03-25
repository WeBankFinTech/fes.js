<template>
    <div>{{fes}}</div>
    <img :src="publicPath + 'logo.png'" />
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
            publicPath: process.env.BASE_URL,
            fes
        };
    }
};
</script>
