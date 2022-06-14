<template>
    <div class="haizekuo">micro - test</div>
    <input />
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
            bigData: new Array(5 * 1024 * 1024),
        };
    },
};
</script>

<style scoped></style>
