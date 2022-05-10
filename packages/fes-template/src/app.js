

import { access as accessApi, pinia, createWatermark } from '@fesjs/fes';
import PageLoading from '@/components/PageLoading';
import UserCenter from '@/components/UserCenter';
import { useStore } from '@/store/main';
import { ref } from 'vue';

export const beforeRender = {
    loading: <PageLoading />,
    action() {
        const { setRole } = accessApi;
        return new Promise((resolve) => {
            setTimeout(() => {
                const store = useStore(pinia);
                store.$patch({
                    userName: '李雷'
                });
                setRole('admin');
                resolve({
                    userName: '李雷'
                });
                createWatermark({ content: '万纯(harrywan)' });
            }, 1000);
        });
    }
};

export const layout = layoutConfig => ({
    ...layoutConfig,
    customHeader: <UserCenter />,
    menus: (defaultMenuData) => {
        const menusRef = ref(defaultMenuData);
        // watch(() => initialValue.initialState.userName, () => {
        //     menusRef.value = [{
        //         name: 'store'
        //     }];
        // });
        return menusRef;
    }
});
