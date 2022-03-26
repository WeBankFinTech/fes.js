export default (api) => {
    api.describe({
        key: 'proxy',
        config: {
            onChange: () => {
                // todo 重新执行proxy的逻辑
            },
            schema(joi) {
                return joi.object();
            },
        },
    });
};
