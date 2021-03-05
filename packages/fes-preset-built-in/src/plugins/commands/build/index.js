
import { Logger } from '@fesjs/compiler';

const logger = new Logger('fes:plugin-built-in');

export default function (api) {
    const {
        paths,
        utils: { rimraf }
    } = api;

    api.registerCommand({
        command: 'build',
        description: 'build application for production',
        async fn() {
            const { relative } = require('path');
            const { existsSync } = require('fs');
            const {
                cleanTmpPathExceptCache,
                getBundleAndConfigs,
                printFileSizes
            } = require('../buildDevUtils');
            const generateFiles = require('../../../utils/generateFiles').default;
            const { build } = require('./build');

            cleanTmpPathExceptCache({
                absTmpPath: paths.absTmpPath
            });

            // generate files
            await generateFiles({ api, watch: false });

            // build
            const { bundleConfig } = await getBundleAndConfigs({ api });
            try {
                // clear output path before exec build
                if (process.env.CLEAR_OUTPUT !== 'none') {
                    if (paths.absOutputPath && existsSync(paths.absOutputPath || '')) {
                        logger.debug(`Clear OutputPath: ${paths.absNodeModulesPath}`);
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
