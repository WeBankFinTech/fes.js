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
    Plugin,
    ApplyPluginsType
} from 'RUNTIME_PATH';

CORE_EXPORTS

// TODO 优化，放到合适的位置，不能放在 routes，会造成循环依赖
export const defineRouteMeta = (param)=>{
    return param
}
