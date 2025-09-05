// eslint-disable-next-line antfu/no-import-dist
import type { WebpackBuildConfig } from './dist/index.d.mts';

declare module '@fesjs/fes' {
    interface PluginBuildConfig extends WebpackBuildConfig {}
}
