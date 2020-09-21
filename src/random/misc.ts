// Miscellaneous
import * as basic from './basic'
import * as helper from './helper'
import * as date from './date'
import * as location from 'china-location/dist/location.json'
import * as util from '../utils'

const areas = location['default']

// 随机生成一个 guid
// http://www.broofa.com/2008/09/javascript-uuid-function/
export const guid = function (): string {
  const pool = 'abcdefABCDEF1234567890'
  return basic.string(pool, 8) + '-' + basic.string(pool, 4) + '-' + basic.string(pool, 4) + '-' + basic.string(pool, 4) + '-' + basic.string(pool, 12)
}

export const uuid = guid

// 随机生成一个 18 位身份证。
// http://baike.baidu.com/view/1697.htm#4
// [身份证](http://baike.baidu.com/view/1697.htm#4)
// 地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
// [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
export const id = function (): string {
  let _id
  let _sum = 0
  const rank: string[] = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']
  const last: string[] = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  // 直筒子市，无区县
  // https://baike.baidu.com/item/%E7%9B%B4%E7%AD%92%E5%AD%90%E5%B8%82
  const specialCity = ['460400', '441900', '442000', '620200']

  const province = helper.pickMap(areas)
  const city = helper.pickMap(province.cities)
  /* istanbul ignore next */
  if (specialCity.indexOf(city.code) !== -1) {
    return id()
  }
  const districts = city.districts
  const district = helper.pick(util.keys(districts))

  _id = district + date.date('yyyyMMdd') + basic.string('number', 3)
  
  for (let i = 0; i < _id.length; i++) {
    _sum += _id[i] * Number(rank[i])
  }
  _id += last[_sum % 11]
  
  return _id
}

// 生成一个全局的自增整数。
// 类似自增主键（auto increment primary key）。
let key = 0
export const increment = function (step: number | string) {
  return key += (Number(step) || 1) // step?
}

export const inc = increment

/**
 * 随机生成一个版本号
 * @param depth 版本号的层级，默认为3
 */
export const version = function (depth: number = 3): string {
  const numbers: number[] = []
  for (let i = 0; i < depth; i++) {
    numbers.push(basic.natural(0, 10))
  }
  return numbers.join('.')
}

// 随机生成一个中国手机号
export const phone = function (): string {
  const segments: string[] = [
    // 移动号段
    '134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159', '165', '172', '178', '182', '183', '184', '187', '188',
    // 联通号段
    '130', '131', '132', '145', '155', '156', '171', '175', '176', '185', '186',
    // 电信号段
    '133', '149', '153', '173', '174', '177', '180', '181', '189', '191'
  ]
  return helper.pick(segments) + basic.string('number', 8)
}
