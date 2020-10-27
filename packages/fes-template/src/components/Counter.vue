<template>
    <div>
        {{count}}
        <button @click="increment">Increment</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0
        };
    },
    methods: {
        increment() {
            this.count++;
        }
    }
};
</script>
