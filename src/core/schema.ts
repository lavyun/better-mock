// 把 Mock.js 风格的数据模板转换成 JSON Schema。
import constant from '../utils/constant'
import { type, isArray, isObject } from '../utils'
import { parse } from './parser'
import { SchemaResult } from '../types'

function toJSONSchema (template: object | string | (string | object)[], name?: string | number, path?: string[]) {
  path = path || []
  const result: SchemaResult = {
    name: typeof name === 'string' ? name.replace(constant.RE_KEY, '$1') : name,
    template: template,
    type: type(template), // 可能不准确，例如 { 'name|1': [{}, {} ...] }
    rule: parse(name),
    path: path.slice(0)
  }
  result.path!.push(name === undefined ? 'ROOT' : result.name as string)
  
  if (isArray(template)) {
    result.items = [];
    template.forEach((item, index) => {
      result.items!.push(
        toJSONSchema(item, index, result.path)
      )
    })
  } else if (isObject(template)) {
    result.properties = [];
    for (const key in template) {
      result.properties.push(
        toJSONSchema(template[key], key, result.path)
      )
    }
  }
  
  return result
  
}

export default toJSONSchema
