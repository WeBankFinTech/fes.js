

import { plugin, ApplyPluginsType } from '@@/core/coreExports';
import { inject } from 'vue';

let runtimeConfig;

export default () => {
    if (!runtimeConfig) {
        runtimeConfig = plugin.applyPlugins({
            key: 'layout',
            type: ApplyPluginsType.modify,
            initialValue: {
                initialState: inject('initialState'),
                sidebar: true,
                header: true,
                logo: true
            }
        });
    }
    return runtimeConfig;
};
