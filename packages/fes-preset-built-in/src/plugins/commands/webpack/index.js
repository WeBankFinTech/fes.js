
import assert from 'assert';
import { getBundleAndConfigs } from '../../../utils/buildDevUtils';

export default function (api) {
    api.registerCommand({
        command: 'webpack',
        description: 'inspect webpack configurations',
        options: [{
            name: '--rule <ruleName>',
            description: 'inspect a specific module rule'
        }, {
            name: '--plugin <pluginName>',
            description: 'inspect a specific plugin'
        }, {
            name: '--rules',
            description: 'list all module rule names'
        }, {
            name: '--plugins',
            description: 'list all plugin names'
        }, {
            name: '--verbose',
            description: 'show full function definitions in output'
        }],
        async fn({ options }) {
            const { toString } = require('webpack-chain');
            const { highlight } = require('cli-highlight');
            const { bundleConfigs } = await getBundleAndConfigs({ api });

            let config = bundleConfigs.filter(bundleConfig => bundleConfig.entry?.fes)[0];
            assert(config, 'No valid config found with fes entry.');

            if (options.rule) {
                config = config.module.rules.find(
                    r => r.__ruleNames[0] === options.rule
                );
            } else if (options.plugin) {
                config = config.plugins.find(
                    p => p.__pluginName === options.plugin
                );
            } else if (options.rules) {
                config = config.module.rules.map(r => r.__ruleNames[0]);
            } else if (options.plugins) {
                config = config.plugins.map(
                    p => p.__pluginName || p.constructor.name
                );
            }

            console.log(highlight(toString(config, { verbose: options.verbose }), { language: 'js' }));
        }
    });
}
