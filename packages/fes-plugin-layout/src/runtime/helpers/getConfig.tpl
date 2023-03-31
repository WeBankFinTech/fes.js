import { plugin, ApplyPluginsType } from '@@/core/coreExports';
import { initialState } from '@@/initialState';

export default () => {
    const initConfig = {{{REPLACE_USER_CONFIG}}}
    const runtimeConfig = plugin.applyPlugins({
        key: 'layout',
        type: ApplyPluginsType.modify,
        initialValue: initConfig,
        args: {
            initialState
        }
    });
    return runtimeConfig;
};
