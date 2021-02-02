export default {
    namespaced: true,
    state: () => ({
        name: 'aring',
        age: 20,
        count: 0
    }),
    mutations: {
        increment(state) {
            state.count++;
        }
    },
    getters: {
        doubleCount(state) {
            return state.count * 2;
        }
    },
    actions: {
        asyncIncrement({ commit }) {
            setTimeout(() => {
                commit('increment');
            }, 2000);
        }
    }
};
