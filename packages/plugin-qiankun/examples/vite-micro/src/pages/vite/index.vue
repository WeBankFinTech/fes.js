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
            bigData: Array.from({ length: 5 * 1024 * 1024 }),
        };
    },
};
</script>
