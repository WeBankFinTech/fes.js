```html
<template>
    <Switch  v-model="switch2">
        <span slot="open">开</span>
        <span slot="close">关</span>
    </Switch>
    <Switch  v-model="switch2">
        <Icon slot="open" type="check"></Icon>
        <Icon slot="close" type="close"></Icon>
    </Switch>
</template>
<script>
    export default {
        data: function () {
            return {
                switch2: false
            }
        },
    }
</script>
```