export default (api) => {
    const { paths } = api;

    api.describe({
        key: 'alias',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {
            }
        }
    });

    api.chainWebpack(async (memo) => {
        // 选择在 chainWebpack 中进行以上 alias 的初始化，是为了支持用户使用 modifyPaths API 对 paths 进行改写
        memo.resolve.alias.set('@', paths.absSrcPath);
        memo.resolve.alias.set('@@', paths.absTmpPath);

        return memo;
    });
};
