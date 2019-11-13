// For Node.js
import Handler from './lib/handler'
import * as Util from './lib/util'
import Random from './lib/random/index'
import RE from './lib/regexp/index'
import toJSONSchema from './lib/schema/index'
import valid from './lib/valid/index'

const Mock = {
  Handler,
  Random,
  Util,
  RE,
  toJSONSchema,
  valid,
  mock,
  heredoc: Util.heredoc,
  version: '__VERSION__'
}


// Mock.mock( template )
// 根据数据模板生成模拟数据。
function mock(template: string) {
  return Handler.gen(template)
}

export default Mock
