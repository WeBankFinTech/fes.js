import { chalk, semver } from '@fesjs/utils';

export default (api) => {
    api.describe({
        key: 'checkVuePackage',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {
            }
        }
    });

    api.onStart(() => {
        // eslint-disable-next-line import/no-extraneous-dependencies
        const vuePkg = require('vue/package.json');
        const vueCompilerPkg = require('@vue/compiler-sfc/package.json');
        if (
            !semver.satisfies(vuePkg.version, vueCompilerPkg.version, { includePrerelease: true })
        ) {
            console.log(
                chalk.red(
                    `You are using vue@${vuePkg.version}, requires @vue/compiler-sfc@${vuePkg.version}.\nPlease upgrade your @vue/compiler-sfc@${vueCompilerPkg.version} version.`
                )
            );
            process.exit(1);
        }
    });
};
