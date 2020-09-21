import { isArray, isDef, values } from '../utils'
import * as basic from './basic'

// 把字符串的第一个字母转换为大写。
export const capitalize = function (word: string): string {
  word = word + ''
  return word.charAt(0).toUpperCase() + word.substr(1)
}

// 把字符串转换为大写。
export const upper = function (str: string): string {
  return (str + '').toUpperCase()
}

// 把字符串转换为小写。
export const lower = function (str: string): string {
  return (str + '').toLowerCase()
}

// 从数组中随机选择一个
export const pickOne = function<T = any> (arr: T[]): T {
  return arr[basic.natural(0, arr.length - 1)]
}

// 从源数组中随机选取一个或多个元素。当传入 min、max 时会选择多个元素并组成数组
export function pick<T = any>(arr: T[]): T;
export function pick<T = any>(arr: T[], min: number): T[];
export function pick<T = any>(arr: T[], min: number, max?: number): T[];
export function pick<T = any> (arr: T[], min: number = 1, max?: number): T | T[] {
  // pick( item1, item2 ... )
  if (!isArray(arr)) {
    return pickOne<T>(Array.from(arguments))
  }

  // pick( [ item1, item2 ... ], count )
  if (!isDef(max)) {
    max = min
  }
  
  if (min === 1 && max === 1) {
    return pickOne<T>(arr)
  }
  
  // pick( [ item1, item2 ... ], min, max )
  return shuffle<T>(arr, min, max)
}

// 从map中随机选择一个
export const pickMap = function (map: object) {
  return pick(values(map))
}

// 打乱数组中元素的顺序，并按照 min - max 返回。
export const shuffle = function<T = any> (arr: T[], min?: number, max?: number): T[] {
  if (!Array.isArray(arr)) {
    return []
  }
  const copy = arr.slice()
  const length = arr.length
  for (let i = 0; i < length; i++) {
    const swapIndex = basic.natural(0, length - 1)
    const swapValue = copy[swapIndex]
    copy[swapIndex] = copy[i]
    copy[i] = swapValue
  }
  if (min && max) {
    return copy.slice(0, basic.natural(min, max))
  }
  if (min) {
    return copy.slice(0, min)
  }
  return copy
}
