// .fes.js 只负责管理编译时配置，只能使用plain Object
import path from 'path';

export default {
    // publicPath: 'https://gw.alipayobjects.com/',
    // 配置 mini-css-extract-plugin
    extraCSS: {
        loader: {
            publicPath: (resourcePath, context) => `${path.relative(path.dirname(resourcePath), context)}/`,
        },
    },
};
