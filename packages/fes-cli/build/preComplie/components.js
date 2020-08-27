// 全局注册common目录下的组件
const fs = require('fs');
const Path = require('path');
const stringUtil = require('node-plus-string');

function addComp(path, outputCommonDir, components) {
    const dirList = fs.readdirSync(path);
    dirList.forEach((item) => {
        if (fs.statSync(`${path}/${item}`).isFile()
            && item[0] !== '.'
            && ['.fes', '.vue'].indexOf(Path.extname(item)) !== -1) {
            const fileName = Path.basename(item, Path.extname(item));
            const tagName = stringUtil.capitalize(fileName);
            components.push({
                tagName,
                path: Path.resolve(outputCommonDir, item).replace(/\\/g, '\\\\')
            });
        }
    });
}

module.exports = function genComponents(commonDir, outputCommonDir) {
    const components = [];
    addComp(commonDir, outputCommonDir, components);
    return components;
};
