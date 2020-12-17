import { access } from '@webank/fes';
import PageLoading from '@/components/PageLoading.vue';


export const beforeRender = {
    loading: <PageLoading />,
    action() {
        const { setRole } = access;
        return new Promise((resolve) => {
            setTimeout(() => {
                setRole('admin');
                resolve({
                    a: 1,
                    b: 2
                });
            }, 3000);
        });
    }
};
