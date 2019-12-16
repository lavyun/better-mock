// For Node.js
import Handler from '../../core/handler'
import toJSONSchema from '../../core/schema'
import RE from '../../core/regexp'
import valid from '../../core/valid'
import * as Util from '../../utils'
import Random from '../../random'

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
