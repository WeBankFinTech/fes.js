import { join } from 'path';
import { existsSync } from 'fs';
import { winPath } from '@umijs/utils';

export default (api) => {
    api.describe({
        key: 'extraBabelPlugins',
        config: {
            schema(joi) {
                return joi.array();
            }
        }
    });

    api.modifyBabelOpts((babelOpts) => {
        const cwd = api.cwd;
        const prefix = existsSync(join(cwd, 'src')) ? join(cwd, 'src') : cwd;
        babelOpts.cacheDirectory = process.env.BABEL_CACHE !== 'none'
            ? winPath(`${prefix}/.fes/.cache/babel-loader`)
            : false;
        babelOpts.plugins.push(require.resolve('@vue/babel-plugin-jsx'));

        return babelOpts;
    });
};
