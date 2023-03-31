<template>
    <MicroApp name="{{{microAppName}}}" base="{{{base}}}" masterHistoryType="{{{masterHistoryType}}}" cacheName="{{{cacheName}}}"> </MicroApp>
</template>
<script>
// eslint-disable-next-line import/extensions
import { MicroApp } from './MicroApp';

export default {
    components: { MicroApp },
};
</script>
