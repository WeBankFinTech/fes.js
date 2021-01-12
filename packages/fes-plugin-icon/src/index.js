import { readFileSync } from 'fs';
import { join, basename } from 'path';
import optimizeSvg from './optimizeSvg';

export default (api) => {
    api.addRuntimePluginKey(() => '');
    // 配置
    api.describe({
        key: 'icon',
        config: {
            schema(joi) {
                return joi.object();
            }
        }
    });

    const namespace = 'plugin-icon';
    const absRuntimeFilePath = join(namespace, 'runtime.js');

    // 监听 icons 文件变更，重新生成文件
    api.addTmpGenerateWatcherPaths(() => join(api.paths.absSrcPath, 'icons'));

    let generatedOnce = false;
    api.onGenerateFiles(async () => {
        const base = join(api.paths.absSrcPath, 'icons');
        const iconFiles = api.utils.glob.sync('**/*', {
            cwd: join(api.paths.absSrcPath, 'icons')
        });
        const svgDatas = await optimizeSvg(iconFiles.map(item => join(base, item)));
        const iconNames = [];
        const SVG_COMPONENT_TMPLATE = 'export default () => (SVG)';
        for (const { fileName, data } of svgDatas) {
            iconNames.push(basename(fileName, '.svg'));
            api.writeTmpFile({
                path: `${namespace}/icons/${basename(fileName, '.svg')}.js`,
                content: SVG_COMPONENT_TMPLATE
                    .replace('SVG', data)
            });
        }

        api.writeTmpFile({
            path: `${namespace}/icons.js`,
            content: api.utils.Mustache.render(
                readFileSync(join(__dirname, 'runtime/icons.tpl'), 'utf-8'),
                {
                    ICON_NAMES: iconNames
                }
            )
        });

        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: api.utils.Mustache.render(readFileSync(join(__dirname, 'runtime/runtime.tpl'), 'utf-8'), {
            })
        });

        if (!generatedOnce) {
            generatedOnce = true;
            api.copyTmpFiles({
                namespace,
                path: join(__dirname, 'runtime'),
                ignore: ['.tpl']
            });
        }
    });

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
