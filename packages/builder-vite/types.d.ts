import type { ServerOptions } from 'vite';
// eslint-disable-next-line antfu/no-import-dist
import type { ViteBuildConfig } from './dist/index.d.mjs';

declare module '@fesjs/fes' {
    interface PluginBuildConfig extends ViteBuildConfig {

    }

    interface FesConfig {
        terserOptions?: any;
        inlineLimit?: number;
        outputPath?: string;
        proxy?: ServerOptions['proxy'];
        title?: string;
        mountElementId?: string;
        publicPath?: string;
        alias?: Record<string, string>;
        autoprefixer?: any;
    }
}
