import { extname, basename } from 'path';
import { statSync, readFileSync } from 'fs';


import SVGO from 'svgo/lib/svgo';

const svgo = new SVGO({
    plugins: [{
        cleanupAttrs: true
    }, {
        removeDoctype: true
    }, {
        removeXMLProcInst: true
    }, {
        removeComments: true
    }, {
        removeMetadata: true
    }, {
        removeTitle: true
    }, {
        removeDesc: true
    }, {
        removeUselessDefs: true
    }, {
        removeEditorsNSData: true
    }, {
        removeEmptyAttrs: true
    }, {
        removeHiddenElems: true
    }, {
        removeEmptyText: true
    }, {
        removeEmptyContainers: true
    }, {
        removeViewBox: false
    }, {
        cleanupEnableBackground: true
    }, {
        convertStyleToAttrs: true
    }, {
        convertColors: true
    }, {
        convertPathData: true
    }, {
        convertTransform: true
    }, {
        removeUnknownsAndDefaults: true
    }, {
        removeNonInheritableGroupAttrs: true
    }, {
        removeUselessStrokeAndFill: true
    }, {
        removeUnusedNS: true
    }, {
        cleanupIDs: true
    }, {
        cleanupNumericValues: true
    }, {
        moveElemsAttrsToGroup: true
    }, {
        moveGroupAttrsToElems: true
    }, {
        collapseGroups: true
    }, {
        removeRasterImages: false
    }, {
        mergePaths: true
    }, {
        convertShapeToPath: true
    }, {
        sortAttrs: true
    }, {
        removeDimensions: true
    }, {
        removeAttrs: { attrs: '(stroke|fill)' }
    }]
});

export default function optimizeSvg(files) {
    const optimizedSvgData = [];
    for (const filePath of files) {
        if (statSync(filePath).isFile() && extname(filePath) === '.svg') {
            const data = readFileSync(filePath, 'utf-8');
            optimizedSvgData.push(svgo.optimize(data, { path: filePath }).then(svgData => ({
                fileName: basename(filePath),
                ...svgData
            })));
        }
    }
    return Promise.all(optimizedSvgData);
}
