<template>
    <div class="haizekuo">
        app1 - index
        <input />
    </div>
</template>
<config>
{
    "name": "index",
    "title": "home"
}
</config>
<script>
export default {
    setup() {
        return {
            leak: new Array(5 * 1024 * 1024)
        };
    }
};
</script>

<style scoped>
</style>
