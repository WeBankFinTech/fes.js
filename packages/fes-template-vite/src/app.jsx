import { access as accessApi } from '@fesjs/fes';
import PageLoading from '@/components/pageLoading.vue';
import UserCenter from '@/components/userCenter.vue';
import { useStore } from '@/store/main';

export const beforeRender = {
    loading: <PageLoading />,
    action() {
        const { setRole } = accessApi;
        return new Promise((resolve) => {
            setTimeout(() => {
                const store = useStore();
                store.$patch({
                    userName: '李雷',
                });
                setRole('admin');
                resolve({
                    userName: '李雷',
                });
            }, 1000);
        });
    },
};

export const layout = {
    // eslint-disable-next-line node/prefer-global/process
    logo: `${process.env.BASE_URL}logo.png`,
    renderCustom: () => {
        return <UserCenter />;
    },
};
