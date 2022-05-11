// .fes.js 只负责管理编译时配置，只能使用plain Object
export default {
    qiankun: {
        micro: {}
    },
    plugins: [
        require.resolve('../../../fes-plugin-model/lib'),
        require.resolve('../../../fes-plugin-qiankun/lib'),
    ]
};
