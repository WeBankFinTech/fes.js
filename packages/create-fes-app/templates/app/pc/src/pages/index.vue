<template>
    <div style="padding: 32px;">
        <h3>fes & 拉夫德鲁 </h3>
        <h4>数据字典</h4>
        <div v-for="item in enumsGet('status')" :key="item.key">{{item.value}}：{{item.key}}</div>

        <section>
            计数器
            <button @click="increment">click me：{{count}}</button>
        </section>
    </div>
</template>

<script>
import { ref } from 'vue';
import {
    enums
} from '@fesjs/fes';

export default {
    setup() {
        const fes = ref('fes upgrade to vue3');
        const count = ref(0);
        const increment = () => {
            count.value++;
        };

        return {
            fes,
            increment,
            count,
            enumsGet: enums.get
        };
    }
};
</script>

<config>
{
    "name": "index",
    "title": "首页"
}
</config>
