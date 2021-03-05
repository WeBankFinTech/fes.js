<template>
    <div class="haizekuo">
        <h4>Vuex</h4>
        <div><button @click="increment">click me：{{doubleCount}}</button></div>
        <div><button :disabled="disabled" @click="login">async login</button></div>
        <div><button @click="fooBarIncrement">foo/bar：{{fooBarDoubleCount}}</button></div>
        <div>{{address}}</div>
    </div>
</template>
<config>
{
    "name": "store",
    "title": "vuex测试"
}
</config>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { MUTATION_TYPES, GETTER_TYPES, ACTION_TYPES } from '@fesjs/fes';

export default {
    setup() {
        const store = useStore();
        console.log('store==>', store);
        const disabled = ref(false);
        return {
            address: computed(() => store.getters[GETTER_TYPES.user.address]),
            doubleCount: computed(() => store.getters[GETTER_TYPES.counter.doubleCount]),
            disabled,
            increment: () => store.commit(MUTATION_TYPES.counter.increment),
            login: () => {
                disabled.value = true;
                store.dispatch(ACTION_TYPES.user.login).then((res) => {
                    // eslint-disable-next-line no-alert
                    window.alert(res);
                    disabled.value = false;
                });
            },
            fooBarIncrement: () => store.commit(MUTATION_TYPES.fooBar.increment),
            fooBarDoubleCount: computed(() => store.getters[GETTER_TYPES.fooBar.doubleCount])
        };
    }
};
</script>

<style scoped>
.haizekuo {
    /* background: url('../images/icon.png'); */
}
</style>
