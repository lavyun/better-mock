// Miscellaneous
import dict from './address_dict'
import * as basic from './basic'
import * as helper from './helper'
import * as date from './date'

export const d4 = function () {
  return basic.natural(1, 4)
}

export const d6 = function () {
  return basic.natural(1, 6)
}

export const d8 = function () {
  return basic.natural(1, 8)
}

export const d12 = function () {
  return basic.natural(1, 12)
}

export const d20 = function () {
  return basic.natural(1, 20)
}

export const d100 = function () {
  return basic.natural(1, 100)
}

// 随机生成一个 guid
// http://www.broofa.com/2008/09/javascript-uuid-function/
export const guid = function () {
  const pool = 'abcdefABCDEF1234567890'
  return basic.string(pool, 8) + '-' + basic.string(pool, 4) + '-' + basic.string(pool, 4) + '-' + basic.string(pool, 4) + '-' + basic.string(pool, 12)
}

export const uuid = guid

// 随机生成一个 18 位身份证。
// http://baike.baidu.com/view/1697.htm#4
// [身份证](http://baike.baidu.com/view/1697.htm#4)
// 地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
// [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
export const id = function () {
  let id
  let sum = 0
  let rank: string[] = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']
  let last: string[] = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  
  id = helper.pick(dict).id + date.date('yyyyMMdd') + basic.string('number', 3)
  
  for (let i = 0; i < id.length; i++) {
    sum += id[i] * Number(rank[i])
  }
  id += last[sum % 11]
  
  return id
}

// 生成一个全局的自增整数。
// 类似自增主键（auto increment primary key）。
let key = 0
export const increment = function (step: number | string) {
  return key += (Number(step) || 1) // step?
}

export const inc = increment
