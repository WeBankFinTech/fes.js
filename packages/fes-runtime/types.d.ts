export { Plugin } from './es/index';

export {
    useRoute,
    useRouter,
    onBeforeRouteUpdate,
    onBeforeRouteLeave,
    RouterLink,
    RouterView,
    useLink,
    createWebHashHistory,
    createWebHistory,
    createMemoryHistory,
    createRouter,
} from 'vue-router';

export interface ApplyPluginsType {
    compose: 'compose';
    event: 'event';
    modify: 'modify';
};
