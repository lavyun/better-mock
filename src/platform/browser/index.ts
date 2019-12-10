// For browser
import Handler from '../../core/handler'
import RE from '../../core/regexp'
import toJSONSchema from '../../core/schema'
import valid from '../../core/valid'
import * as Util from '../../utils'
import Random from '../../random'
import { Mocked, Settings } from '../../types'
import XHR from './xhr'
import rewriteFetchAndRequest from './fetch'

const Mock = {
  Handler,
  Random,
  Util,
  XHR,
  RE,
  toJSONSchema,
  valid,
  mock,
  heredoc: Util.heredoc,
  setup: (settings: Settings) => XHR.setup(settings),
  mocked: {} as Mocked,
  version: '__VERSION__'
}

// 避免循环依赖
if (XHR) {
  XHR.Mock = Mock
}

// 根据数据模板生成模拟数据。
function mock (rurl: string | RegExp, rtype?: string | RegExp, template?: object | Function) {
  Util.assert(arguments.length, 'The mock function needs to pass at least one parameter!')
  // Mock.mock(template)
  if (arguments.length === 1) {
    return Handler.gen(rurl)
  }
  // Mock.mock(url, template)
  if (arguments.length === 2) {
    template = rtype as object | Function
    rtype = undefined
  }
  // 拦截 XHR
  (window.XMLHttpRequest as any) = XHR
  // 拦截fetch
  if (window.fetch && Util.isFunction(window.fetch)) {
    rewriteFetchAndRequest()
  }
  const key = String(rurl) + String(rtype)
  Mock.mocked[key] = { rurl, rtype, template }

  return Mock
}

export default Mock
