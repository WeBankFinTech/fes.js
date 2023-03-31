import { lodash, winPath } from '@fesjs/utils';

export default class BabelRegister {
    only = {};

    setOnlyMap({ key, value }) {
        this.only[key] = value;
        this.register();
    }

    register() {
        const only = lodash.uniq(
            Object.keys(this.only)
                .reduce((memo, key) => memo.concat(this.only[key]), [])
                .map(winPath),
        );
        require('@babel/register')({
            presets: [
                [
                    require.resolve('@babel/preset-env'),
                    {
                        targets: {
                            node: 'current',
                        },
                        modules: 'commonjs',
                    },
                ],
            ],
            plugins: [
                function () {
                    return {
                        visitor: {
                            ExportAllDeclaration(path) {
                                if (path.node.source.value.startsWith('@@')) {
                                    path.remove();
                                }
                            },
                        },
                    };
                },
            ],
            only: [
                ...only,
                function (filepath) {
                    if (/@fesjs[/\\]+fes/.test(filepath)) {
                        return true;
                    }
                    return false;
                },
            ],
            extensions: ['.jsx', '.js', '.ts', '.tsx'],
            babelrc: false,
            cache: false,
        });
    }
}
