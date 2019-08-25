export var each = function (obj, iterator, context) {
    var i, key;
    if (type(obj) === 'number') {
        for (i = 0; i < obj; i++) {
            iterator(i, i);
        }
    }
    else if (obj.length === +obj.length) {
        for (i = 0; i < obj.length; i++) {
            if (iterator.call(context, obj[i], i, obj) === false)
                break;
        }
    }
    else {
        for (key in obj) {
            if (iterator.call(context, obj[key], key, obj) === false)
                break;
        }
    }
};
export var type = function (obj) {
    return obj === null || obj === undefined
        ? String(obj)
        : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
};
export var isString = function (value) {
    return type(value) === 'string';
};
export var isObject = function (value) {
    return type(value) === 'object';
};
export var isArray = function (value) {
    return type(value) === 'array';
};
export var isRegExp = function (value) {
    return type(value) === 'regexp';
};
export var isFunction = function (value) {
    return type(value) === 'function';
};
export var isObjectOrArray = function (value) {
    return isObject(value) || isArray(value);
};
export var isNumeric = function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
};
export var keys = function (obj) {
    var keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys;
};
export var values = function (obj) {
    var values = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            values.push(obj[key]);
        }
    }
    return values;
};
/**
 * ### Mock.heredoc(fn)
 *
 * 以直观、安全的方式书写（多行）HTML 模板。
 *
 * 使用示例如下所示：
 *
 * const tpl = Mock.heredoc(function () {
   *
   * })
 *
 * 相关阅读:
 *
 * [Creating multiline strings in JavaScript](http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript)
 */
export var heredoc = function (fn) {
    // 1. 移除起始的 function(){ /*!
    // 2. 移除末尾的 */ }
    // 3. 移除起始和末尾的空格
    return fn
        .toString()
        .replace(/^[^\/]+\/\*!?/, '')
        .replace(/\*\/[^\/]+$/, '')
        .replace(/^[\s\xA0]+/, '')
        .replace(/[\s\xA0]+$/, ''); // .trim()
};
export var noop = function () { };
