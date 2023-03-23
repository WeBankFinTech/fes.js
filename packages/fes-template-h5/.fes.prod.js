// .fes.js 只负责管理编译时配置，只能使用plain Object


export default {
    request: {
        base: '/api'
    },
    chainWebpack(memo) {
        memo.output.filename('./static/[name].[contenthash:8].js')
            .chunkFilename('./static/[name].[contenthash:8].chunk.js')
            .assetModuleFilename('./static/[hash][ext][query]');
    },
    useExtraCSS: false
};
