

import { access } from '@webank/fes';
import PageLoading from '@/components/PageLoading';
import UserCenter from '@/components/UserCenter';

export const beforeRender = {
    loading: <PageLoading />,
    action() {
        const { setRole } = access;
        return new Promise((resolve) => {
            setTimeout(() => {
                setRole('admin');
                resolve({
                    userName: 'harrywan'
                });
            }, 1000);
        });
    }
};

export const layout = {
    customHeader: <UserCenter />
};
