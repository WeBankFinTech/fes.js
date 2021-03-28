import { access as accessApi } from '@fesjs/fes';
import PageLoading from '@/components/PageLoading';

export const beforeRender = {
    loading: <PageLoading />,
    action() {
        const { setRole } = accessApi;
        return new Promise((resolve) => {
            setTimeout(() => {
                setRole('admin');
                resolve();
            }, 1000);
        });
    }
};
