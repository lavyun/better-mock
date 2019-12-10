import { isDef } from '../utils'

const MAX_NATURE_NUMBER = 9007199254740992
const MIN_NATURE_NUMBER = -9007199254740992

// 返回一个随机的布尔值。
export const boolean = function (min: number = 1, max: number = 1, current?: boolean): boolean {
  if (isDef(current)) {
    if (isDef(min)) {
      min = !isNaN(min) ? parseInt(min.toString(), 10) : 1
    }
    if (isDef(max)) {
      max = !isNaN(max) ? parseInt(max.toString(), 10) : 1
    }
    return Math.random() > 1.0 / (min + max) * min ? !current : current!
  }
  
  return Math.random() >= 0.5
}

export const bool = boolean

// 返回一个随机的自然数（大于等于 0 的整数）。
export const natural = function (min: number = 0, max: number = MAX_NATURE_NUMBER): number {
  min = parseInt(min.toString(), 10)
  max = parseInt(max.toString(), 10)
  return Math.round(Math.random() * (max - min)) + min
}

// 返回一个随机的整数。
export const integer = function (min: number = MIN_NATURE_NUMBER, max: number = MAX_NATURE_NUMBER): number {
  min = parseInt(min.toString(), 10)
  max = parseInt(max.toString(), 10)
  return Math.round(Math.random() * (max - min)) + min
}

export const int = integer

// 返回一个随机的浮点数。
export const float = function (min: number, max: number, dmin: number, dmax: number): number {
  dmin = isDef(dmin) ? dmin : 0
  dmin = Math.max(Math.min(dmin, 17), 0)
  dmax = isDef(dmax) ? dmax : 17
  dmax = Math.max(Math.min(dmax, 17), 0)
  let ret = integer(min, max) + '.'
  for (let i = 0, dcount = natural(dmin, dmax); i < dcount; i++) {
    // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
    const num = i < dcount - 1 ? character('number') : character('123456789')
    ret += num
  }
  return parseFloat(ret)
}

// 返回一个随机字符。
export const character = function (pool: string = ''): string {
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const upper = lower.toUpperCase()
  const number = '0123456789'
  const symbol = '!@#$%^&*()[]'
  const pools = {
    lower,
    upper,
    number, 
    symbol,
    alpha: lower + upper
  }
  if (!pool) {
    pool = lower + upper + number + symbol
  } else {
    pool = pools[pool.toLowerCase()] || pool
  }
  return pool.charAt(natural(0, pool.length - 1))
}

export const char = character

// 返回一个随机字符串。
export const string = function (pool: any, min?: number, max?: number): string {
  let len
  switch (arguments.length) {
    case 0: // ()
      len = natural(3, 7)
      break
    case 1: // ( length )
      len = pool
      pool = undefined
      break
    case 2:
      // ( pool, length )
      if (typeof arguments[0] === 'string') {
        len = min
      } else {
        // ( min, max )
        len = natural(pool, min)
        pool = undefined
      }
      break
    case 3:
      len = natural(min, max)
      break
  }
  
  let text = ''
  for (let i = 0; i < len; i++) {
    text += character(pool)
  }
  
  return text
}

export const str = string

// 返回一个整型数组。
export const range = function (start: number, stop: number, step: number = 1): number[] {
  // range( stop )
  if (arguments.length <= 1) {
    stop = start || 0
    start = 0
  }
  
  start = +start
  stop = +stop
  step = +step
  
  let idx = 0
  const len = Math.max(Math.ceil((stop - start) / step), 0)
  const range = new Array<number>(len)
  
  while (idx < len) {
    range[idx++] = start
    start += step
  }
  
  return range
}
