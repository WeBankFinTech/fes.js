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
        babelOpts.cacheDirectory = process.env.BABEL_CACHE !== 'none'
            ? winPath(`${api.cwd}/.cache/babel-loader`)
            : false;
        babelOpts.plugins.push(require.resolve('@vue/babel-plugin-jsx'));

        return babelOpts;
    });
};
