import { Mocked, MockedItem } from '../types'
import { isString, isRegExp } from '../utils'
import rgx from 'regexparam'

class IMocked {
  private _mocked: Mocked = {}

  public get (key: string) {
    return this._mocked[key]
  }

  public set (key: string, value: MockedItem) {
    this._mocked[key] = value
  }

  public getSource () {
    return this._mocked
  }

  // 查找与请求参数匹配的数据模板：URL，Type
  public find(url: string, type: string): MockedItem | undefined {
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

  private _matchUrl(expected: string | RegExp | undefined, actual: string): boolean {
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

  private _matchType(expected: string | RegExp | undefined, actual: string): boolean {
    if (isString(expected) || isRegExp(expected)) {
      return new RegExp(expected, 'i').test(actual)
    }
    return false
  }
}

export default new IMocked()
