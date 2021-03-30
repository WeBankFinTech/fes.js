import { readFileSync } from 'fs';
import { join } from 'path';

export default (api) => {
    api.addRuntimePluginKey(() => 'request');
    // 配置
    api.describe({
        key: 'request',
        config: {
            schema(joi) {
                return joi.object({
                    dataField: joi
                        .string()
                        .pattern(/^[a-zA-Z]*$/)
                        .allow(''),
                    base: joi
                        .string()
                        .allow('')
                });
            },
            default: {
                base: '',
                dataField: ''
            }
        }
    });

    const namespace = 'plugin-request';
    const absoluteFilePath = `${namespace}/request.js`;
    const requestTemplate = readFileSync(join(__dirname, 'template', 'request.js'), 'utf-8');
    api.onGenerateFiles(() => {
        // 文件写出
        const { dataField = '', base = '' } = api.config.request;
        api.writeTmpFile({
            path: absoluteFilePath,
            content: requestTemplate
                .replace('REPLACE_DATA_FIELD', JSON.stringify(dataField))
                .replace('REPLACE_BASE', base || '')
        });
    });

    let generatedOnce = false;
    api.onGenerateFiles(() => {
        if (generatedOnce) return;
        generatedOnce = true;
        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'template'),
            ignore: ['request.js']
        });
    });

    api.addPluginExports(() => [
        {
            exportAll: true,
            source: absoluteFilePath
        }
    ]);
};
