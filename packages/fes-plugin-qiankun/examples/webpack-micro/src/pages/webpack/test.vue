<template>
    <div>webpack - micro - test</div>
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
