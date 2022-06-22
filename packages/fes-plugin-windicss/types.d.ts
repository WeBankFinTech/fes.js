import type { Config } from 'windicss/types/interfaces';

declare module "@fesjs/fes" {
    interface PluginBuildConfig {
        windicss: {
            config: Config
        }
    }
}
