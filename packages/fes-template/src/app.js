import { access as accessApi, pinia, createWatermark } from '@fesjs/fes';
import { ref, watch } from 'vue';
import PageLoading from '@/components/PageLoading.vue';
import UserCenter from '@/components/UserCenter.vue';
import { useStore } from '@/store/main';

export const beforeRender = {
    loading: <PageLoading />,
    action() {
        const { setRole } = accessApi;
        return new Promise((resolve) => {
            setTimeout(() => {
                const store = useStore(pinia);
                store.$patch({
                    userName: '李雷',
                });
                setRole('admin');
                resolve({
                    userName: '李雷',
                });
                createWatermark({ content: '万纯(harrywan)' });
            }, 1000);
        });
    },
};

export const layout = (layoutConfig, { initialState }) => ({
    ...layoutConfig,
    renderCustom: () => <UserCenter />,
    menus: () => {
        const menusRef = ref(layoutConfig.menus);
        watch(
            () => initialState.userName,
            () => {
                menusRef.value = [
                    {
                        name: 'store',
                    },
                ];
            },
        );
        return menusRef;
    },
});
