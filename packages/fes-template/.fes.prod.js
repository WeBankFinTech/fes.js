import path from 'path';
import { defineBuildConfig } from '@fesjs/fes';

export default defineBuildConfig({
    // publicPath: 'https://gw.alipayobjects.com/',
    // 配置 mini-css-extract-plugin
    extraCSS: {
        loader: {
            publicPath: (resourcePath, context) => `${path.relative(path.dirname(resourcePath), context)}/`,
        },
    },
});
