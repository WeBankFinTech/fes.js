
import assert from 'assert';
import { join } from 'path';
import { existsSync } from 'fs';
import { Logger } from '@webank/fes-compiler';
import { options as CliOptions } from 'jest-cli/build/cli/args';
import createDefaultConfig from './createDefaultConfig';

const logger = new Logger('fes:plugin-unit-jest');

function getCommandOptiton() {
    const opts = [];
    Object.keys(CliOptions).forEach((key) => {
        const option = CliOptions[key];
        const opt = {};
        if (key !== 'version') {
            if (option.alias) {
                opt.name = `-${option.alias} --${key}`;
            } else {
                opt.name = `--${key}`;
            }
            opt.description = option.description;
            opts.push(opt);
        }
    });
    return opts;
}

export default function (api) {
    const { utils: { mergeConfig }, cwd } = api;

    api.registerCommand({
        command: 'test',
        description: 'run unit tests with jest',
        options: getCommandOptiton(),
        async fn({ args }) {
            process.env.NODE_ENV = 'test';

            if (args._[0] === 'test') {
                args._.shift();
            }

            args.debug && logger.log(`args: ${JSON.stringify(args)}`);

            // Read config from cwd/jest.config.js
            const userJestConfigFile = join(cwd, 'jest.config.js');
            const userJestConfig = existsSync(userJestConfigFile) && require(userJestConfigFile);
            args.debug && logger.log(`config from jest.config.js: ${JSON.stringify(userJestConfig)}`);

            // Read jest config from package.json
            const packageJSONPath = join(cwd, 'package.json');
            const packageJestConfig = existsSync(packageJSONPath) && require(packageJSONPath).jest;
            args.debug && logger.log(`jest config from package.json: ${JSON.stringify(packageJestConfig)}`);

            // Merge configs
            // user config and args config could have value function for modification
            const config = mergeConfig(
                createDefaultConfig(cwd, args),
                packageJestConfig,
                userJestConfig
            );
            args.debug && logger.log(`final config: ${JSON.stringify(config)}`);

            // Generate jest options
            const argsConfig = Object.keys(CliOptions).reduce((prev, name) => {
                if (args[name]) prev[name] = args[name];

                // Convert alias args into real one
                const { alias } = CliOptions[name];
                if (alias && args[alias]) prev[name] = args[alias];
                return prev;
            }, {});
            args.debug && logger.log(`config from args: ${JSON.stringify(argsConfig)}`);

            // 比较大的库建议使用require，使用时才加载，提升fes命令的效率
            const { runCLI } = require('jest');
            // Run jest
            const result = await runCLI(
                {
                    // @ts-ignore
                    _: args._ || [],
                    // @ts-ignore
                    $0: args.$0 || '',
                    // 必须是单独的 config 配置，值为 string，否则不生效
                    // @ts-ignore
                    config: JSON.stringify(config),
                    ...argsConfig
                },
                [cwd]
            );
            args.debug && logger.log(result);

            // Throw error when run failed
            assert(result.results.success, 'Test with jest failed');
        }
    });
}
