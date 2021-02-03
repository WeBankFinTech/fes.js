
import assert from 'assert';
import { getBundleAndConfigs } from '../../../utils/buildDevUtils';

export default function (api) {
    api.registerCommand({
        command: 'webpack',
        description: 'inspect webpack configurations',
        options: {
            '--rule <ruleName>': 'inspect a specific module rule',
            '--plugin <pluginName>': 'inspect a specific plugin',
            '--rules': 'list all module rule names',
            '--plugins': 'list all plugin names',
            '--verbose': 'show full function definitions in output'
        },
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
