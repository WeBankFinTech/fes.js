import PageLoading from '@/components/PageLoading';

export const beforeRender = {
    loading: <PageLoading />,
    action() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 200);
        });
    }
};
