/* type-coverage:ignore-next-line */
export const type = function (value: any): string {
  return isDef(value) 
    ? Object.prototype.toString.call(value).match(/\[object (\w+)\]/)![1].toLowerCase() 
    : String(value)
}

export const isDef = function (value: unknown): boolean {
  return value !== undefined && value !== null
}

export const isString = function (value: unknown): value is string {
  return type(value) === 'string'
}

export const isNumber = function (value: unknown): value is number {
  return type(value) === 'number'
}

export const isObject = function (value: unknown): value is object {
  return type(value) === 'object'
}

export const isArray = function<T = any> (value: unknown): value is Array<T> {
  return type(value) === 'array'
}

export const isRegExp = function (value: unknown): value is RegExp {
  return type(value) === 'regexp'
}

export const isFunction = function (value: unknown): value is Function {
  return type(value) === 'function'
}

export const keys = function (obj: object): string[] {
  const keys: string[] = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key)
    }
  }
  return keys
}

export const values = function (obj: object) {
  const values: any[] = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key])
    }
  }
  return values
}

/**
 * Mock.heredoc(fn)
 * 以直观、安全的方式书写（多行）HTML 模板。
 * http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
 */
export const heredoc = function (fn: Function) {
  // 1. 移除起始的 function(){ /*!
  // 2. 移除末尾的 */ }
  // 3. 移除起始和末尾的空格
  return fn
    .toString()
    .replace(/^[^\/]+\/\*!?/, '')
    .replace(/\*\/[^\/]+$/, '')
    .replace(/^[\s\xA0]+/, '')
    .replace(/[\s\xA0]+$/, '') // .trim()
}

export const noop = function () {}

export const assert = function (condition: any, error: string) {
  if (!condition) {
    throw new Error('[better-mock] ' + error)
  }
}

/**
 * 创建一个自定义事件，兼容 IE
 * @param type 一个字符串，表示事件名称。
 * @param bubbles 一个布尔值，表示该事件能否冒泡。
 * @param cancelable 一个布尔值，表示该事件是否可以取消。
 * @param detail 一个任意类型，传递给事件的自定义数据。
 */
export const createCustomEvent = function<T = any> (type: string, bubbles = false, cancelable = false, detail?: T): CustomEvent<T> {
  try {
    return new CustomEvent<T>(type, { bubbles, cancelable, detail })
  } catch (e) {
    const event: CustomEvent<T> = document.createEvent('CustomEvent')
    event.initCustomEvent(type, bubbles, cancelable, detail!)
    return event
  }
}
