import { useRoute } from '@@/core/coreExports';
import { reactive } from 'vue';

const cache = reactive(new Map());

export const getTitle = (path) => cache.get(path);

export const useTitle = (title) => {
    const route = useRoute();
    cache.set(route.path, title);
};
