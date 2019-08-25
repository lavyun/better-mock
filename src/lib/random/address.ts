import * as helper from './helper'
import * as basic from './basic'
import DICT from './address_dict'

const REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北']

// 随机生成一个大区。
export const region = function() {
  return helper.pick(REGION)
}

// 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
export const province = function() {
  return helper.pick(DICT).name
}

// 随机生成一个（中国）市。
export const city = function(prefix) {
  const province = helper.pick(DICT)
  const city = helper.pick(province.children)
  return prefix ? [province.name, city.name].join(' ') : city.name
}

// 随机生成一个（中国）县。
export const county = function(prefix) {
  const province = helper.pick(DICT)
  const city = helper.pick(province.children)
  const county = helper.pick(city.children) || {
    name: '-'
  }
  return prefix ? [province.name, city.name, county.name].join(' ') : county.name
}

// 随机生成一个邮政编码（六位数字）。
export const zip = function(len) {
  let zip = ''
  for (let i = 0; i < (len || 6); i++) {
    zip += basic.natural(0, 9)
  }
  return zip
}
