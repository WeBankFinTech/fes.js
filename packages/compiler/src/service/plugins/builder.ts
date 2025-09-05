import type { PluginAPIInstance } from '../../types';

export default function builderPlugin(api: PluginAPIInstance): void {
    api.describe({
        key: 'builder',
        config: {
            schema(joi) {
                return joi.string();
            },
            default: '',
        },
    });
}
