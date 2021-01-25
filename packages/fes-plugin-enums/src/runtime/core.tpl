// [[key, value]]，默认配置格式
const _ENUMS = {{{REPLACE_ENUMS}}}
const ENUMS = {}
Object.keys(_ENUMS).forEach(key => {
    ENUMS[key] = convert(key, _ENUMS[key])
})

/**
 * 获取枚举键值，如不传key，则返回name的枚举数组
 * @param {string} name 枚举名称
 * @param {string} key 枚举键名称
 * @param {string} dir 枚举键值路径，默认value，格式如：value.propName、value.propName[0]
 */
function get(name, key, dir='value') {
    let list = ENUMS[name] || []
    if (key) {
        let value = list.filter(item => item.key === key)[0]
        if (!value) return key
        return parseValueDir(value, dir)
    } else {
        return list
    }
}

/**
 * 移除枚举
 * @param {string} name 枚举名称
 */
function remove(name) {
    delete ENUMS[name]
}

/**
 * 添加一个新的枚举，重复添加会覆盖
 * @param {string} name 枚举名称
 * @param {Array<Object|Array>} _enum 枚举数组，数组元素可以是数组或者对象
 * @param {string} keyName 指定枚举键名称取值属性
 * @param {string} valueName 指定枚举键值取值属性
 */
function push(name, _enum, keyName='key', valueName='value') {
    if (ENUMS[name]) {
        console.warn(`enums warn: the ${name}'s enum already exists, cover!`)
    }
    ENUMS[name] = convert(name, _enum, keyName, valueName)
    return get(name)
}

/**
 * 根据dir解析value的属性值
 * @param value
 * @param dir 
 */
function parseValueDir(value, dir='value') {
    if (['object', 'function'].indexOf(typeof value) || !value || !dir) return value
    if (dir.startsWith('[')) {
        let key = dir.slice(1, dir.indexOf(']'))
        return parseValueDir(value[key], dir.slice(dir.indexOf(']') + 1))
    } else {
        if (dir.startsWith('.')) {
            dir = dir.slice(1)
        }
        let index = dir.indexOf('.')
        let _index = dir.indexOf('[')
        if (index === -1) index = dir.length
        if (_index === -1) _index = dir.length
        index = Math.min(index, _index)
        let key = dir.slice(0, index)
        return parseValueDir(value[key], dir.slice(index))
    }
}

/**
 * 转换传入的枚举数组
 * @param {string} name 枚举名称
 * @param {Array<Object|Array>} _enum 枚举数组，数组元素可以是数组或者对象
 * @param {string} keyName 指定枚举键名称取值属性
 * @param {string} valueName 指定枚举键值取值属性
 */
function convert(name, _enum, keyName='key', valueName='value') {
    if (!name) {
        throw new Error(`enums error: name must not be empty！`)
    }
    if (!Array.isArray(_enum)) {
        throw new Error(`enums error: the ${name}'s enum must be array！`)
    }
    let list = []
    _enum.forEach((item, index) => {
        if (Array.isArray(item)) {
            let _item = item[1]
            if (Object.prototype.toString.call(_item) !== '[object Object]') {
                _item = { value: _item }
            }
            _item.key = item[0]
            list.push(_item)
        } else if(Object.prototype.toString.call(item) === '[object Object]') {
            list.push({
                key: item[keyName],
                value: item[valueName],
                ...item
            })
        } else {
            console.log(`enums warn: the ${name}'s enum item[${index}] must be array or object！`)
        }
    })
    return list
}

const $data = new Proxy(ENUMS, {
    get: function(target, key) {
        return get(key)
    }
})

export const enums = {
    get,
    push,
    remove,
    $data
}