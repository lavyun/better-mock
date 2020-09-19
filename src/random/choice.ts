import { integer as randomInteger} from './basic'
import stringToArray from "../utils/lodash/stringToArray";

// 随机选择一个或多个字符串或数组的元素
export const choices = function (pool: string|any[], min?: number, max?: number): any[] {
  if (!pool || !(typeof pool === 'string' || Array.isArray(pool)) || pool.length === 0){
    return []
  }

  if (typeof pool === 'string') {
    // 使用 lodash 的 stringToArray 可以处理像 emoji 这样的4个字节码的特殊字符
    pool = stringToArray(pool)
  }

  const len = !min ? 1 : !max ? min : randomInteger(min, max)

  const result: any[] = []
  for (let i = 0; i < len; i++) {
    result.push(pool[randomInteger(0, pool.length - 1)])
  }
  return result
}

// 随机选择一个或多个字符串或数组的元素组成字符串
export const choice = function (pool: string|any[], min?: number, max?: number): string {
  return choices(pool, min, max).join('')
}
