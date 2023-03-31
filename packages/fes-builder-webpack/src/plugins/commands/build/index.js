/**
 * @copy 该文件代码大部分出自 umi，有需要请参考：
 * https://github.com/umijs/umi/blob/master/packages/preset-built-in/src/plugins/commands/build/build.ts
 */

import { relative } from 'path';
import { existsSync } from 'fs';

export default function (api) {
    const {
        paths,
        utils: { rimraf, logger },
    } = api;

    api.registerCommand({
        command: 'build',
        description: 'build application for production',
        async fn() {
            const { cleanTmpPathExceptCache, getBundleAndConfigs, printFileSizes } = require('../buildDevUtils');
            const { build } = require('./build');

            cleanTmpPathExceptCache({
                absTmpPath: paths.absTmpPath,
            });

            // generate files
            await api.applyPlugins({
                key: 'onGenerateFiles',
                type: api.ApplyPluginsType.event,
            });

            // build
            const { bundleConfig } = await getBundleAndConfigs({ api });
            try {
                // clear output path before exec build
                if (process.env.CLEAR_OUTPUT !== 'none') {
                    if (paths.absOutputPath && existsSync(paths.absOutputPath)) {
                        logger.info(`Clear OutputPath: ${paths.absOutputPath}`);
                        rimraf.sync(paths.absOutputPath);
                    }
                }

                const { stats } = await build({ bundleConfig });
                if (process.env.RM_TMPDIR !== 'none') {
                    rimraf.sync(paths.absTmpPath);
                }
                printFileSizes(stats, relative(process.cwd(), paths.absOutputPath));
                await api.applyPlugins({
                    key: 'onBuildComplete',
                    type: api.ApplyPluginsType.event,
                    args: {
                        stats,
                    },
                });
            } catch (err) {
                await api.applyPlugins({
                    key: 'onBuildComplete',
                    type: api.ApplyPluginsType.event,
                    args: {
                        err,
                    },
                });
                // throw build error
                throw err;
            }
        },
    });
}
