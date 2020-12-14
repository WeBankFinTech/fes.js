import { access } from '@webank/fes';
import PageLoading from '@/components/PageLoading.vue';

/**
 * 获取用户信息比较慢的时候会展示一个 loading
 */
export const initialStateConfig = {
    loading: <PageLoading />
};

/**
 * 设置页面初始化状态
 */
export async function getInitialState() {
    const { setRole } = access;
    const syncFunc = () => new Promise((resolve) => {
        setTimeout(() => {
            setRole('admin');
            resolve({
                a: 1,
                b: 2
            });
        }, 3000);
    });
    const res = await syncFunc();
    return res;
}
