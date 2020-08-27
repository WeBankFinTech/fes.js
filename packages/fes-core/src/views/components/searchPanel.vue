<template>
    <div class="query-page">
        <div class="query-page-search">
            <slot />
            <div class="query-page-search-buttons">
                <slot name="button" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
};
</script>
