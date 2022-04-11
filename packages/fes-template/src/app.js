

import { access as accessApi, pinia } from '@fesjs/fes';
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
            }, 1000);
        });
    }
};

export const layout = initialValue => ({
    ...initialValue,
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
