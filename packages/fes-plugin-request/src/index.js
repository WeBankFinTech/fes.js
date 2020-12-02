import { readFileSync, copyFileSync, statSync } from 'fs';
import { join } from 'path';

export default (api) => {
    api.addRuntimePluginKey(() => 'request');
    // 配置
    api.describe({
        config: {
            schema(joi) {
                return joi.object({
                    dataField: joi
                        .string()
                        .pattern(/^[a-zA-Z]*$/)
                        .allow('')
                });
            },
            default: {
                dataField: 'result',
                messageUI: 'ant-design-vue'
            }
        }
    });

    const namespace = 'plugin-request';
    const requestTemplate = readFileSync(join(__dirname, 'template', 'request.js'), 'utf-8');
    api.onGenerateFiles(() => {
        // 文件写出
        const { dataField = '', messageUI } = api.config.request;
        api.writeTmpFile({
            path: `${namespace}/request.js`,
            content: requestTemplate
                .replace('REPLACE_MESSAGE_UI', messageUI || 'ant-design-vue')
                .replace('REPLACE_DATA_FIELD', dataField)
        });
    });

    let generatedOnce = false;
    api.onGenerateFiles(() => {
        if (generatedOnce) return;
        generatedOnce = true;
        const cwd = join(__dirname, './template');
        const files = api.utils.glob.sync('**/*', {
            cwd
        });
        const base = join(api.paths.absTmpPath, namespace);
        files.forEach((file) => {
            if (['request.js'].includes(file)) return;
            const source = join(cwd, file);
            const target = join(base, file);
            if (statSync(source).isDirectory()) {
                api.utils.mkdirp.sync(target);
            } else {
                copyFileSync(source, target);
            }
        });
    });

    api.addExports(() => [
        {
            exportAll: true,
            source: `../${namespace}/request.js`
        }
    ]);
};
