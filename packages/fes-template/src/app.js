

import { access as accessApi, store, GETTER_TYPES } from '@fesjs/fes';
import PageLoading from '@/components/PageLoading';
import UserCenter from '@/components/UserCenter';

console.log(store.getters[GETTER_TYPES.user.address]);

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
