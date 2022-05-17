import { plugin, ApplyPluginsType } from '@@/core/coreExports';
import { initialState } from '@@/initialState';

let runtimeConfig;

export default () => {
    if (!runtimeConfig) {
        runtimeConfig = plugin.applyPlugins({
            key: 'layout',
            type: ApplyPluginsType.modify,
            initialValue: {
                initialState,
                sidebar: true,
                header: true,
                logo: true,
            },
        });
    }
    return runtimeConfig;
};
