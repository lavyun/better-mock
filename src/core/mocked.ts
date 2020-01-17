import { Mocked, MockedItem, XHRCustomOptions } from '../types'
import { isString, isRegExp, isFunction } from '../utils'
import handler from './handler'
import rgx from 'regexparam'

class IMocked {
  private _mocked: Mocked = {}

  public set (key: string, value: MockedItem) {
    this._mocked[key] = value
  }

  public getMocked () {
    return this._mocked
  }

  // 查找与请求参数匹配的数据模板：URL，Type
  public find (url: string, type: string): MockedItem | undefined {
    const mockedItems: MockedItem[] = Object.values(this._mocked)
    for (let i = 0; i < mockedItems.length; i++) {
      const item = mockedItems[i]
      const urlMatched = this._matchUrl(item.rurl, url)
      const typeMatched = this._matchType(item.rtype, type)
      if (!item.rtype && urlMatched) {
        return item
      }
      if (urlMatched && typeMatched) {
        return item
      }
    }
  }

  /**
   * 数据模板转换成 mock 数据
   * @param item 发请求时匹配到的 mock 数据源
   * @param options 包含请求头，请求体，请求方法等
   */
  public convert (item: MockedItem, options: Partial<XHRCustomOptions>) {
    return isFunction(item.template) ? item.template(options) : handler.gen(item.template)
  }

  private _matchUrl (expected: string | RegExp | undefined, actual: string): boolean {
    if (isString(expected)) {
      if (expected === actual) {
        return true
      }

      // expected: /hello/world
      // actual: /hello/world?type=1
      if (actual.indexOf(expected) === 0 && actual[expected.length] === '?') {
        return true
      }
      
      if (expected.indexOf('/') === 0) {
        return rgx(expected).pattern.test(actual)
      }
    }
    if (isRegExp(expected)) {
      return expected.test(actual)
    }
    return false
  }

  private _matchType (expected: string | RegExp | undefined, actual: string): boolean {
    if (isString(expected) || isRegExp(expected)) {
      return new RegExp(expected, 'i').test(actual)
    }
    return false
  }
}

export default new IMocked()
