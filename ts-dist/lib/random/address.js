import * as helper from './helper';
import * as basic from './basic';
import DICT from './address_dict';
var REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北'];
// 随机生成一个大区。
export var region = function () {
    return helper.pick(REGION);
};
// 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
export var province = function () {
    return helper.pick(DICT).name;
};
// 随机生成一个（中国）市。
export var city = function (prefix) {
    var province = helper.pick(DICT);
    var city = helper.pick(province.children);
    return prefix ? [province.name, city.name].join(' ') : city.name;
};
// 随机生成一个（中国）县。
export var county = function (prefix) {
    var province = helper.pick(DICT);
    var city = helper.pick(province.children);
    var county = helper.pick(city.children) || {
        name: '-'
    };
    return prefix ? [province.name, city.name, county.name].join(' ') : county.name;
};
// 随机生成一个邮政编码（六位数字）。
export var zip = function (len) {
    var zip = '';
    for (var i = 0; i < (len || 6); i++) {
        zip += basic.natural(0, 9);
    }
    return zip;
};
