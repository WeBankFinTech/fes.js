

declare module "@fesjs/fes" {
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
    
    export { default as Plugin, ApplyPluginsType } from './plugin';
}
