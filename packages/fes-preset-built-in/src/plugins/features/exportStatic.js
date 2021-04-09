export default (api) => {
    api.describe({
        key: 'exportStatic',
        config: {
            schema(joi) {
                return joi.object({
                    htmlSuffix: joi.boolean(),
                    dynamicRoot: joi.boolean()
                });
            }
        },
        // TODO: api.EnableBy.config 读取的 userConfig，modifyDefaultConfig hook 修改后对这个判断不起效
        enableBy: () => ('exportStatic' in api.userConfig
            ? api.userConfig.exportStatic
            : api.config?.exportStatic)
    });
};
