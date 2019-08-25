// Miscellaneous
import dict from './address_dict';
import * as basic from './basic';
import * as helper from './helper';
import * as date from './date';
export var d4 = function () {
    return basic.natural(1, 4);
};
export var d6 = function () {
    return basic.natural(1, 6);
};
export var d8 = function () {
    return basic.natural(1, 8);
};
export var d12 = function () {
    return basic.natural(1, 12);
};
export var d20 = function () {
    return basic.natural(1, 20);
};
export var d100 = function () {
    return basic.natural(1, 100);
};
// 随机生成一个 guid
// http://www.broofa.com/2008/09/javascript-uuid-function/
export var guid = function () {
    var pool = 'abcdefABCDEF1234567890';
    return basic.string(pool, 8) + '-' + basic.string(pool, 4) + '-' + basic.string(pool, 4) + '-' + basic.string(pool, 4) + '-' + basic.string(pool, 12);
};
export var uuid = guid;
// 随机生成一个 18 位身份证。
// http://baike.baidu.com/view/1697.htm#4
// [身份证](http://baike.baidu.com/view/1697.htm#4)
// 地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
// [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
export var id = function () {
    var id;
    var sum = 0;
    var rank = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'];
    var last = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    id = helper.pick(dict).id + date.date('yyyyMMdd') + basic.string('number', 3);
    for (var i = 0; i < id.length; i++) {
        sum += id[i] * Number(rank[i]);
    }
    id += last[sum % 11];
    return id;
};
// 生成一个全局的自增整数。
// 类似自增主键（auto increment primary key）。
var key = 0;
export var increment = function (step) {
    return key += (Number(step) || 1); // step?
};
export var inc = increment;
