/**
 * @copy 该文件代码大部分出自 umi，有需要请参考：
 * https://github.com/umijs/umi/tree/master/packages/core
 */

import Config from './config';
import Service from './service';
import PluginAPI from './service/pluginAPI';
import { PluginType } from './service/enums';
import { isPluginOrPreset } from './service/utils/pluginUtils';

export { Config, Service, PluginAPI, isPluginOrPreset, PluginType };
