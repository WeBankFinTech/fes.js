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
        },
        login() {
            return new Promise((reslove) => {
                setTimeout(() => {
                    console.log('login');
                    reslove('OK');
                }, 1000);
            });
        }
    },
    modules: {
        address: {
            state: () => ({
                province: '广东省',
                city: '深圳市',
                zone: '南山区'
            }),
            getters: {
                address(state) {
                    return state.province + state.city + state.zone;
                }
            }
        },
        posts: {
            namespaced: true,
            state: () => ({}),
            mutations: {
                doSomething() {}
            }
        }
    }
};
