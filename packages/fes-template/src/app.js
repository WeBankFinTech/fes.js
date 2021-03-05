

import { access as accessApi } from '@webank/fes';
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
                    userName: 'harrywan'
                });
            }, 1000);
        });
    }
};

export const layout = {
    customHeader: <UserCenter />
    // unAccessHandler({ next }) {
    //     next(false);
    // },
    // noFoundHandler({ next }) {
    //     next(false);
    // }
};
