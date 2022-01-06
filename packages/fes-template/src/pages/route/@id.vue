<template>
    <div>
        {{params.id}}
    </div>
</template>
<config>
{
    "name": "activeRoute",
    "title": "动态路由"
}
</config>
<script>
import { useRoute } from '@fesjs/fes';

export default {
    setup() {
        const { params } = useRoute();
        return {
            params
        };
    }
};
</script>
