<template>
    <MicroApp :name="name" :base="base" :masterHistoryType="masterHistoryType" :cacheName="cacheName"> </MicroApp>
</template>
<script>
// eslint-disable-next-line import/extensions
import { MicroApp } from './MicroApp';

export default {
    components: { MicroApp },
    setup() {
        const name = '{{{microAppName}}}';
        const base = '{{{base}}}';
        const masterHistoryType = '{{{masterHistoryType}}}';
        const cacheName = '{{{cacheName}}}';

        return {
            name,
            base,
            masterHistoryType,
            cacheName,
        };
    },
};
</script>
