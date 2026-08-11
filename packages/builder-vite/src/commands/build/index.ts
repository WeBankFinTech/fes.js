import type { IPluginAPI } from '@fesjs/shared';
import type { InlineConfig } from 'vite';
import { existsSync } from 'node:fs';
import process from 'node:process';
import { build } from 'vite';
import getBuildConfig from './getBuildConfig';

export default function (api: IPluginAPI) {
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

            const bundleConfig: InlineConfig = await getBuildConfig(api);
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
        },
    });
}
