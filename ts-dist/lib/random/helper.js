import * as util from '../util';
import * as basic from './basic';
// 把字符串的第一个字母转换为大写。
export var capitalize = function (word) {
    return (word + '').charAt(0).toUpperCase() + (word + '').substr(1);
};
// 把字符串转换为大写。
export var upper = function (str) {
    return (str + '').toUpperCase();
};
// 把字符串转换为小写。
export var lower = function (str) {
    return (str + '').toLowerCase();
};
// 从数组中随机选取一个元素，并返回。
export var pick = function pick(arr, min, max) {
    // pick( item1, item2 ... )
    if (!util.isArray(arr)) {
        arr = [].slice.call(arguments);
        min = 1;
        max = 1;
    }
    else {
        // pick( [ item1, item2 ... ] )
        if (min === undefined)
            min = 1;
        // pick( [ item1, item2 ... ], count )
        if (max === undefined)
            max = min;
    }
    if (min === 1 && max === 1)
        return arr[basic.natural(0, arr.length - 1)];
    // pick( [ item1, item2 ... ], min, max )
    return shuffle(arr, min, max);
};
// 打乱数组中元素的顺序，并返回。
// Given an array, scramble the order and return it.
//
// 其他的实现思路：
// // https://code.google.com/p/jslibs/wiki/JavascriptTips
// result = result.sort(function() {
//   return Math.random() - 0.5
// })
export var shuffle = function shuffle(arr, min, max) {
    arr = arr || [];
    var old = arr.slice(0);
    var result = [];
    var index = 0;
    var length = old.length;
    for (var i = 0; i < length; i++) {
        index = basic.natural(0, old.length - 1);
        result.push(old[index]);
        old.splice(index, 1);
    }
    switch (arguments.length) {
        case 0:
        case 1:
            return result;
        case 2:
            max = min;
        // falls through
        case 3:
            min = parseInt(min, 10);
            max = parseInt(max, 10);
            return result.slice(0, basic.natural(min, max));
    }
};
