<template>
    <div>{{ store.counter }}</div>
    <FButton class="m-2" @click="store.increment">
        Button
    </FButton>
</template>

<config>
{
    "name": "pinia",
    "title": "pinia",
    "layout": {
        "navigation": null
    }
}
</config>

<script>
import { FButton } from '@fesjs/fes-design';
import { useStore } from '@/store/main';

export default {
    components: {
        FButton,
    },
    setup() {
        const store = useStore();
        console.log(store);
        return {
            store,
        };
    },
};
</script>

<style></style>
