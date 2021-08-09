import { extname, basename } from 'path';
import { statSync, readFileSync } from 'fs';
import { extendDefaultPlugins, optimize } from 'svgo';


const plugins = extendDefaultPlugins([
    'sortAttrs',
    'removeDimensions',
    {
        name: 'removeAttrs',
        params: {
            attrs: '(stroke|fill|class)'
        }
    }
]);


export default function optimizeSvg(files) {
    const optimizedSvgData = [];
    for (const filePath of files) {
        if (statSync(filePath).isFile() && extname(filePath) === '.svg') {
            const data = readFileSync(filePath, 'utf-8');
            const svgData = optimize(data, { path: filePath, plugins });
            optimizedSvgData.push({
                fileName: basename(filePath),
                ...svgData
            });
        }
    }
    return Promise.all(optimizedSvgData);
}
