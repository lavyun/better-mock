import { isArray, isDef, values } from '../utils'
import * as basic from './basic'

// 把字符串的第一个字母转换为大写。
export const capitalize = function(word: string): string {
  word = word + ''
  return word.charAt(0).toUpperCase() + word.substr(1)
}

// 把字符串转换为大写。
export const upper = function(str: string): string {
  return (str + '').toUpperCase()
}

// 把字符串转换为小写。
export const lower = function(str: string): string {
  return (str + '').toLowerCase()
}

// 从数组中随机选取一个元素，并返回。
export const pick = function(arr: any[], min?: number, max?: number) {
  // pick( item1, item2 ... )
  if (!isArray(arr)) {
    arr = [].slice.call(arguments)
    min = 1
    max = 1
  } else {
    // pick( [ item1, item2 ... ] )
    if (!isDef(min)) {
      min = 1
    }
    
    // pick( [ item1, item2 ... ], count )
    if (!isDef(max)) {
      max = min
    }
  }
  
  if (min === 1 && max === 1) {
    return arr[basic.natural(0, arr.length - 1)]
  }
  
  // pick( [ item1, item2 ... ], min, max )
  return shuffle(arr, min, max)
}

// 从map中随机选择一个
export const pickMap = function pickMap(map: object) {
  return pick(values(map))
}

// 打乱数组中元素的顺序，并返回。
export const shuffle = function shuffle(arr: any[], min?: number, max?: number): any {
  arr = arr || []
  const old = arr.slice(0)
  const result: any[] = []
  let index = 0
  const length = old.length;
  for (let i = 0; i < length; i++) {
    index = basic.natural(0, old.length - 1)
    result.push(old[index])
    old.splice(index, 1)
  }
  switch (arguments.length) {
    case 0:
    case 1:
      return result
    case 2:
      max = min
    // falls through
    case 3:
      min = parseInt(min!.toString(), 10)
      max = parseInt(max!.toString(), 10)
      return result.slice(0, basic.natural(min, max))
  }
}
