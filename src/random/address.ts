import * as helper from './helper'
import * as basic from './basic'
import * as location from 'china-location/dist/location.json'

const REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北']
const areas = location['default']

// 随机生成一个大区。
export const region = function (): string {
  return helper.pick(REGION)
}

// 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
export const province = function (): string {
  return helper.pickMap(areas).name
}

/**
 * 随机生成一个（中国）市。
 * @param prefix 是否有省前缀
 */
export const city = function (prefix: boolean = false): string {
  const province = helper.pickMap(areas)
  const city = helper.pickMap(province.cities)
  return prefix ? [province.name, city.name].join(' ') : city.name
}

/**
 * 随机生成一个（中国）县。
 * @param prefix 是否有省/市前缀
 */
export const county = function (prefix: boolean = false): string {
  // 直筒子市，无区县
  // https://baike.baidu.com/item/%E7%9B%B4%E7%AD%92%E5%AD%90%E5%B8%82
  const specialCity = ['460400', '441900', '442000', '620200']
  const province = helper.pickMap(areas)
  const city = helper.pickMap(province.cities)
  /* istanbul ignore next */
  if (specialCity.indexOf(city.code) !== -1) {
    return county(prefix)
  }
  const district = helper.pickMap(city.districts) || '-'
  return prefix ? [province.name, city.name, district].join(' ') : district
}

/**
 * 随机生成一个邮政编码（默认6位数字）。
 * @param len 
 */
export const zip = function (len: number = 6): string {
  let zip = ''
  for (let i = 0; i < len; i++) {
    zip += basic.natural(0, 9)
  }
  return zip
}
