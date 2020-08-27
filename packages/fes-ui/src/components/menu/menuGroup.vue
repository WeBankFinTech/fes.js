<template>
    <div class="ui-menu-group">
        <div class="ui-menu-group-title">
            {{title}}
        </div>
        <ul>
            <slot />
        </ul>
    </div>
</template>
<script>
export default {
    name: 'MenuGroup',
    props: {
        title: {
            type: String,
            default: undefined
        }
    }
};
</script>
