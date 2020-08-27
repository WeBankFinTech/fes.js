<template>
    <div class="ui-panel">
        <div class="ui-panel-title">
            {{title}}
            <div class="ui-panel-title-button">
                <slot name="action" />
            </div>
        </div>
        <div class="ui-panel-content">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: 'Panel',
    props: {
        title: {
            type: String,
            default: undefined
        }
    }
};
</script>
