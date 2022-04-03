// fes.config.js 只负责管理 cli 相关的配置
import pxtoviewport from '@ttou/postcss-px-to-viewport';
import { defineBuildConfig } from '@fesjs/fes';

export default defineBuildConfig({
    proxy: {
        '/v2': {
            'target': 'https://api.douban.com/',
            'changeOrigin': true,
        }
    },
    request: {
        dataField: 'result'
    },
});

