// 把 Mock.js 风格的数据模板转换成 JSON Schema。
import constant from '../constant'
import * as util from '../util'
import * as parser from '../parser'

function toJSONSchema(template: object, name?, path? /* Internal Use Only */ ) {
  // type rule properties items
  path = path || []
  const result: any = {
    name: typeof name === 'string' ? name.replace(constant.RE_KEY, '$1') : name,
    template: template,
    type: util.type(template), // 可能不准确，例如 { 'name|1': [{}, {} ...] }
    rule: parser.parse(name)
  }
  result.path = path.slice(0)
  result.path.push(name === undefined ? 'ROOT' : result.name)
  
  switch (result.type) {
    case 'array':
      result.items = []
      util.each(template, function(value, index) {
        result.items.push(
          toJSONSchema(value, index, result.path)
        )
      })
      break
    case 'object':
      result.properties = []
      util.each(template, function(value, key) {
        result.properties.push(
          toJSONSchema(value, key, result.path)
        )
      })
      break
  }
  
  return result
  
}

export default toJSONSchema
