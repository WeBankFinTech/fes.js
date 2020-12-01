import { relative } from 'path';
import { existsSync } from 'fs';
import { Logger } from '@webank/fes-core';
import {
    cleanTmpPathExceptCache,
    getBundleAndConfigs,
    printFileSizes
} from '../../../utils/buildDevUtils';
import generateFiles from '../../../utils/generateFiles';

const logger = new Logger('fes:plugin-built-in');

export default function (api) {
    const {
        paths,
        utils: { rimraf }
    } = api;

    api.registerCommand({
        name: 'build',
        description: 'build application for production',
        async fn() {
            cleanTmpPathExceptCache({
                absTmpPath: paths.absTmpPath
            });

            // generate files
            await generateFiles({ api, watch: false });

            // build
            const {
                bundler,
                bundleConfigs,
                bundleImplementor
            } = await getBundleAndConfigs({ api });
            try {
                // clear output path before exec build
                if (process.env.CLEAR_OUTPUT !== 'none') {
                    if (paths.absOutputPath && existsSync(paths.absOutputPath || '')) {
                        logger.debug(`Clear OutputPath: ${paths.absNodeModulesPath}`);
                        rimraf.sync(paths.absOutputPath);
                    }
                }

                const { stats } = await bundler.build({
                    bundleConfigs,
                    bundleImplementor
                });
                if (process.env.RM_TMPDIR !== 'none') {
                    rimraf.sync(paths.absTmpPath);
                }
                printFileSizes(stats, relative(process.cwd(), paths.absOutputPath));
                await api.applyPlugins({
                    key: 'onBuildComplete',
                    type: api.ApplyPluginsType.event,
                    args: {
                        stats
                    }
                });
            } catch (err) {
                await api.applyPlugins({
                    key: 'onBuildComplete',
                    type: api.ApplyPluginsType.event,
                    args: {
                        err
                    }
                });
                // throw build error
                throw err;
            }
        }
    });
}
