// For mini-program
import Handler from '../../core/handler'
import RE from '../../core/regexp'
import toJSONSchema from '../../core/schema'
import valid from '../../core/valid'
import mocked from '../../core/mocked'
import setting from '../../core/setting'
import * as Util from '../../utils'
import Random from '../../random'
import Transfer from '../../transfer'
import { overrideRequest } from './request'

const Mock = {
  Handler,
  Random,
  Transfer,
  Util,
  RE,
  toJSONSchema,
  valid,
  mock,
  setup: setting.setup.bind(setting),
  _mocked: mocked.getMocked(),
  version: '__VERSION__'
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

  overrideRequest()

  const key = String(rurl) + String(rtype)
  mocked.set(key, { rurl, rtype, template })

  return Mock
}

export default Mock
