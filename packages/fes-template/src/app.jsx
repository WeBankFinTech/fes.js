import { access as accessApi, createWatermark } from '@fesjs/fes';
import { ref, watch } from 'vue';
import PageLoading from '@/components/pageLoading.vue';
import UserCenter from '@/components/userCenter.vue';

export const beforeRender = {
    loading: <PageLoading />,
    action() {
        const { setRole } = accessApi;
        return new Promise((resolve) => {
            setTimeout(() => {
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
