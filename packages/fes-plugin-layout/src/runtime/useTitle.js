import { reactive, ref } from 'vue';
import { useRoute } from '@@/core/coreExports';

const cache = reactive(new Map());

export const getTitle = (path) => cache.get(path);

export const deleteTitle = (patch) => cache.delete(patch);

export const useTabTitle = (title) => {
    const route = useRoute();
    const titleRef = ref(title);
    const path = route.path;

    cache.set(path, titleRef);

    return titleRef;
};
