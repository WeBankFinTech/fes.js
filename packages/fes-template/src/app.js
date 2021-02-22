

import { access } from '@webank/fes';
import PageLoading from '@/components/PageLoading';
import UserCenter from '@/components/UserCenter';
import Andt from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

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

export const onAppCreated = ({ app }) => {
    app.use(Andt);
};

export const layout = {
    customHeader: <UserCenter />
};
