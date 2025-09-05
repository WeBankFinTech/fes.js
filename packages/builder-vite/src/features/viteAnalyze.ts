import type { IPluginAPI } from '@fesjs/shared';
import process from 'node:process';
import { visualizer } from 'rollup-plugin-visualizer';

export default (api: IPluginAPI<{ viteAnalyze: Record<string, any> }>) => {
    api.describe({
        key: 'viteAnalyze',
        config: {
            schema(joi: any) {
                return joi.object();
            },
            default: {},
        },
        enableBy: () => !!process.env.ANALYZE,
    });

    api.modifyBundleConfig((memo: any) => {
        memo.plugins.push(
            visualizer({
                filename: './.cache/visualizer/stats.html',
                open: true,
                gzipSize: true,
                brotliSize: true,
                ...api.config.viteAnalyze,
            }),
        );

        return memo;
    });
};
