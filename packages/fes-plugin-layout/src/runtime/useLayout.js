import { inject, ref } from 'vue';

import { useRoute } from '@@/core/coreExports';

export const PLUGIN_LAYOUT_TITLE_KEY = Symbol('PLUGIN_LAYOUT_TITLE_KEY');

export const PLUGIN_LAYOUT_KEY = Symbol('PLUGIN_LAYOUT_KEY');

export function useTabTitle(title) {
    const titleMap = inject(PLUGIN_LAYOUT_TITLE_KEY);
    if (!titleMap) {
        console.warn('[plugin-layout]: 未正确获取到titleMap');
        return;
    }
    const route = useRoute();
    const titleRef = ref(title);
    const path = route.path;

    titleMap.set(path, titleRef);

    return titleRef;
}

export function useLayout(options) {
    const parent = inject(PLUGIN_LAYOUT_KEY, { reloadTab: () => void 0, closeTab: () => void 0 });
    const titleRef = useTabTitle(options?.title);
    return {
        ...parent,
        title: titleRef,
    };
}
