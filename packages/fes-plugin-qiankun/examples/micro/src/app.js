import PageLoading from '@/components/PageLoading.vue';

export const beforeRender = {
    loading: <PageLoading />,
    action() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 200);
        });
    },
};

export const qiankun = {
    // 应用加载之前
    async bootstrap(props) {
        console.log('micro bootstrap', props);
    },
    // 应用 render 之前触发
    async mount(props) {
        console.log('micro mount', props);
    },
    // 当 props 更新时触发
    async update(props) {
        console.log('micro update', props);
    },
    // 应用卸载之后触发
    async unmount(props) {
        console.log('micro unmount', props);
    },
};
