import type { IPluginAPI } from '@fesjs/shared';
import type { WebpackBuildConfig } from '../../../shared';
import { assert } from 'node:console';
import { highlight } from 'cli-highlight';
import { getBundleAndConfigs } from '../../common/buildDevUtils';

export default function (api: IPluginAPI<WebpackBuildConfig>) {
    api.registerCommand({
        command: 'webpack',
        description: 'inspect webpack configurations',
        options: [
            {
                name: '--rule <ruleName>',
                description: 'inspect a specific module rule',
            },
            {
                name: '--plugin <pluginName>',
                description: 'inspect a specific plugin',
            },
            {
                name: '--rules',
                description: 'list all module rule names',
            },
            {
                name: '--plugins',
                description: 'list all plugin names',
            },
            {
                name: '--verbose',
                description: 'show full function definitions in output',
            },
        ],
        async fn({ options }: { options: any }) {
            const { bundleConfig } = await getBundleAndConfigs({ api });

            let config: any = bundleConfig;
            assert(config, 'No valid config found with fes entry.');

            if (options.rule) {
                config = config.module.rules.find((r: any) => r.__ruleNames[0] === options.rule);
            }
            else if (options.plugin) {
                config = config.plugins.find((p: any) => p.__pluginName === options.plugin);
            }
            else if (options.rules) {
                config = config.module.rules.map((r: any) => r.__ruleNames[0]);
            }
            else if (options.plugins) {
                config = config.plugins.map((p: any) => p.__pluginName || p.constructor.name);
            }

            // eslint-disable-next-line no-console
            console.log(highlight(config.toString({ verbose: options.verbose }), { language: 'js' }));
        },
    });
}
