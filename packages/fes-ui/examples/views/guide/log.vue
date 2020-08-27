<template>
    <div class="article">
        <markdown></markdown>
    </div>
</template>
<script>
import markdown from './md/log.md'
export default {
    components: {
        markdown
    }
}
</script>
<style scoped>
code{
    background: rgb(247, 247, 247);;
    border: 1px solid rgb(238, 238, 238);
    padding: 0 3px;
    margin: 0 2px;
    border-radius: 4px;
}
</style>