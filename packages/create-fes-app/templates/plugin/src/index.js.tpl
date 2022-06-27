import { join } from 'path';
import { readFileSync } from 'fs';

const namespace = 'plugin-{{{name}}}';

export default (api) => {
    api.describe({
        key: '{{{name}}}',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {}
        }
    });

    const {
        utils: { Mustache }
    } = api;

    const absoluteFilePath = join(namespace, 'core.js');

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    api.onGenerateFiles(() => {
        // 运行时执行的代码全部copy到临时目录，此时不需要编译，稍后webpack会编译临时目录代码
        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
            ignore: ['.tpl']
        });

        // 有些运行时代码通过配置生成，则通过tpl写入
        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(
                readFileSync(join(__dirname, 'runtime/core.tpl'), 'utf-8'),
                {
                }
            )
        });
    });

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
