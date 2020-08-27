const render = require('json-templater/string');
const path = require('path');
const endOfLine = require('os').EOL;
const fs = require('fs-extra');
const getCommonComponent = require('../preComplie/components');

function generateComponent(config) {
    const OUTPUT_PATH = path.resolve(config.folders.PROJECT_CACHE_DIR, 'commonComp.js');
    const IMPORT_TEMPLATE = 'import {{name}} from \'{{path}}\';';
    const LIST_TEMPLATE = '    {{name}}';

    const MAIN_TEMPLATE = `
/**
* 全局组件配置输出
*/
{{include}}

export default {
{{list}}
};
`;

    const components = getCommonComponent(config.folders.PROJECT_CPN_DIR, config.folders.PROJECT_CPN_DIR);

    const componentsTemplate = [];
    const listTemplate = [];
    components.forEach((item) => {
        componentsTemplate.push(render(IMPORT_TEMPLATE, {
            name: item.tagName,
            path: item.path
        }));
        listTemplate.push(render(LIST_TEMPLATE, {
            name: item.tagName
        }));
    });

    const template = render(MAIN_TEMPLATE, {
        include: componentsTemplate.join(endOfLine),
        list: listTemplate.join(`,${endOfLine}`)
    });

    fs.outputFileSync(OUTPUT_PATH, template);
}

module.exports = generateComponent;
