// ## valid(template, data)
//
// 校验真实数据 data 是否与数据模板 template 匹配。
//
// 实现思路：
// 1. 解析规则。
//     先把数据模板 template 解析为更方便机器解析的 JSON-Schema
//     name               属性名
//     type               属性值类型
//     template           属性值模板
//     properties         对象属性数组
//     items              数组元素数组
//     rule               属性值生成规则
// 2. 递归验证规则。
//     然后用 JSON-Schema 校验真实数据，校验项包括属性名、值类型、值、值生成规则。
//
// 提示信息
// https://github.com/fge/json-schema-validator/blob/master/src/main/resources/com/github/fge/jsonschema/validator/validation.properties
// [JSON-Schema validator](http://json-schema-validator.herokuapp.com/)
// [Regexp Demo](http://demos.forbeslindesay.co.uk/regexp/)

// ## name
//     有生成规则：比较解析后的 name
//     无生成规则：直接比较
// ## type
//     无类型转换：直接比较
//     有类型转换：先试着解析 template，然后再检查？
// ## value vs. template
//     基本类型
//         无生成规则：直接比较
//         有生成规则：
//             number
//                 min-max.dmin-dmax
//                 min-max.dcount
//                 count.dmin-dmax
//                 count.dcount
//                 +step
//                 整数部分
//                 小数部分
//             boolean
//             string
//                 min-max
//                 count
// ## properties
//     对象
//         有生成规则：检测期望的属性个数，继续递归
//         无生成规则：检测全部的属性个数，继续递归
// ## items
//     数组
//         有生成规则：
//             `'name|1': [{}, {} ...]`            其中之一，继续递归
//             `'name|+1': [{}, {} ...]`           顺序检测，继续递归
//             `'name|min-max': [{}, {} ...]`      检测个数，继续递归
//             `'name|count': [{}, {} ...]`        检测个数，继续递归
//         无生成规则：检测全部的元素个数，继续递归
import constant from '../utils/constant'
import { type, keys as objectKeys, isArray, isString, isFunction, isRegExp, isNumber } from '../utils'
import toJSONSchema from './schema'
import { SchemaResult, DiffResult } from '../types'
import handler from './handler'

const Diff = {
  diff: function (schema: SchemaResult, data: string | object, name?: string | number) {
    const result: DiffResult[] = []
    
    // 先检测名称 name 和类型 type，如果匹配，才有必要继续检测
    if (Diff.name(schema, data, name, result) && Diff.type(schema, data, name, result)) {
      Diff.value(schema, data, name, result)
      Diff.properties(schema, data, name, result)
      Diff.items(schema, data, name, result)
    }
    
    return result
  },
  /* jshint unused:false */
  name: function (schema: SchemaResult, _data, name: string | number | undefined, result: DiffResult[]) {
    const length = result.length
    
    Assert.equal('name', schema.path, name + '', schema.name + '', result)
    
    return result.length === length
  },
  type: function (schema: SchemaResult, data, _name, result: DiffResult[]) {
    const length = result.length
    
    if (isString(schema.template)) {
      // 占位符类型处理
      if (schema.template.match(constant.RE_PLACEHOLDER)) {
        const actualValue = handler.gen(schema.template)
        Assert.equal('type', schema.path, type(data), type(actualValue), result)
        return result.length === length
      }
    } else if (isArray(schema.template)) {
      if (schema.rule.parameters) {
        // name|count: array
        if (schema.rule.min !== undefined && schema.rule.max === undefined) {
          // 跳过 name|1: array，因为最终值的类型（很可能）不是数组，也不一定与 `array` 中的类型一致
          if (schema.rule.count === 1) {
            return true
          }
        }
        // 跳过 name|+inc: array
        if (schema.rule.parameters[2]) {
          return true
        }
      }
    } else if (isFunction(schema.template)) {
      // 跳过 `'name': function`，因为函数可以返回任何类型的值。
      return true
    }
    
    Assert.equal('type', schema.path, type(data), schema.type, result)
    
    return result.length === length
  },
  value: function (schema: SchemaResult, data, name, result: DiffResult[]) {
    const length = result.length
    
    const rule = schema.rule
    const templateType = schema.type
    if (templateType === 'object' || templateType === 'array' || templateType === 'function') {
      return true
    }
    
    // 无生成规则
    if (!rule.parameters) {
      if (isRegExp(schema.template)) {
        Assert.match('value', schema.path, data, schema.template, result)
        return result.length === length
      }

      if (isString(schema.template)) {
        // 同样跳过含有『占位符』的属性值，因为『占位符』的返回值会通常会与模板不一致
        if (schema.template.match(constant.RE_PLACEHOLDER)) {
          return result.length === length
        }
      }
      Assert.equal('value', schema.path, data, schema.template, result)
      return result.length === length
    }
    
    // 有生成规则
    let actualRepeatCount

    if (isNumber(schema.template)) {
      const parts: string[] = (data + '').split('.')
      const intPart = Number(parts[0])
      const floatPart = parts[1]
      
      // 整数部分
      // |min-max
      if (rule.min !== undefined && rule.max !== undefined) {
        Assert.greaterThanOrEqualTo('value', schema.path, intPart, Math.min(Number(rule.min), Number(rule.max)), result)
        // , 'numeric instance is lower than the required minimum (minimum: {expected}, found: {actual})')
        Assert.lessThanOrEqualTo('value', schema.path, intPart, Math.max(Number(rule.min), Number(rule.max)), result)
      }
      // |count
      if (rule.min !== undefined && rule.max === undefined) {
        Assert.equal('value', schema.path, intPart, Number(rule.min), result, '[value] ' + name)
      }
      
      // 小数部分
      if (rule.decimal) {
        // |dmin-dmax
        if (rule.dmin !== undefined && rule.dmax !== undefined) {
          Assert.greaterThanOrEqualTo('value', schema.path, floatPart.length, Number(rule.dmin), result)
          Assert.lessThanOrEqualTo('value', schema.path, floatPart.length, Number(rule.dmax), result)
        }
        // |dcount
        if (rule.dmin !== undefined && rule.dmax === undefined) {
          Assert.equal('value', schema.path, floatPart.length, Number(rule.dmin), result)
        }
      }
    } else if (isString(schema.template)) {
      // 'aaa'.match(/a/g)
      actualRepeatCount = data.match(new RegExp(schema.template, 'g'))
      actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0

      // |min-max
      if (rule.min !== undefined && rule.max !== undefined) {
        Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.min), result)
        Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.max), result)
      }
      // |count
      if (rule.min !== undefined && rule.max === undefined) {
        Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result)
      }
    } else if (isRegExp(schema.template)) {
      actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ''), 'g'))
      actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0
      
      // |min-max
      if (rule.min !== undefined && rule.max !== undefined) {
        Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.min), result)
        Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.max), result)
      }
      // |count
      if (rule.min !== undefined && rule.max === undefined) {
        Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result)
      }
    }
    
    return result.length === length
  },
  properties: function (schema: SchemaResult, data, _name, result: DiffResult[]) {
    const length = result.length
    
    const rule = schema.rule
    const keys = objectKeys(data)
    if (!schema.properties) {
      return
    }
    
    // 无生成规则
    if (!schema.rule.parameters) {
      Assert.equal('properties length', schema.path, keys.length, schema.properties.length, result)
    } else {
      // 有生成规则
      // |min-max
      if (rule.min !== undefined && rule.max !== undefined) {
        Assert.greaterThanOrEqualTo(
          'properties length',
          schema.path,
          keys.length,
          Math.min(Number(rule.min), Number(rule.max)),
          result
        )
        Assert.lessThanOrEqualTo(
          'properties length',
          schema.path,
          keys.length,
          Math.max(Number(rule.min), Number(rule.max)),
          result
        )
      }
      // |count
      if (rule.min !== undefined && rule.max === undefined) {
        // |1, |>1
        if (rule.count !== 1) {
          Assert.equal('properties length', schema.path, keys.length, Number(rule.min), result)
        }
      }
    }
    
    if (result.length !== length) {
      return false
    }
    
    for (let i = 0; i < keys.length; i++) {
      let property: SchemaResult | undefined
      schema.properties.forEach((item) => {
        if (item.name === keys[i]) {
          property = item
        }
      })
      property = property || schema.properties[i]
      result.push(...Diff.diff(property, data[keys[i]], keys[i]))
    }
    
    return result.length === length
  },
  items: function (schema: SchemaResult, data, _name, result: DiffResult[]) {
    const length = result.length
    
    if (!schema.items) {
      return
    }
    
    const rule = schema.rule
    
    // 无生成规则
    if (!schema.rule.parameters) {
      Assert.equal('items length', schema.path, data.length, schema.items.length, result)
    } else {
      // 有生成规则
      // |min-max
      if (rule.min !== undefined && rule.max !== undefined) {
        Assert.greaterThanOrEqualTo(
          'items',
          schema.path,
          data.length,
          Math.min(Number(rule.min), Number(rule.max)) * schema.items.length,
          result,
          '[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements'
        )
        Assert.lessThanOrEqualTo(
          'items',
          schema.path,
          data.length,
          Math.max(Number(rule.min), Number(rule.max)) * schema.items.length,
          result,
          '[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements'
        )
      }
      // |count
      if (rule.min !== undefined && rule.max === undefined) {
        // |1, |>1
        if (rule.count === 1) {
          return result.length === length
        } else {
          Assert.equal('items length', schema.path, data.length, (Number(rule.min) * schema.items.length), result)
        }
      }
      // |+inc
      if (rule.parameters && rule.parameters[2]) {
        return result.length === length
      }
    }
    
    if (result.length !== length) {
      return false
    }
    
    for (let i = 0; i < data.length; i++) {
      result.push(
        ...Diff.diff(
          schema.items[i % schema.items.length],
          data[i],
          i % schema.items.length
        )
      )
    }
    
    return result.length === length
  }
}

// 完善、友好的提示信息
//
// Equal, not equal to, greater than, less than, greater than or equal to, less than or equal to
// 路径 验证类型 描述
//
// Expect path.name is less than or equal to expected, but path.name is actual.
//
//   Expect path.name is less than or equal to expected, but path.name is actual.
//   Expect path.name is greater than or equal to expected, but path.name is actual.
const Assert = {
  message: function (item: DiffResult) {
    if (item.message) {
      return item.message
    }
    const upperType = item.type.toUpperCase()
    const lowerType = item.type.toLowerCase()
    const path = isArray(item.path) && item.path.join('.') || item.path
    const action = item.action
    const expected = item.expected
    const actual = item.actual
    return `[${upperType}] Expect ${path}\'${lowerType} ${action} ${expected}, but is ${actual}`
  },
  equal: function<T extends string | number> (type: string, path: string[], actual: T, expected: T, result: DiffResult[], message?: string) {
    if (actual === expected) {
      return true
    }
    // 正则模板 === 字符串最终值
    if (type === 'type' && expected === 'regexp' && actual === 'string') {
      return true
    }
    result.push(Assert.createDiffResult(
      type, path, actual, expected, message, 'is equal to'
    ))
    return false
  },
  // actual matches expected
  match: function (type: string, path: string[], actual: any, expected: RegExp, result: DiffResult[], message?: string) {
    if (expected.test(actual)) {
      return true
    }
    result.push(Assert.createDiffResult(
      type, path, actual, expected, message, 'matches'
    ))
    return false
  },
  greaterThanOrEqualTo: function (type: string, path: string[], actual: number, expected: number, result: DiffResult[], message?: string) {
    if (actual >= expected) {
      return true
    }
    result.push(Assert.createDiffResult(
      type, path, actual, expected, message, 'is greater than or equal to'
    ))
    return false
  },
  lessThanOrEqualTo: function (type: string, path: string[], actual: number, expected: number, result: DiffResult[], message?: string) {
    if (actual <= expected) {
      return true
    }
    
    result.push(Assert.createDiffResult(
      type, path, actual, expected, message, 'is less than or equal to'
    ))
    return false
  },
  createDiffResult: function (type: string, path: string[], actual: any, expected: any, message: string | undefined, action: string) {
    const item = {
      path: path,
      type: type,
      actual: actual,
      expected: expected,
      action: action,
      message: message
    }
    item.message = Assert.message(item)
    return item
  }
}

const valid = function (template: string | object, data: string | object) {
  const schema = toJSONSchema(template)
  return Diff.diff(schema, data)
}

valid.Diff = Diff
valid.Assert = Assert

export default valid
