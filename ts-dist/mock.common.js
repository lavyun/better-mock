// For Node.js
import Handler from './lib/handler';
import * as Util from './lib/util';
import Random from './lib/random/index';
import RE from './lib/regexp/index';
import toJSONSchema from './lib/schema/index';
import valid from './lib/valid/index';
var Mock = {
    Handler: Handler,
    Random: Random,
    Util: Util,
    RE: RE,
    toJSONSchema: toJSONSchema,
    valid: valid,
    heredoc: Util.heredoc,
    version: '__VERSION__'
};
// Mock.mock( template )
// 根据数据模板生成模拟数据。
Mock.mock = function (template) {
    return Handler.gen(template);
};
export default Mock;
