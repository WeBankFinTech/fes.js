

import { access as accessApi, pinia } from '@fesjs/fes';
import PageLoading from '@/components/PageLoading';
import UserCenter from '@/components/UserCenter';
import { useStore } from '@/store/main';

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

export const layout = {
    customHeader: <UserCenter />
};
