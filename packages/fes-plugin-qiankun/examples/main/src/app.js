import { access as accessApi } from '@fesjs/fes';
import PageLoading from '@/components/PageLoading';
import Antdv from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

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

export const onAppCreated = ({ app }) => {
    app.use(Antdv);
};
