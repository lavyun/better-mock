import * as helper from './helper'
import * as basic from './basic'
import DICT from './address-dict'

const REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北']

// 随机生成一个大区。
export const region = function(): string {
  return helper.pick(REGION)
}

// 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
export const province = function(): string {
  return helper.pick(DICT).name
}

/**
 * 随机生成一个（中国）市。
 * @param prefix 是否有省前缀
 */
export const city = function(prefix: boolean = false): string {
  const province = helper.pick(DICT)
  const city = helper.pick(province.children)
  return prefix ? [province.name, city.name].join(' ') : city.name
}

/**
 * 随机生成一个（中国）县。
 * @param prefix 是否有省/市前缀
 */
export const county = function(prefix: boolean = false): string {
  const province = helper.pick(DICT)
  const city = helper.pick(province.children)
  const county = helper.pick(city.children) || {
    name: '-'
  }
  return prefix ? [province.name, city.name, county.name].join(' ') : county.name
}

/**
 * 随机生成一个邮政编码（默认6位数字）。
 * @param len 
 */
export const zip = function(len: number = 6): string {
  let zip = ''
  for (let i = 0; i < len; i++) {
    zip += basic.natural(0, 9)
  }
  return zip
}
