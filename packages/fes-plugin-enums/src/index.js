import { readFileSync } from 'fs';
import { join } from 'path';

const namespace = 'plugin-enums';

export default (api) => {
    const {
        utils: { Mustache }
    } = api;

    api.describe({
        key: 'enums',
        config: {
            schema(joi) {
                return joi.object();
            },
            onChange: api.ConfigChangeType.regenerateTmpFiles
        }
    });

    const absoluteFilePath = join(namespace, 'core.js');
    api.onGenerateFiles(() => {
        // 文件写出
        const enums = api.config.enums || {};
        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(
                readFileSync(join(__dirname, 'runtime/core.tpl'), 'utf-8'),
                {
                    REPLACE_ENUMS: JSON.stringify(enums)
                }
            )
        });

        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
            ignore: ['.tpl']
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['enums'],
            source: absoluteFilePath
        }
    ]);
};
