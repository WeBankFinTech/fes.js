<template>
    <div class="haizekuo">
        app1 - test
        <input />
    </div>
</template>
<config>
{
    "name": "test",
    "title": "test"
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
