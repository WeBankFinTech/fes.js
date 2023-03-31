import { build } from 'vite';
import { existsSync } from 'fs';
import getBuildConfig from './getBuildConfig';

export default function (api) {
    const {
        paths,
        utils: { rimraf },
    } = api;

    api.registerCommand({
        command: 'build',
        description: 'build application for production',
        async fn() {
            rimraf.sync(paths.absTmpPath);

            // generate files
            await api.applyPlugins({
                key: 'onGenerateFiles',
                type: api.ApplyPluginsType.event,
            });

            const bundleConfig = await getBuildConfig(api);
            try {
                // clear output path before exec build
                if (process.env.CLEAR_OUTPUT !== 'none') {
                    if (paths.absOutputPath && existsSync(paths.absOutputPath)) {
                        rimraf.sync(paths.absOutputPath);
                    }
                }

                await build(bundleConfig);
                if (process.env.RM_TMPDIR !== 'none') {
                    rimraf.sync(paths.absTmpPath);
                }
            } catch (err) {
                // throw build error
                throw err;
            }
        },
    });
}
