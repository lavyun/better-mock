// Date
var patternLetters = {
    yyyy: 'getFullYear', yy: function (date) {
        return ('' + date.getFullYear()).slice(2);
    },
    y: 'yy',
    MM: function (date) {
        var m = date.getMonth() + 1;
        return m < 10 ? '0' + m : m;
    },
    M: function (date) {
        return date.getMonth() + 1;
    },
    dd: function (date) {
        var d = date.getDate();
        return d < 10 ? '0' + d : d;
    },
    d: 'getDate',
    HH: function (date) {
        var h = date.getHours();
        return h < 10 ? '0' + h : h;
    },
    H: 'getHours',
    hh: function (date) {
        var h = date.getHours() % 12;
        return h < 10 ? '0' + h : h;
    },
    h: function (date) {
        return date.getHours() % 12;
    },
    mm: function (date) {
        var m = date.getMinutes();
        return m < 10 ? '0' + m : m;
    },
    m: 'getMinutes',
    ss: function (date) {
        var s = date.getSeconds();
        return s < 10 ? '0' + s : s;
    },
    s: 'getSeconds',
    SS: function (date) {
        var ms = date.getMilliseconds();
        return ms < 10 && '00' + ms || ms < 100 && '0' + ms || ms;
    },
    S: 'getMilliseconds',
    A: function (date) {
        return date.getHours() < 12 ? 'AM' : 'PM';
    },
    a: function (date) {
        return date.getHours() < 12 ? 'am' : 'pm';
    },
    T: 'getTime'
};
var _createFormatRE = function () {
    var re = Object.keys(patternLetters);
    return '(' + re.join('|') + ')';
};
var _rformat = new RegExp(_createFormatRE(), 'g');
var _formatDate = function (date, format) {
    return format.replace(_rformat, function createNewSubString($0, flag) {
        return typeof patternLetters[flag] === 'function' ? patternLetters[flag](date) : patternLetters[flag] in patternLetters ? createNewSubString($0, patternLetters[flag]) : date[patternLetters[flag]]();
    });
};
// 生成一个随机的 Date 对象。
var _randomDate = function (min, max) {
    min = min === undefined ? new Date(0) : min;
    max = max === undefined ? new Date() : max;
    return new Date(Math.random() * (max.getTime() - min.getTime()));
};
// 返回一个随机的日期字符串。
export var date = function (format) {
    format = format || 'yyyy-MM-dd';
    return _formatDate(_randomDate(), format);
};
// 返回一个随机的时间字符串。
export var time = function (format) {
    format = format || 'HH:mm:ss';
    return _formatDate(_randomDate(), format);
};
// 返回一个随机的日期和时间字符串。
export var datetime = function (format) {
    format = format || 'yyyy-MM-dd HH:mm:ss';
    return _formatDate(_randomDate(), format);
};
// 返回当前的日期和时间字符串。
export var now = function (unit, format) {
    // now(unit) now(format)
    if (arguments.length === 1) {
        // now(format)
        if (!/year|month|day|hour|minute|second|week/.test(unit)) {
            format = unit;
            unit = '';
        }
    }
    unit = (unit || '').toLowerCase();
    format = format || 'yyyy-MM-dd HH:mm:ss';
    var date = new Date();
    // 参考自 http://momentjs.cn/docs/#/manipulating/start-of/
    switch (unit) {
        case 'year':
            date.setMonth(0);
            break;
        case 'month':
            date.setDate(1);
            break;
        case 'week':
            date.setDate(date.getDate() - date.getDay());
            break;
        case 'day':
            date.setHours(0);
            break;
        case 'hour':
            date.setMinutes(0);
            break;
        case 'minute':
            date.setSeconds(0);
            break;
        case 'second':
            date.setMilliseconds(0);
    }
    return _formatDate(date, format);
};
