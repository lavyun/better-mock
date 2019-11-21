// For browser
import Handler from './lib/handler'
import * as Util from './lib/util'
import Random from './lib/random/index'
import RE from './lib/regexp/index'
import toJSONSchema from './lib/schema/index'
import valid from './lib/valid/index'
import XHR from './lib/xhr'
import rewriteFetchAndRequest from './lib/fetch'
import { Mocked } from './lib/type'

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
  setup: (settings) => XHR.setup(settings),
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
