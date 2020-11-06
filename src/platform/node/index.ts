// For Node.js
import Handler from '../../core/handler'
import toJSONSchema from '../../core/schema'
import RE from '../../core/regexp'
import valid from '../../core/valid'
import setting from '../../core/setting'
import * as Util from '../../utils'
import Random from '../../random'
import Transfer from '../../transfer'

const Mock = {
  Handler,
  Random,
  Transfer,
  Util,
  RE,
  toJSONSchema,
  valid,
  mock,
  heredoc: Util.heredoc,
  setup: setting.setup.bind(setting),
  version: '__VERSION__'
}


// Mock.mock( template )
// 根据数据模板生成模拟数据。
function mock (template: string) {
  return Handler.gen(template)
}

export default Mock
