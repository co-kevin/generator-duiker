const _string = require('lodash/string')

module.exports = {
  nameCase,
  groupCase,
  trimAll
}

/**
 * 基于用户输入的 name 变种
 *
 * @param {*string} name ocr bill
 */
function nameCase(name) {
  const kebab = _string.kebabCase(name)
  return {
    // 首字母大写驼峰写法
    hump: _string.upperFirst(_string.camelCase(name)),
    // 字母小写，单词间横线分割
    kebab,
    // 字母小写，单词间 . 分割
    splitByDot: kebab.split('-').join('.'),
    // 字母小写，单词间 / 分割
    splitBySlash: kebab.split('-').join('/'),
  }
}

/**
 * 基于用户输入的 group 变种
 *
 * @param {*string} group com.zdan91
 */
function groupCase(group) {
  return {
    splitByDot: group,
    // 字母小写，单词间 / 分割
    splitBySlash: group.split('\.').join('/'),
  }
}

/**
 * 删除字段注释中的所有空白字符, 防止生成 Java 代码时编译错误
 *
 * @param {*string} str
 */
function trimAll(str) {
  if (str) {
    return str.replace(/\s/g, '')
  }
  return str
}
