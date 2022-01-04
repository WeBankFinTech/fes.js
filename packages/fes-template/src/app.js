

import { access as accessApi } from '@fesjs/fes';
import PageLoading from '@/components/PageLoading';
import UserCenter from '@/components/UserCenter';


export const beforeRender = {
    loading: <PageLoading />,
    action() {
        const { setRole } = accessApi;
        return new Promise((resolve) => {
            setTimeout(() => {
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
