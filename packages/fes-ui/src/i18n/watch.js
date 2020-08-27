import Vue from 'vue';

const dataListeners = [];

export function subscribeDataChanging(vm) {
    const index = dataListeners.indexOf(vm);
    if (index === -1 && !vm.ui_i18n_subscribing) {
        dataListeners.push(vm);
        vm.ui_i18n_subscribing = true;
    }
}

export function unsubscribeDataChanging(vm) {
    const index = dataListeners.indexOf(vm);
    if (index !== -1 && vm.ui_i18n_subscribing) {
        dataListeners.splice(index, 1);
    }
}

export function trigger() {
    let i = dataListeners.length;
    while (i--) {
        const vm = dataListeners[i];
        Vue.nextTick(() => {
            vm && vm.$forceUpdate();
        });
    }
}
