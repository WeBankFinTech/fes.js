import { transformSync } from '@babel/core';

const DEFAULT_FILTER = /\.[jt]sx?$/;

export default (config) => ({
    name: 'vite-plugin:babel-polyfill',
    transform(code, id) {
        const [filepath] = id.split('?');
        if (DEFAULT_FILTER.test(id) || DEFAULT_FILTER.test(filepath)) {
            const result = transformSync(code, {
                babelrc: false,
                ast: true,
                targets: config.targets,
                configFile: false,
                plugins: [
                    [
                        'polyfill-corejs3',
                        {
                            method: 'usage-global',
                        },
                    ],
                ],
                sourceFileName: id,
            });

            return {
                code: result.code,
                map: result.map,
            };
        }
    },
});
