import { createSharedComposable } from '@vueuse/core';
import { shallowReactive } from 'vue';

function _useLayout() {
    const state = shallowReactive({
        closeTab: () => {},
    });

    return state;
}

export const useLayout = createSharedComposable(_useLayout);
