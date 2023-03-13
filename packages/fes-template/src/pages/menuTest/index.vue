<template>
    <div class="page">
        menuTest-index
        <div style="display: flex; flex-direction: column">
            <router-link to="/menuTest/1">Go to 1</router-link>
            <router-link to="/menuTest/2">Go to 2</router-link>
            <router-link to="/menuTest/3">Go to 3</router-link>
        </div>
    </div>
</template>
<config>
{
    "title": "menuTest"
}
</config>
<script>
export default {
    components: {},
    setup() {
        return {};
    },
};
</script>

<style>
.page {
    min-height: 100vh;
}
</style>
