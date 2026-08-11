import Config from './config';
import Service from './service';
import { PluginType } from './service/enums';
import { isPluginOrPreset } from './service/utils/pluginUtils';

export { Config, isPluginOrPreset, PluginType, Service };

export type {
    ConfigInstance,
    PluginAPIInstance,
    ServiceInstance,
} from './types';
