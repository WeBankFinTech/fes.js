import type { IPluginAPI } from '@fesjs/shared';
import { name } from '../package.json';

export default function (api: IPluginAPI) {
    api.addConfigType(() => ({
        source: name,
    }));
}
