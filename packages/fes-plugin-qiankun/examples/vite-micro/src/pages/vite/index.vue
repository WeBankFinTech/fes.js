<template>
    <div>vite - micro - index</div>
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
            bigData: new Array(5 * 1024 * 1024),
        };
    },
};
</script>
