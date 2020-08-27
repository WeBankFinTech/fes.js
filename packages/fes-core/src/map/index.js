/**
 * 数据字典管理
 */
import util from '../util';
import fesConfig from '../config';

const data = fesConfig.map;

const $Map = Object.create({
    getValueByName(name, text) {
        // TODO 不确定这里是否需要 ===
        // eslint-disable-next-line
        const arr = this[name].filter(item => item.text == text);
        return arr[0] ? arr[0].value : '';
    },
    getNameByValue(name, value) {
        // TODO 不确定这里是否需要 ===
        // eslint-disable-next-line
        const arr = this[name].filter(item => item.value == value);
        return arr[0] ? arr[0].text : '';
    }
});

Object.keys(data).forEach((name) => {
    $Map[name] = [];
    if (util.isArray(data[name])) {
        data[name].forEach((item) => {
            if (item.length >= 2) {
                $Map[name].push({
                    value: item[0],
                    text: item[1]
                });
            } else {
                console.error(`【FEX】Map配置错误：Name${name}的值必输是数组，类似['1', '成功']`, item);
            }
        });
    } else {
        console.error('【FEX】Map配置错误：后面的值必须是数组', data[name]);
    }
});

export default $Map;
