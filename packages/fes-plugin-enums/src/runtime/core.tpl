import { readonly } from "vue"

// [[key, value]]，默认配置格式
const _ENUMS = {{{REPLACE_ENUMS}}}
const ENUMS = {}
Object.keys(_ENUMS).forEach(key => {
    ENUMS[key] = convert(key, _ENUMS[key])
})

/**
 * 获取枚举键值，如不传key，则返回name的枚举数组
 * @param {string} name 枚举名称
 * @param {string} [key] 枚举键名称
 * @param {{
 *  dir: string
 *  extend: Array<{
 *      key:string
 *      dir:string
 *      transfer: Function
 * }>}} [opt] 配置项
 */
function get(name, key, opt = { dir: 'value', extend: []}) {
    if (Object.prototype.toString.call(key) === '[object Object]') {
        opt = key
        key = null
    }
    let list = ENUMS[name] || []
    let value
    if (key !== undefined && key !== null) {
        let res = list.filter(item => item.key === key)[0]
        if (!res) return key
        value = parseValueDir(res.value, opt.dir) || key
    } else {
        value = format(list, opt.extend)
    }
    return typeof value === 'object' ? readonly(value) : value
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
 * @param {object} opt {keyName: 'key', valueName: ''} keyName: 指定枚举键名称取值属性 valueName 指定枚举键值取值属性
 */
function push(name, _enum, opt = { keyName: '', valueName: '' }) {
    if (ENUMS[name]) {
        console.warn(`enums warn: the ${name}'s enum already exists, cover!`)
    }
    ENUMS[name] = convert(name, _enum, opt)
    return get(name)
}

/**
 * 基于现有的枚举，连接上新的枚举后返回新的枚举
 * @param {string} name 枚举名称
 * @param {Array<any|Array>} _enum 枚举数组，数组元素可以是数组或者对象
 * @param {{
 *  keyName: string,
 *  valueName: string,
 *  before: boolean,
 *  extend: Array<{
 *      key: string
 *      dir: string
 *      transfer: Function
 *  }>
 * }} opt 配置项，keyName: 指定枚举键名称取值属性 valueName 指定枚举键值取值属性 before: 是否添加在现有的之前
 */
function concat(name, _enum, opt = { keyName: '', valueName: '', before: false, extend: [] }) {
    let list = ENUMS[name] || []
    let partList = convert(name, _enum, opt) || []
    if (opt.before) {
        list = partList.concat(list)
    } else {
        list = list.concat(partList)
    }
    return readonly(format(list, opt.extend))
}

/**
 * 格式化枚举
 * @param {Array} _enum 枚举数组
 * @param {Array<{key:string, dir:string, transfer: Function}>} extend 格式化规则
 */
function format(_enum = [], extend = []) {
    if (!extend || extend.length <= 0) return _enum;
    return _enum.map(item => {
        let _item = {...item}
        extend.forEach(fItem => {
            if (!fItem.key) return
            if (typeof fItem.transfer === 'function') {
                _item[fItem.key] = fItem.transfer(item)
            } else {
                _item[fItem.key] = parseValueDir(item.value, fItem.dir)
            }
        })
        return _item
    })
}

/**
 * 根据dir解析value的属性值
 * @param value
 * @param dir
 */
function parseValueDir(value, dir='value') {
    if (!['object', 'function'].includes(typeof value) || !value || !dir || dir === 'value') return value
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
 * @param {keyName: string, valueName: string} opt keyName: 指定枚举键名称取值属性 valueName 指定枚举键值取值属性
 */
function convert(name, _enum, opt = { keyName: '', valueName: '' }) {
    if (!name) {
        throw new Error(`enums error: name must not be empty！`)
    }
    if (!Array.isArray(_enum)) {
        throw new Error(`enums error: the ${name}'s enum must be array！`)
    }
    let list = []
    _enum.forEach((item, index) => {
        let _item;
        if (Array.isArray(item)) {
            _item = {key: item[0], value: item[1]}
        } else if(Object.prototype.toString.call(item) === '[object Object]') {
            if (!opt.keyName) opt.keyName = 'key'
            // key可能为空，有场景需要使用，比如全选
            _item = {
                key: item[opt.keyName],
                value: opt.valueName ? item[opt.valueName] : item
            }
        } else {
            console.warn(`enums warn: the key ${name} enum item[${index}] must be array or object！`)
            return
        }
        let res = list.filter(item => item.key === _item.key)[0]
        if (res) { // 重复key覆盖提示
            console.warn(`enums warn: the key ${res.key} enum item already exists, cover!`)
            res.value = _item.value
        } else {
            list.push(_item)
        }
    })
    return list
}

export const enums = {
    get,
    push,
    remove,
    concat,
    convert
}