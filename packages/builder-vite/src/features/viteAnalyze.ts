import type { IPluginAPI } from '@fesjs/shared';
import process from 'node:process';
import { analyzer } from 'vite-bundle-analyzer';

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
            analyzer({
                analyzerMode: 'static',
                fileName: './.cache/visualizer/stats',
                openAnalyzer: true,
                ...api.config.viteAnalyze,
            }),
        );

        return memo;
    });
};
