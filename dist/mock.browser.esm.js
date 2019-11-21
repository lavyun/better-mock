/*!
 * better-mock v0.1.1
 * (c) 2019-2019 lavyun@163.com * Released under the MIT License.
 */
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var constant = {
  GUID: 1,
  RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
  RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
  RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g
};

var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var objectAssign = function objectAssign(target, args) {
  // TypeError if undefined or null
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var to = Object(target);

  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];

    if (nextSource != null) {
      // Skip over if undefined or null
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }

  return to;
};
var each = function each(obj, iterator, context) {
  var i, key;

  if (type(obj) === 'number') {
    for (i = 0; i < obj; i++) {
      iterator(i, i);
    }
  } else if (obj.length === +obj.length) {
    for (i = 0; i < obj.length; i++) {
      if (iterator.call(context, obj[i], i, obj) === false) break;
    }
  } else {
    for (key in obj) {
      if (iterator.call(context, obj[key], key, obj) === false) break;
    }
  }
};
var type = function type(value) {
  return isDef(value) ? Object.prototype.toString.call(value).match(/\[object (\w+)\]/)[1].toLowerCase() : String(value);
};
var isDef = function isDef(value) {
  return value !== undefined && value !== null;
};
var isString = function isString(value) {
  return type(value) === 'string';
};
var isNumber = function isNumber(value) {
  return type(value) === 'number';
};
var isObject = function isObject(value) {
  return type(value) === 'object';
};
var isArray = function isArray(value) {
  return type(value) === 'array';
};
var isRegExp = function isRegExp(value) {
  return type(value) === 'regexp';
};
var isFunction = function isFunction(value) {
  return type(value) === 'function';
};
var isObjectOrArray = function isObjectOrArray(value) {
  return isObject(value) || isArray(value);
};
var isNumeric = function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
};
var keys = function keys(obj) {
  var keys = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  return keys;
};
var values = function values(obj) {
  var values = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  }

  return values;
};
/**
 * Mock.heredoc(fn)
 * 以直观、安全的方式书写（多行）HTML 模板。
 * http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
 */

var heredoc = function heredoc(fn) {
  // 1. 移除起始的 function(){ /*!
  // 2. 移除末尾的 */ }
  // 3. 移除起始和末尾的空格
  return fn.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '').replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, ''); // .trim()
};
var noop = function noop() {};
var logInfo = function logInfo() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  console.log.apply(console, __spreadArrays(['[better-mock]'], args));
};
var assert = function assert(condition, error) {
  if (!condition) {
    throw new Error('[better-mock] ' + error);
  }
};

var Util = /*#__PURE__*/Object.freeze({
  objectAssign: objectAssign,
  each: each,
  type: type,
  isDef: isDef,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isArray: isArray,
  isRegExp: isRegExp,
  isFunction: isFunction,
  isObjectOrArray: isObjectOrArray,
  isNumeric: isNumeric,
  keys: keys,
  values: values,
  heredoc: heredoc,
  noop: noop,
  logInfo: logInfo,
  assert: assert
});

var MAX_NATURE_NUMBER = 9007199254740992;
var MIN_NATURE_NUMBER = -9007199254740992; // 返回一个随机的布尔值。

var _boolean = function _boolean(min, max, current) {
  if (min === void 0) {
    min = 1;
  }

  if (max === void 0) {
    max = 1;
  }

  if (isDef(current)) {
    if (isDef(min)) {
      min = !isNaN(min) ? parseInt(min.toString(), 10) : 1;
    }

    if (isDef(max)) {
      max = !isNaN(max) ? parseInt(max.toString(), 10) : 1;
    }

    return Math.random() > 1.0 / (min + max) * min ? !current : current;
  }

  return Math.random() >= 0.5;
};
var bool = _boolean; // 返回一个随机的自然数（大于等于 0 的整数）。

var natural = function natural(min, max) {
  if (min === void 0) {
    min = 0;
  }

  if (max === void 0) {
    max = MAX_NATURE_NUMBER;
  }

  min = parseInt(min.toString(), 10);
  max = parseInt(max.toString(), 10);
  return Math.round(Math.random() * (max - min)) + min;
}; // 返回一个随机的整数。

var integer = function integer(min, max) {
  if (min === void 0) {
    min = MIN_NATURE_NUMBER;
  }

  if (max === void 0) {
    max = MAX_NATURE_NUMBER;
  }

  min = parseInt(min.toString(), 10);
  max = parseInt(max.toString(), 10);
  return Math.round(Math.random() * (max - min)) + min;
};
var _int = integer; // 返回一个随机的浮点数。

var _float = function _float(min, max, dmin, dmax) {
  dmin = isDef(dmin) ? dmin : 0;
  dmin = Math.max(Math.min(dmin, 17), 0);
  dmax = isDef(dmax) ? dmax : 17;
  dmax = Math.max(Math.min(dmax, 17), 0);
  var ret = integer(min, max) + '.';

  for (var i = 0, dcount = natural(dmin, dmax); i < dcount; i++) {
    // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
    var num = i < dcount - 1 ? character('number') : character('123456789');
    ret += num;
  }

  return parseFloat(ret);
}; // 返回一个随机字符。
var character = function character(pool) {
  if (pool === void 0) {
    pool = '';
  }

  var lower = 'abcdefghijklmnopqrstuvwxyz';
  var upper = lower.toUpperCase();
  var number = '0123456789';
  var symbol = '!@#$%^&*()[]';
  var pools = {
    lower: lower,
    upper: upper,
    number: number,
    symbol: symbol,
    alpha: lower + upper
  };

  if (!pool) {
    pool = lower + upper + number + symbol;
  } else {
    pool = pools[pool.toLowerCase()] || pool;
  }

  return pool.charAt(natural(0, pool.length - 1));
};
var _char = character; // 返回一个随机字符串。
var string = function string(pool, min, max) {
  var len;

  switch (arguments.length) {
    case 0:
      // ()
      len = natural(3, 7);
      break;

    case 1:
      // ( length )
      len = pool;
      pool = undefined;
      break;

    case 2:
      // ( pool, length )
      if (typeof arguments[0] === 'string') {
        len = min;
      } else {
        // ( min, max )
        len = natural(pool, min);
        pool = undefined;
      }

      break;

    case 3:
      len = natural(min, max);
      break;
  }

  var text = '';

  for (var i = 0; i < len; i++) {
    text += character(pool);
  }

  return text;
};
var str = string; // 返回一个整型数组。

var range = function range(start, stop, step) {
  if (step === void 0) {
    step = 1;
  } // range( stop )


  if (arguments.length <= 1) {
    stop = start || 0;
    start = 0;
  }

  start = +start;
  stop = +stop;
  step = +step;
  var idx = 0;
  var len = Math.max(Math.ceil((stop - start) / step), 0);
  var range = new Array(len);

  while (idx < len) {
    range[idx++] = start;
    start += step;
  }

  return range;
};

var basic = /*#__PURE__*/Object.freeze({
  boolean: _boolean,
  bool: bool,
  natural: natural,
  integer: integer,
  int: _int,
  float: _float,
  character: character,
  char: _char,
  string: string,
  str: str,
  range: range
});

// Date

var _padZero = function _padZero(value) {
  return value < 10 ? '0' + value : value.toString();
};

var patternLetters = {
  yyyy: 'getFullYear',
  yy: function yy(date) {
    return date.getFullYear().toString().slice(2);
  },
  y: 'yy',
  MM: function MM(date) {
    return _padZero(date.getMonth() + 1);
  },
  M: function M(date) {
    return (date.getMonth() + 1).toString();
  },
  dd: function dd(date) {
    return _padZero(date.getDate());
  },
  d: 'getDate',
  HH: function HH(date) {
    return _padZero(date.getHours());
  },
  H: 'getHours',
  hh: function hh(date) {
    return _padZero(date.getHours() % 12);
  },
  h: function h(date) {
    return (date.getHours() % 12).toString();
  },
  mm: function mm(date) {
    return _padZero(date.getMinutes());
  },
  m: 'getMinutes',
  ss: function ss(date) {
    return _padZero(date.getSeconds());
  },
  s: 'getSeconds',
  SS: function SS(date) {
    var ms = date.getMilliseconds();
    return ms < 10 && '00' + ms || ms < 100 && '0' + ms || ms.toString();
  },
  S: 'getMilliseconds',
  A: function A(date) {
    return date.getHours() < 12 ? 'AM' : 'PM';
  },
  a: function a(date) {
    return date.getHours() < 12 ? 'am' : 'pm';
  },
  T: 'getTime'
};

var _createFormatRE = function _createFormatRE() {
  var re = keys(patternLetters);
  return '(' + re.join('|') + ')';
};

var _formatDate = function _formatDate(date, format) {
  var formatRE = new RegExp(_createFormatRE(), 'g');
  return format.replace(formatRE, function createNewSubString($0, flag) {
    return typeof patternLetters[flag] === 'function' ? patternLetters[flag](date) : patternLetters[flag] in patternLetters ? createNewSubString($0, patternLetters[flag]) : date[patternLetters[flag]]();
  });
}; // 生成一个随机的 Date 对象。


var _randomDate = function _randomDate(min, max) {
  if (min === void 0) {
    min = new Date(0);
  }

  if (max === void 0) {
    max = new Date();
  }

  var randomTS = Math.random() * (max.getTime() - min.getTime());
  return new Date(randomTS);
}; // 返回一个随机的日期字符串。


var date = function date(format) {
  if (format === void 0) {
    format = 'yyyy-MM-dd';
  }

  return _formatDate(_randomDate(), format);
}; // 返回一个随机的时间字符串。

var time = function time(format) {
  if (format === void 0) {
    format = 'HH:mm:ss';
  }

  return _formatDate(_randomDate(), format);
}; // 返回一个随机的日期和时间字符串。

var datetime = function datetime(format) {
  if (format === void 0) {
    format = 'yyyy-MM-dd HH:mm:ss';
  }

  return _formatDate(_randomDate(), format);
}; // 返回一个随机的时间戳

var timestamp = function timestamp() {
  return Number(_formatDate(_randomDate(), 'T'));
}; // 返回当前的日期和时间字符串。

var now = function now(unit, format) {
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
  var date = new Date(); // 参考自 http://momentjs.cn/docs/#/manipulating/start-of/

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

var date$1 = /*#__PURE__*/Object.freeze({
  date: date,
  time: time,
  datetime: datetime,
  timestamp: timestamp,
  now: now
});

var capitalize = function capitalize(word) {
  word = word + '';
  return word.charAt(0).toUpperCase() + word.substr(1);
}; // 把字符串转换为大写。

var upper = function upper(str) {
  return (str + '').toUpperCase();
}; // 把字符串转换为小写。

var lower = function lower(str) {
  return (str + '').toLowerCase();
}; // 从数组中随机选取一个元素，并返回。

var pick = function pick(arr, min, max) {
  // pick( item1, item2 ... )
  if (!isArray(arr)) {
    arr = [].slice.call(arguments);
    min = 1;
    max = 1;
  } else {
    // pick( [ item1, item2 ... ] )
    if (!isDef(min)) {
      min = 1;
    } // pick( [ item1, item2 ... ], count )


    if (!isDef(max)) {
      max = min;
    }
  }

  if (min === 1 && max === 1) {
    return arr[natural(0, arr.length - 1)];
  } // pick( [ item1, item2 ... ], min, max )


  return shuffle(arr, min, max);
}; // 从map中随机选择一个

var pickMap = function pickMap(map) {
  return pick(values(map));
}; // 打乱数组中元素的顺序，并返回。

var shuffle = function shuffle(arr, min, max) {
  arr = arr || [];
  var old = arr.slice(0);
  var result = [];
  var index = 0;
  var length = old.length;

  for (var i = 0; i < length; i++) {
    index = natural(0, old.length - 1);
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
      min = parseInt(min.toString(), 10);
      max = parseInt(max.toString(), 10);
      return result.slice(0, natural(min, max));
  }
};

var helper = /*#__PURE__*/Object.freeze({
  capitalize: capitalize,
  upper: upper,
  lower: lower,
  pick: pick,
  pickMap: pickMap,
  shuffle: shuffle
});

// image

var imageSize = ['150x100', '300x200', '400x300', '600x450', '800X600', '100x150', '200x300', '300x400', '450x600', '600x800', '100x100', '200x200', '300x300', '450x450', '600x600'];
/**
 * 随机生成一个图片，使用：https://dummyimage.com/，例如：
 * https://dummyimage.com/600x400/cc00cc/470047.png&text=hello
 * @param size 图片大小
 * @param background 背景色
 * @param foreground 文字颜色
 * @param format 图片格式
 * @param text 文字
 */

var image = function image(size, background, foreground, format, text) {
  // Random.image( size, background, foreground, text )
  if (arguments.length === 4) {
    text = format;
    format = undefined;
  } // Random.image( size, background, text )


  if (arguments.length === 3) {
    text = foreground;
    foreground = undefined;
  } // Random.image( size, text )


  if (arguments.length === 2) {
    text = background;
    background = undefined;
  } // Random.image()


  size = size || pick(imageSize);

  if (background && ~background.indexOf('#')) {
    background = background.slice(1);
  }

  if (foreground && ~foreground.indexOf('#')) {
    foreground = foreground.slice(1);
  }

  return 'https://dummyimage.com/' + size + (background ? '/' + background : '') + (foreground ? '/' + foreground : '') + (format ? '.' + format : '') + (text ? '&text=' + encodeURIComponent(text) : '');
};
var img = image;
/**
 * 生成一个随机的base64图片
 * @param size 图片宽高
 * @param text 图片上的文字
 */

var dataImage = function dataImage(size, text) {
  size = size || pick(imageSize);
  text = text || size;
  var background = pick(['#171515', '#e47911', '#183693', '#720e9e', '#c4302b', '#dd4814', '#00acee', '#0071c5', '#3d9ae8', '#ec6231', '#003580', '#e51937']);
  var sizes = size.split('x');
  var width = parseInt(sizes[0], 10);
  var height = parseInt(sizes[1], 10);
  assert(isNumber(width) && isNumber(height), 'Invalid size, expected INTxINT, e.g. 300x400');

  {
    return createBrowserDataImage(width, height, background, text);
  }
}; // browser 端生成 base64 图片

function createBrowserDataImage(width, height, background, text) {
  var canvas = document.createElement('canvas');
  var ctx = canvas && canvas.getContext && canvas.getContext('2d');

  if (!canvas || !ctx) {
    return '';
  }

  canvas.width = width;
  canvas.height = height;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText(text, width / 2, height / 2, width);
  return canvas.toDataURL('image/png');
} // node 端生成 base64 图片

var image$1 = /*#__PURE__*/Object.freeze({
  image: image,
  img: img,
  dataImage: dataImage
});

// 颜色空间RGB与HSV(HSL)的转换
var hsv2rgb = function hsv2rgb(hsv) {
  var h = hsv[0] / 60;
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var hi = Math.floor(h) % 6;
  var f = h - Math.floor(h);
  var p = 255 * v * (1 - s);
  var q = 255 * v * (1 - s * f);
  var t = 255 * v * (1 - s * (1 - f));
  v = 255 * v;

  switch (hi) {
    case 0:
      return [v, t, p];

    case 1:
      return [q, v, p];

    case 2:
      return [p, v, t];

    case 3:
      return [p, q, v];

    case 4:
      return [t, p, v];

    case 5:
      return [v, p, q];
  }
};
var hsv2hsl = function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl,
      l;
  l = (2 - s) * v;
  sl = s * v;
  sl /= l <= 1 ? l : 2 - l;
  l /= 2;
  return [h, sl * 100, l * 100];
}; // http://www.140byt.es/keywords/color

var rgb2hex = function rgb2hex(a, // red, as a number from 0 to 255
b, // green, as a number from 0 to 255
c // blue, as a number from 0 to 255
) {
  return "#" + ((256 + a << 8 | b) << 8 | c).toString(16).slice(1);
};

// color 字典数据
// http://clrs.cc
var dict = {
  // name value nicer
  navy: {
    value: '#000080',
    nicer: '#001F3F'
  },
  blue: {
    value: '#0000ff',
    nicer: '#0074D9'
  },
  aqua: {
    value: '#00ffff',
    nicer: '#7FDBFF'
  },
  teal: {
    value: '#008080',
    nicer: '#39CCCC'
  },
  olive: {
    value: '#008000',
    nicer: '#3D9970'
  },
  green: {
    value: '#008000',
    nicer: '#2ECC40'
  },
  lime: {
    value: '#00ff00',
    nicer: '#01FF70'
  },
  yellow: {
    value: '#ffff00',
    nicer: '#FFDC00'
  },
  orange: {
    value: '#ffa500',
    nicer: '#FF851B'
  },
  red: {
    value: '#ff0000',
    nicer: '#FF4136'
  },
  maroon: {
    value: '#800000',
    nicer: '#85144B'
  },
  fuchsia: {
    value: '#ff00ff',
    nicer: '#F012BE'
  },
  purple: {
    value: '#800080',
    nicer: '#B10DC9'
  },
  silver: {
    value: '#c0c0c0',
    nicer: '#DDDDDD'
  },
  gray: {
    value: '#808080',
    nicer: '#AAAAAA'
  },
  black: {
    value: '#000000',
    nicer: '#111111'
  },
  white: {
    value: '#FFFFFF',
    nicer: '#FFFFFF'
  }
};

// 颜色相关

var color = function color(name) {
  if (name === void 0) {
    name = '';
  }

  if (name || dict[name]) {
    return dict[name].nicer;
  }

  return hex();
}; // #DAC0DE

var hex = function hex() {
  var hsv = _goldenRatioColor();

  var rgb = hsv2rgb(hsv);
  return rgb2hex(rgb[0], rgb[1], rgb[2]);
}; // rgb(128,255,255)

var rgb = function rgb() {
  var hsv = _goldenRatioColor();

  var rgb = hsv2rgb(hsv);
  return 'rgb(' + parseInt(rgb[0].toString(), 10) + ', ' + parseInt(rgb[1].toString(), 10) + ', ' + parseInt(rgb[2].toString(), 10) + ')';
}; // rgba(128,255,255,0.3)

var rgba = function rgba() {
  var hsv = _goldenRatioColor();

  var rgb = hsv2rgb(hsv);
  return 'rgba(' + parseInt(rgb[0].toString(), 10) + ', ' + parseInt(rgb[1].toString(), 10) + ', ' + parseInt(rgb[2].toString(), 10) + ', ' + Math.random().toFixed(2) + ')';
}; // hsl(300,80%,90%)

var hsl = function hsl() {
  var hsv = _goldenRatioColor();

  var hsl = hsv2hsl(hsv);
  return 'hsl(' + parseInt(hsl[0], 10) + ', ' + parseInt(hsl[1], 10) + ', ' + parseInt(hsl[2], 10) + ')';
}; // http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
// https://github.com/devongovett/color-generator/blob/master/index.js
// 随机生成一个有吸引力的颜色。

var _hue = 0;

var _goldenRatioColor = function _goldenRatioColor(saturation, value) {
  var _goldenRatio = 0.618033988749895;
  _hue = _hue || Math.random();
  _hue += _goldenRatio;
  _hue %= 1;
  if (typeof saturation !== "number") saturation = 0.5;
  if (typeof value !== "number") value = 0.95;
  return [_hue * 360, saturation * 100, value * 100];
};

var color$1 = /*#__PURE__*/Object.freeze({
  color: color,
  hex: hex,
  rgb: rgb,
  rgba: rgba,
  hsl: hsl
});

var _range = function _range(defaultMin, defaultMax, min, max) {
  return !isDef(min) ? natural(defaultMin, defaultMax) : !isDef(max) ? min : natural(parseInt(min.toString(), 10), parseInt(max.toString(), 10)); // ( min, max )
}; // 随机生成一段文本。


var paragraph = function paragraph(min, max) {
  var len = _range(3, 7, min, max);

  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(sentence());
  }

  return result.join(' ');
};
var cparagraph = function cparagraph(min, max) {
  var len = _range(3, 7, min, max);

  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(csentence());
  }

  return result.join('');
}; // 随机生成一个句子，第一个单词的首字母大写。

var sentence = function sentence(min, max) {
  var len = _range(12, 18, min, max);

  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(word());
  }

  return capitalize(result.join(' ')) + '.';
}; // 随机生成一个中文句子。

var csentence = function csentence(min, max) {
  var len = _range(12, 18, min, max);

  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(cword());
  }

  return result.join('') + '。';
}; // 随机生成一个单词。

var word = function word(min, max) {
  var len = _range(3, 10, min, max);

  var result = '';

  for (var i = 0; i < len; i++) {
    result += character('lower');
  }

  return result;
}; // 随机生成一个或多个汉字。

var cword = function cword(pool, min, max) {
  if (pool === void 0) {
    pool = '';
  } // 最常用的 500 个汉字 http://baike.baidu.com/view/568436.htm


  var DICT_HANZI = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞';
  var len;

  switch (arguments.length) {
    case 0:
      // ()
      pool = DICT_HANZI;
      len = 1;
      break;

    case 1:
      // ( pool )
      if (typeof arguments[0] === 'string') {
        len = 1;
      } else {
        // ( length )
        len = pool;
        pool = DICT_HANZI;
      }

      break;

    case 2:
      // ( pool, length )
      if (typeof arguments[0] === 'string') {
        len = min;
      } else {
        // ( min, max )
        len = natural(parseInt(pool, 10), min);
        pool = DICT_HANZI;
      }

      break;

    case 3:
      len = natural(min, max);
      break;
  }

  var result = '';

  for (var i = 0; i < len; i++) {
    result += pool.charAt(natural(0, pool.length - 1));
  }

  return result;
}; // 随机生成一句标题，其中每个单词的首字母大写。

var title = function title(min, max) {
  var len = _range(3, 7, min, max);

  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(capitalize(word()));
  }

  return result.join(' ');
}; // 随机生成一句中文标题。

var ctitle = function ctitle(min, max) {
  var len = _range(3, 7, min, max);

  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(cword());
  }

  return result.join('');
};

var text = /*#__PURE__*/Object.freeze({
  paragraph: paragraph,
  cparagraph: cparagraph,
  sentence: sentence,
  csentence: csentence,
  word: word,
  cword: cword,
  title: title,
  ctitle: ctitle
});

var __spreadArrays$1 = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var first = function first() {
  var male = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric"];
  var female = ["Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna"];
  return pick(__spreadArrays$1(male, female));
}; // 随机生成一个常见的英文姓。

var last = function last() {
  var names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen"];
  return pick(names);
}; // 随机生成一个常见的英文姓名。

var name = function name(middle) {
  if (middle === void 0) {
    middle = false;
  }

  return first() + ' ' + (middle ? first() + ' ' : '') + last();
}; // 随机生成一个常见的中文姓。
// [世界常用姓氏排行](http://baike.baidu.com/view/1719115.htm)
// [玄派网 - 网络小说创作辅助平台](http://xuanpai.sinaapp.com/)

var cfirst = function cfirst() {
  var names = ["王", "李", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴", "徐", "孙", "胡", "朱", "高", "林", "何", "郭", "马", "罗", "梁", "宋", "郑", "谢", "韩", "唐", "冯", "于", "董", "萧", "程", "曹", "袁", "邓", "许", "傅", "沈", "曾", "彭", "吕", "苏", "卢", "蒋", "蔡", "贾", "丁", "魏", "薛", "叶", "阎", "余", "潘", "杜", "戴", "夏", "锺", "汪", "田", "任", "姜", "范", "方", "石", "姚", "谭", "廖", "邹", "熊", "金", "陆", "郝", "孔", "白", "崔", "康", "毛", "邱", "秦", "江", "史", "顾", "侯", "邵", "孟", "龙", "万", "段", "雷", "钱", "汤", "尹", "黎", "易", "常", "武", "乔", "贺", "赖", "龚", "文"];
  return pick(names);
}; // 随机生成一个常见的中文名。
// [中国最常见名字前50名_三九算命网](http://www.name999.net/xingming/xingshi/20131004/48.html)

var clast = function clast() {
  var names = ["伟", "芳", "娜", "秀英", "敏", "静", "丽", "强", "磊", "军", "洋", "勇", "艳", "杰", "娟", "涛", "明", "超", "秀兰", "霞", "平", "刚", "桂英"];
  return pick(names);
}; // 随机生成一个常见的中文姓名。

var cname = function cname() {
  return cfirst() + clast();
};

var name$1 = /*#__PURE__*/Object.freeze({
  first: first,
  last: last,
  name: name,
  cfirst: cfirst,
  clast: clast,
  cname: cname
});

var url = function url(_protocol, host) {
  if (_protocol === void 0) {
    _protocol = protocol();
  }

  if (host === void 0) {
    host = domain();
  }

  return _protocol + "://" + host + "/" + word();
}; // 随机生成一个 URL 协议。

var protocol = function protocol() {
  // 协议簇
  var protocols = ['http', 'ftp', 'gopher', 'mailto', 'mid', 'cid', 'news', 'nntp', 'prospero', 'telnet', 'rlogin', 'tn3270', 'wais'];
  return pick(protocols);
}; // 随机生成一个域名。

var domain = function domain(_tld) {
  if (_tld === void 0) {
    _tld = tld();
  }

  return word() + '.' + _tld;
}; // 随机生成一个顶级域名。
// [域名后缀大全](http://www.163ns.com/zixun/post/4417.html)

var tld = function tld() {
  var tlds = ( // 域名后缀
  'com net org edu gov int mil cn ' + // 国内域名
  'com.cn net.cn gov.cn org.cn ' + // 中文国内域名
  '中国 中国互联.公司 中国互联.网络 ' + // 新国际域名
  'tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ' + // 世界各国域名后缀
  'ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw').split(' ');
  return pick(tlds);
}; // 随机生成一个邮件地址。

var email = function email(_domain) {
  if (_domain === void 0) {
    _domain = domain();
  }

  return character('lower') + '.' + word() + '@' + _domain;
}; // 随机生成一个 IP 地址。

var ip = function ip() {
  return natural(0, 255) + '.' + natural(0, 255) + '.' + natural(0, 255) + '.' + natural(0, 255);
};

var web = /*#__PURE__*/Object.freeze({
  url: url,
  protocol: protocol,
  domain: domain,
  tld: tld,
  email: email,
  ip: ip
});

var location$1 = {
	"110000": {
	code: "110000",
	name: "北京市",
	cities: {
		"110000": {
			code: "110000",
			name: "北京市",
			districts: {
				"110101": "东城区",
				"110102": "西城区",
				"110105": "朝阳区",
				"110106": "丰台区",
				"110107": "石景山区",
				"110108": "海淀区",
				"110109": "门头沟区",
				"110111": "房山区",
				"110112": "通州区",
				"110113": "顺义区",
				"110114": "昌平区",
				"110115": "大兴区",
				"110116": "怀柔区",
				"110117": "平谷区",
				"110118": "密云区",
				"110119": "延庆区"
			}
		}
	}
},
	"120000": {
	code: "120000",
	name: "天津市",
	cities: {
		"120000": {
			code: "120000",
			name: "天津市",
			districts: {
				"120101": "和平区",
				"120102": "河东区",
				"120103": "河西区",
				"120104": "南开区",
				"120105": "河北区",
				"120106": "红桥区",
				"120110": "东丽区",
				"120111": "西青区",
				"120112": "津南区",
				"120113": "北辰区",
				"120114": "武清区",
				"120115": "宝坻区",
				"120116": "滨海新区",
				"120117": "宁河区",
				"120118": "静海区",
				"120119": "蓟州区"
			}
		}
	}
},
	"130000": {
	code: "130000",
	name: "河北省",
	cities: {
		"130100": {
			code: "130100",
			name: "石家庄市",
			districts: {
				"130102": "长安区",
				"130104": "桥西区",
				"130105": "新华区",
				"130107": "井陉矿区",
				"130108": "裕华区",
				"130109": "藁城区",
				"130110": "鹿泉区",
				"130111": "栾城区",
				"130121": "井陉县",
				"130123": "正定县",
				"130125": "行唐县",
				"130126": "灵寿县",
				"130127": "高邑县",
				"130128": "深泽县",
				"130129": "赞皇县",
				"130130": "无极县",
				"130131": "平山县",
				"130132": "元氏县",
				"130133": "赵县",
				"130181": "辛集市",
				"130183": "晋州市",
				"130184": "新乐市"
			}
		},
		"130200": {
			code: "130200",
			name: "唐山市",
			districts: {
				"130202": "路南区",
				"130203": "路北区",
				"130204": "古冶区",
				"130205": "开平区",
				"130207": "丰南区",
				"130208": "丰润区",
				"130209": "曹妃甸区",
				"130224": "滦南县",
				"130225": "乐亭县",
				"130227": "迁西县",
				"130229": "玉田县",
				"130281": "遵化市",
				"130283": "迁安市",
				"130284": "滦州市"
			}
		},
		"130300": {
			code: "130300",
			name: "秦皇岛市",
			districts: {
				"130302": "海港区",
				"130303": "山海关区",
				"130304": "北戴河区",
				"130306": "抚宁区",
				"130321": "青龙满族自治县",
				"130322": "昌黎县",
				"130324": "卢龙县"
			}
		},
		"130400": {
			code: "130400",
			name: "邯郸市",
			districts: {
				"130402": "邯山区",
				"130403": "丛台区",
				"130404": "复兴区",
				"130406": "峰峰矿区",
				"130407": "肥乡区",
				"130408": "永年区",
				"130423": "临漳县",
				"130424": "成安县",
				"130425": "大名县",
				"130426": "涉县",
				"130427": "磁县",
				"130430": "邱县",
				"130431": "鸡泽县",
				"130432": "广平县",
				"130433": "馆陶县",
				"130434": "魏县",
				"130435": "曲周县",
				"130481": "武安市"
			}
		},
		"130500": {
			code: "130500",
			name: "邢台市",
			districts: {
				"130502": "桥东区",
				"130503": "桥西区",
				"130521": "邢台县",
				"130522": "临城县",
				"130523": "内丘县",
				"130524": "柏乡县",
				"130525": "隆尧县",
				"130526": "任县",
				"130527": "南和县",
				"130528": "宁晋县",
				"130529": "巨鹿县",
				"130530": "新河县",
				"130531": "广宗县",
				"130532": "平乡县",
				"130533": "威县",
				"130534": "清河县",
				"130535": "临西县",
				"130581": "南宫市",
				"130582": "沙河市"
			}
		},
		"130600": {
			code: "130600",
			name: "保定市",
			districts: {
				"130602": "竞秀区",
				"130606": "莲池区",
				"130607": "满城区",
				"130608": "清苑区",
				"130609": "徐水区",
				"130623": "涞水县",
				"130624": "阜平县",
				"130626": "定兴县",
				"130627": "唐县",
				"130628": "高阳县",
				"130629": "容城县",
				"130630": "涞源县",
				"130631": "望都县",
				"130632": "安新县",
				"130633": "易县",
				"130634": "曲阳县",
				"130635": "蠡县",
				"130636": "顺平县",
				"130637": "博野县",
				"130638": "雄县",
				"130681": "涿州市",
				"130682": "定州市",
				"130683": "安国市",
				"130684": "高碑店市"
			}
		},
		"130700": {
			code: "130700",
			name: "张家口市",
			districts: {
				"130702": "桥东区",
				"130703": "桥西区",
				"130705": "宣化区",
				"130706": "下花园区",
				"130708": "万全区",
				"130709": "崇礼区",
				"130722": "张北县",
				"130723": "康保县",
				"130724": "沽源县",
				"130725": "尚义县",
				"130726": "蔚县",
				"130727": "阳原县",
				"130728": "怀安县",
				"130730": "怀来县",
				"130731": "涿鹿县",
				"130732": "赤城县"
			}
		},
		"130800": {
			code: "130800",
			name: "承德市",
			districts: {
				"130802": "双桥区",
				"130803": "双滦区",
				"130804": "鹰手营子矿区",
				"130821": "承德县",
				"130822": "兴隆县",
				"130824": "滦平县",
				"130825": "隆化县",
				"130826": "丰宁满族自治县",
				"130827": "宽城满族自治县",
				"130828": "围场满族蒙古族自治县",
				"130881": "平泉市"
			}
		},
		"130900": {
			code: "130900",
			name: "沧州市",
			districts: {
				"130902": "新华区",
				"130903": "运河区",
				"130921": "沧县",
				"130922": "青县",
				"130923": "东光县",
				"130924": "海兴县",
				"130925": "盐山县",
				"130926": "肃宁县",
				"130927": "南皮县",
				"130928": "吴桥县",
				"130929": "献县",
				"130930": "孟村回族自治县",
				"130981": "泊头市",
				"130982": "任丘市",
				"130983": "黄骅市",
				"130984": "河间市"
			}
		},
		"131000": {
			code: "131000",
			name: "廊坊市",
			districts: {
				"131002": "安次区",
				"131003": "广阳区",
				"131022": "固安县",
				"131023": "永清县",
				"131024": "香河县",
				"131025": "大城县",
				"131026": "文安县",
				"131028": "大厂回族自治县",
				"131081": "霸州市",
				"131082": "三河市"
			}
		},
		"131100": {
			code: "131100",
			name: "衡水市",
			districts: {
				"131102": "桃城区",
				"131103": "冀州区",
				"131121": "枣强县",
				"131122": "武邑县",
				"131123": "武强县",
				"131124": "饶阳县",
				"131125": "安平县",
				"131126": "故城县",
				"131127": "景县",
				"131128": "阜城县",
				"131182": "深州市"
			}
		}
	}
},
	"140000": {
	code: "140000",
	name: "山西省",
	cities: {
		"140100": {
			code: "140100",
			name: "太原市",
			districts: {
				"140105": "小店区",
				"140106": "迎泽区",
				"140107": "杏花岭区",
				"140108": "尖草坪区",
				"140109": "万柏林区",
				"140110": "晋源区",
				"140121": "清徐县",
				"140122": "阳曲县",
				"140123": "娄烦县",
				"140181": "古交市"
			}
		},
		"140200": {
			code: "140200",
			name: "大同市",
			districts: {
				"140212": "新荣区",
				"140213": "平城区",
				"140214": "云冈区",
				"140215": "云州区",
				"140221": "阳高县",
				"140222": "天镇县",
				"140223": "广灵县",
				"140224": "灵丘县",
				"140225": "浑源县",
				"140226": "左云县"
			}
		},
		"140300": {
			code: "140300",
			name: "阳泉市",
			districts: {
				"140302": "城区",
				"140303": "矿区",
				"140311": "郊区",
				"140321": "平定县",
				"140322": "盂县"
			}
		},
		"140400": {
			code: "140400",
			name: "长治市",
			districts: {
				"140403": "潞州区",
				"140404": "上党区",
				"140405": "屯留区",
				"140406": "潞城区",
				"140423": "襄垣县",
				"140425": "平顺县",
				"140426": "黎城县",
				"140427": "壶关县",
				"140428": "长子县",
				"140429": "武乡县",
				"140430": "沁县",
				"140431": "沁源县"
			}
		},
		"140500": {
			code: "140500",
			name: "晋城市",
			districts: {
				"140502": "城区",
				"140521": "沁水县",
				"140522": "阳城县",
				"140524": "陵川县",
				"140525": "泽州县",
				"140581": "高平市"
			}
		},
		"140600": {
			code: "140600",
			name: "朔州市",
			districts: {
				"140602": "朔城区",
				"140603": "平鲁区",
				"140621": "山阴县",
				"140622": "应县",
				"140623": "右玉县",
				"140681": "怀仁市"
			}
		},
		"140700": {
			code: "140700",
			name: "晋中市",
			districts: {
				"140702": "榆次区",
				"140721": "榆社县",
				"140722": "左权县",
				"140723": "和顺县",
				"140724": "昔阳县",
				"140725": "寿阳县",
				"140726": "太谷县",
				"140727": "祁县",
				"140728": "平遥县",
				"140729": "灵石县",
				"140781": "介休市"
			}
		},
		"140800": {
			code: "140800",
			name: "运城市",
			districts: {
				"140802": "盐湖区",
				"140821": "临猗县",
				"140822": "万荣县",
				"140823": "闻喜县",
				"140824": "稷山县",
				"140825": "新绛县",
				"140826": "绛县",
				"140827": "垣曲县",
				"140828": "夏县",
				"140829": "平陆县",
				"140830": "芮城县",
				"140881": "永济市",
				"140882": "河津市"
			}
		},
		"140900": {
			code: "140900",
			name: "忻州市",
			districts: {
				"140902": "忻府区",
				"140921": "定襄县",
				"140922": "五台县",
				"140923": "代县",
				"140924": "繁峙县",
				"140925": "宁武县",
				"140926": "静乐县",
				"140927": "神池县",
				"140928": "五寨县",
				"140929": "岢岚县",
				"140930": "河曲县",
				"140931": "保德县",
				"140932": "偏关县",
				"140981": "原平市"
			}
		},
		"141000": {
			code: "141000",
			name: "临汾市",
			districts: {
				"141002": "尧都区",
				"141021": "曲沃县",
				"141022": "翼城县",
				"141023": "襄汾县",
				"141024": "洪洞县",
				"141025": "古县",
				"141026": "安泽县",
				"141027": "浮山县",
				"141028": "吉县",
				"141029": "乡宁县",
				"141030": "大宁县",
				"141031": "隰县",
				"141032": "永和县",
				"141033": "蒲县",
				"141034": "汾西县",
				"141081": "侯马市",
				"141082": "霍州市"
			}
		},
		"141100": {
			code: "141100",
			name: "吕梁市",
			districts: {
				"141102": "离石区",
				"141121": "文水县",
				"141122": "交城县",
				"141123": "兴县",
				"141124": "临县",
				"141125": "柳林县",
				"141126": "石楼县",
				"141127": "岚县",
				"141128": "方山县",
				"141129": "中阳县",
				"141130": "交口县",
				"141181": "孝义市",
				"141182": "汾阳市"
			}
		}
	}
},
	"150000": {
	code: "150000",
	name: "内蒙古自治区",
	cities: {
		"150100": {
			code: "150100",
			name: "呼和浩特市",
			districts: {
				"150102": "新城区",
				"150103": "回民区",
				"150104": "玉泉区",
				"150105": "赛罕区",
				"150121": "土默特左旗",
				"150122": "托克托县",
				"150123": "和林格尔县",
				"150124": "清水河县",
				"150125": "武川县"
			}
		},
		"150200": {
			code: "150200",
			name: "包头市",
			districts: {
				"150202": "东河区",
				"150203": "昆都仑区",
				"150204": "青山区",
				"150205": "石拐区",
				"150206": "白云鄂博矿区",
				"150207": "九原区",
				"150221": "土默特右旗",
				"150222": "固阳县",
				"150223": "达尔罕茂明安联合旗"
			}
		},
		"150300": {
			code: "150300",
			name: "乌海市",
			districts: {
				"150302": "海勃湾区",
				"150303": "海南区",
				"150304": "乌达区"
			}
		},
		"150400": {
			code: "150400",
			name: "赤峰市",
			districts: {
				"150402": "红山区",
				"150403": "元宝山区",
				"150404": "松山区",
				"150421": "阿鲁科尔沁旗",
				"150422": "巴林左旗",
				"150423": "巴林右旗",
				"150424": "林西县",
				"150425": "克什克腾旗",
				"150426": "翁牛特旗",
				"150428": "喀喇沁旗",
				"150429": "宁城县",
				"150430": "敖汉旗"
			}
		},
		"150500": {
			code: "150500",
			name: "通辽市",
			districts: {
				"150502": "科尔沁区",
				"150521": "科尔沁左翼中旗",
				"150522": "科尔沁左翼后旗",
				"150523": "开鲁县",
				"150524": "库伦旗",
				"150525": "奈曼旗",
				"150526": "扎鲁特旗",
				"150581": "霍林郭勒市"
			}
		},
		"150600": {
			code: "150600",
			name: "鄂尔多斯市",
			districts: {
				"150602": "东胜区",
				"150603": "康巴什区",
				"150621": "达拉特旗",
				"150622": "准格尔旗",
				"150623": "鄂托克前旗",
				"150624": "鄂托克旗",
				"150625": "杭锦旗",
				"150626": "乌审旗",
				"150627": "伊金霍洛旗"
			}
		},
		"150700": {
			code: "150700",
			name: "呼伦贝尔市",
			districts: {
				"150702": "海拉尔区",
				"150703": "扎赉诺尔区",
				"150721": "阿荣旗",
				"150722": "莫力达瓦达斡尔族自治旗",
				"150723": "鄂伦春自治旗",
				"150724": "鄂温克族自治旗",
				"150725": "陈巴尔虎旗",
				"150726": "新巴尔虎左旗",
				"150727": "新巴尔虎右旗",
				"150781": "满洲里市",
				"150782": "牙克石市",
				"150783": "扎兰屯市",
				"150784": "额尔古纳市",
				"150785": "根河市"
			}
		},
		"150800": {
			code: "150800",
			name: "巴彦淖尔市",
			districts: {
				"150802": "临河区",
				"150821": "五原县",
				"150822": "磴口县",
				"150823": "乌拉特前旗",
				"150824": "乌拉特中旗",
				"150825": "乌拉特后旗",
				"150826": "杭锦后旗"
			}
		},
		"150900": {
			code: "150900",
			name: "乌兰察布市",
			districts: {
				"150902": "集宁区",
				"150921": "卓资县",
				"150922": "化德县",
				"150923": "商都县",
				"150924": "兴和县",
				"150925": "凉城县",
				"150926": "察哈尔右翼前旗",
				"150927": "察哈尔右翼中旗",
				"150928": "察哈尔右翼后旗",
				"150929": "四子王旗",
				"150981": "丰镇市"
			}
		},
		"152200": {
			code: "152200",
			name: "兴安盟",
			districts: {
				"152201": "乌兰浩特市",
				"152202": "阿尔山市",
				"152221": "科尔沁右翼前旗",
				"152222": "科尔沁右翼中旗",
				"152223": "扎赉特旗",
				"152224": "突泉县"
			}
		},
		"152500": {
			code: "152500",
			name: "锡林郭勒盟",
			districts: {
				"152501": "二连浩特市",
				"152502": "锡林浩特市",
				"152522": "阿巴嘎旗",
				"152523": "苏尼特左旗",
				"152524": "苏尼特右旗",
				"152525": "东乌珠穆沁旗",
				"152526": "西乌珠穆沁旗",
				"152527": "太仆寺旗",
				"152528": "镶黄旗",
				"152529": "正镶白旗",
				"152530": "正蓝旗",
				"152531": "多伦县"
			}
		},
		"152900": {
			code: "152900",
			name: "阿拉善盟",
			districts: {
				"152921": "阿拉善左旗",
				"152922": "阿拉善右旗",
				"152923": "额济纳旗"
			}
		}
	}
},
	"210000": {
	code: "210000",
	name: "辽宁省",
	cities: {
		"210100": {
			code: "210100",
			name: "沈阳市",
			districts: {
				"210102": "和平区",
				"210103": "沈河区",
				"210104": "大东区",
				"210105": "皇姑区",
				"210106": "铁西区",
				"210111": "苏家屯区",
				"210112": "浑南区",
				"210113": "沈北新区",
				"210114": "于洪区",
				"210115": "辽中区",
				"210123": "康平县",
				"210124": "法库县",
				"210181": "新民市"
			}
		},
		"210200": {
			code: "210200",
			name: "大连市",
			districts: {
				"210202": "中山区",
				"210203": "西岗区",
				"210204": "沙河口区",
				"210211": "甘井子区",
				"210212": "旅顺口区",
				"210213": "金州区",
				"210214": "普兰店区",
				"210224": "长海县",
				"210281": "瓦房店市",
				"210283": "庄河市"
			}
		},
		"210300": {
			code: "210300",
			name: "鞍山市",
			districts: {
				"210302": "铁东区",
				"210303": "铁西区",
				"210304": "立山区",
				"210311": "千山区",
				"210321": "台安县",
				"210323": "岫岩满族自治县",
				"210381": "海城市"
			}
		},
		"210400": {
			code: "210400",
			name: "抚顺市",
			districts: {
				"210402": "新抚区",
				"210403": "东洲区",
				"210404": "望花区",
				"210411": "顺城区",
				"210421": "抚顺县",
				"210422": "新宾满族自治县",
				"210423": "清原满族自治县"
			}
		},
		"210500": {
			code: "210500",
			name: "本溪市",
			districts: {
				"210502": "平山区",
				"210503": "溪湖区",
				"210504": "明山区",
				"210505": "南芬区",
				"210521": "本溪满族自治县",
				"210522": "桓仁满族自治县"
			}
		},
		"210600": {
			code: "210600",
			name: "丹东市",
			districts: {
				"210602": "元宝区",
				"210603": "振兴区",
				"210604": "振安区",
				"210624": "宽甸满族自治县",
				"210681": "东港市",
				"210682": "凤城市"
			}
		},
		"210700": {
			code: "210700",
			name: "锦州市",
			districts: {
				"210702": "古塔区",
				"210703": "凌河区",
				"210711": "太和区",
				"210726": "黑山县",
				"210727": "义县",
				"210781": "凌海市",
				"210782": "北镇市"
			}
		},
		"210800": {
			code: "210800",
			name: "营口市",
			districts: {
				"210802": "站前区",
				"210803": "西市区",
				"210804": "鲅鱼圈区",
				"210811": "老边区",
				"210881": "盖州市",
				"210882": "大石桥市"
			}
		},
		"210900": {
			code: "210900",
			name: "阜新市",
			districts: {
				"210902": "海州区",
				"210903": "新邱区",
				"210904": "太平区",
				"210905": "清河门区",
				"210911": "细河区",
				"210921": "阜新蒙古族自治县",
				"210922": "彰武县"
			}
		},
		"211000": {
			code: "211000",
			name: "辽阳市",
			districts: {
				"211002": "白塔区",
				"211003": "文圣区",
				"211004": "宏伟区",
				"211005": "弓长岭区",
				"211011": "太子河区",
				"211021": "辽阳县",
				"211081": "灯塔市"
			}
		},
		"211100": {
			code: "211100",
			name: "盘锦市",
			districts: {
				"211102": "双台子区",
				"211103": "兴隆台区",
				"211104": "大洼区",
				"211122": "盘山县"
			}
		},
		"211200": {
			code: "211200",
			name: "铁岭市",
			districts: {
				"211202": "银州区",
				"211204": "清河区",
				"211221": "铁岭县",
				"211223": "西丰县",
				"211224": "昌图县",
				"211281": "调兵山市",
				"211282": "开原市"
			}
		},
		"211300": {
			code: "211300",
			name: "朝阳市",
			districts: {
				"211302": "双塔区",
				"211303": "龙城区",
				"211321": "朝阳县",
				"211322": "建平县",
				"211324": "喀喇沁左翼蒙古族自治县",
				"211381": "北票市",
				"211382": "凌源市"
			}
		},
		"211400": {
			code: "211400",
			name: "葫芦岛市",
			districts: {
				"211402": "连山区",
				"211403": "龙港区",
				"211404": "南票区",
				"211421": "绥中县",
				"211422": "建昌县",
				"211481": "兴城市"
			}
		}
	}
},
	"220000": {
	code: "220000",
	name: "吉林省",
	cities: {
		"220100": {
			code: "220100",
			name: "长春市",
			districts: {
				"220102": "南关区",
				"220103": "宽城区",
				"220104": "朝阳区",
				"220105": "二道区",
				"220106": "绿园区",
				"220112": "双阳区",
				"220113": "九台区",
				"220122": "农安县",
				"220182": "榆树市",
				"220183": "德惠市"
			}
		},
		"220200": {
			code: "220200",
			name: "吉林市",
			districts: {
				"220202": "昌邑区",
				"220203": "龙潭区",
				"220204": "船营区",
				"220211": "丰满区",
				"220221": "永吉县",
				"220281": "蛟河市",
				"220282": "桦甸市",
				"220283": "舒兰市",
				"220284": "磐石市"
			}
		},
		"220300": {
			code: "220300",
			name: "四平市",
			districts: {
				"220302": "铁西区",
				"220303": "铁东区",
				"220322": "梨树县",
				"220323": "伊通满族自治县",
				"220381": "公主岭市",
				"220382": "双辽市"
			}
		},
		"220400": {
			code: "220400",
			name: "辽源市",
			districts: {
				"220402": "龙山区",
				"220403": "西安区",
				"220421": "东丰县",
				"220422": "东辽县"
			}
		},
		"220500": {
			code: "220500",
			name: "通化市",
			districts: {
				"220502": "东昌区",
				"220503": "二道江区",
				"220521": "通化县",
				"220523": "辉南县",
				"220524": "柳河县",
				"220581": "梅河口市",
				"220582": "集安市"
			}
		},
		"220600": {
			code: "220600",
			name: "白山市",
			districts: {
				"220602": "浑江区",
				"220605": "江源区",
				"220621": "抚松县",
				"220622": "靖宇县",
				"220623": "长白朝鲜族自治县",
				"220681": "临江市"
			}
		},
		"220700": {
			code: "220700",
			name: "松原市",
			districts: {
				"220702": "宁江区",
				"220721": "前郭尔罗斯蒙古族自治县",
				"220722": "长岭县",
				"220723": "乾安县",
				"220781": "扶余市"
			}
		},
		"220800": {
			code: "220800",
			name: "白城市",
			districts: {
				"220802": "洮北区",
				"220821": "镇赉县",
				"220822": "通榆县",
				"220881": "洮南市",
				"220882": "大安市"
			}
		},
		"222400": {
			code: "222400",
			name: "延边朝鲜族自治州",
			districts: {
				"222401": "延吉市",
				"222402": "图们市",
				"222403": "敦化市",
				"222404": "珲春市",
				"222405": "龙井市",
				"222406": "和龙市",
				"222424": "汪清县",
				"222426": "安图县"
			}
		}
	}
},
	"230000": {
	code: "230000",
	name: "黑龙江省",
	cities: {
		"230100": {
			code: "230100",
			name: "哈尔滨市",
			districts: {
				"230102": "道里区",
				"230103": "南岗区",
				"230104": "道外区",
				"230108": "平房区",
				"230109": "松北区",
				"230110": "香坊区",
				"230111": "呼兰区",
				"230112": "阿城区",
				"230113": "双城区",
				"230123": "依兰县",
				"230124": "方正县",
				"230125": "宾县",
				"230126": "巴彦县",
				"230127": "木兰县",
				"230128": "通河县",
				"230129": "延寿县",
				"230183": "尚志市",
				"230184": "五常市"
			}
		},
		"230200": {
			code: "230200",
			name: "齐齐哈尔市",
			districts: {
				"230202": "龙沙区",
				"230203": "建华区",
				"230204": "铁锋区",
				"230205": "昂昂溪区",
				"230206": "富拉尔基区",
				"230207": "碾子山区",
				"230208": "梅里斯达斡尔族区",
				"230221": "龙江县",
				"230223": "依安县",
				"230224": "泰来县",
				"230225": "甘南县",
				"230227": "富裕县",
				"230229": "克山县",
				"230230": "克东县",
				"230231": "拜泉县",
				"230281": "讷河市"
			}
		},
		"230300": {
			code: "230300",
			name: "鸡西市",
			districts: {
				"230302": "鸡冠区",
				"230303": "恒山区",
				"230304": "滴道区",
				"230305": "梨树区",
				"230306": "城子河区",
				"230307": "麻山区",
				"230321": "鸡东县",
				"230381": "虎林市",
				"230382": "密山市"
			}
		},
		"230400": {
			code: "230400",
			name: "鹤岗市",
			districts: {
				"230402": "向阳区",
				"230403": "工农区",
				"230404": "南山区",
				"230405": "兴安区",
				"230406": "东山区",
				"230407": "兴山区",
				"230421": "萝北县",
				"230422": "绥滨县"
			}
		},
		"230500": {
			code: "230500",
			name: "双鸭山市",
			districts: {
				"230502": "尖山区",
				"230503": "岭东区",
				"230505": "四方台区",
				"230506": "宝山区",
				"230521": "集贤县",
				"230522": "友谊县",
				"230523": "宝清县",
				"230524": "饶河县"
			}
		},
		"230600": {
			code: "230600",
			name: "大庆市",
			districts: {
				"230602": "萨尔图区",
				"230603": "龙凤区",
				"230604": "让胡路区",
				"230605": "红岗区",
				"230606": "大同区",
				"230621": "肇州县",
				"230622": "肇源县",
				"230623": "林甸县",
				"230624": "杜尔伯特蒙古族自治县"
			}
		},
		"230700": {
			code: "230700",
			name: "伊春市",
			districts: {
				"230702": "伊春区",
				"230703": "南岔区",
				"230704": "友好区",
				"230705": "西林区",
				"230706": "翠峦区",
				"230707": "新青区",
				"230708": "美溪区",
				"230709": "金山屯区",
				"230710": "五营区",
				"230711": "乌马河区",
				"230712": "汤旺河区",
				"230713": "带岭区",
				"230714": "乌伊岭区",
				"230715": "红星区",
				"230716": "上甘岭区",
				"230722": "嘉荫县",
				"230781": "铁力市"
			}
		},
		"230800": {
			code: "230800",
			name: "佳木斯市",
			districts: {
				"230803": "向阳区",
				"230804": "前进区",
				"230805": "东风区",
				"230811": "郊区",
				"230822": "桦南县",
				"230826": "桦川县",
				"230828": "汤原县",
				"230881": "同江市",
				"230882": "富锦市",
				"230883": "抚远市"
			}
		},
		"230900": {
			code: "230900",
			name: "七台河市",
			districts: {
				"230902": "新兴区",
				"230903": "桃山区",
				"230904": "茄子河区",
				"230921": "勃利县"
			}
		},
		"231000": {
			code: "231000",
			name: "牡丹江市",
			districts: {
				"231002": "东安区",
				"231003": "阳明区",
				"231004": "爱民区",
				"231005": "西安区",
				"231025": "林口县",
				"231081": "绥芬河市",
				"231083": "海林市",
				"231084": "宁安市",
				"231085": "穆棱市",
				"231086": "东宁市"
			}
		},
		"231100": {
			code: "231100",
			name: "黑河市",
			districts: {
				"231102": "爱辉区",
				"231121": "嫩江县",
				"231123": "逊克县",
				"231124": "孙吴县",
				"231181": "北安市",
				"231182": "五大连池市"
			}
		},
		"231200": {
			code: "231200",
			name: "绥化市",
			districts: {
				"231202": "北林区",
				"231221": "望奎县",
				"231222": "兰西县",
				"231223": "青冈县",
				"231224": "庆安县",
				"231225": "明水县",
				"231226": "绥棱县",
				"231281": "安达市",
				"231282": "肇东市",
				"231283": "海伦市"
			}
		},
		"232700": {
			code: "232700",
			name: "大兴安岭地区",
			districts: {
				"232701": "漠河市",
				"232721": "呼玛县",
				"232722": "塔河县"
			}
		}
	}
},
	"310000": {
	code: "310000",
	name: "上海市",
	cities: {
		"310000": {
			code: "310000",
			name: "上海市",
			districts: {
				"310101": "黄浦区",
				"310104": "徐汇区",
				"310105": "长宁区",
				"310106": "静安区",
				"310107": "普陀区",
				"310109": "虹口区",
				"310110": "杨浦区",
				"310112": "闵行区",
				"310113": "宝山区",
				"310114": "嘉定区",
				"310115": "浦东新区",
				"310116": "金山区",
				"310117": "松江区",
				"310118": "青浦区",
				"310120": "奉贤区",
				"310151": "崇明区"
			}
		}
	}
},
	"320000": {
	code: "320000",
	name: "江苏省",
	cities: {
		"320100": {
			code: "320100",
			name: "南京市",
			districts: {
				"320102": "玄武区",
				"320104": "秦淮区",
				"320105": "建邺区",
				"320106": "鼓楼区",
				"320111": "浦口区",
				"320113": "栖霞区",
				"320114": "雨花台区",
				"320115": "江宁区",
				"320116": "六合区",
				"320117": "溧水区",
				"320118": "高淳区"
			}
		},
		"320200": {
			code: "320200",
			name: "无锡市",
			districts: {
				"320205": "锡山区",
				"320206": "惠山区",
				"320211": "滨湖区",
				"320213": "梁溪区",
				"320214": "新吴区",
				"320281": "江阴市",
				"320282": "宜兴市"
			}
		},
		"320300": {
			code: "320300",
			name: "徐州市",
			districts: {
				"320302": "鼓楼区",
				"320303": "云龙区",
				"320305": "贾汪区",
				"320311": "泉山区",
				"320312": "铜山区",
				"320321": "丰县",
				"320322": "沛县",
				"320324": "睢宁县",
				"320381": "新沂市",
				"320382": "邳州市"
			}
		},
		"320400": {
			code: "320400",
			name: "常州市",
			districts: {
				"320402": "天宁区",
				"320404": "钟楼区",
				"320411": "新北区",
				"320412": "武进区",
				"320413": "金坛区",
				"320481": "溧阳市"
			}
		},
		"320500": {
			code: "320500",
			name: "苏州市",
			districts: {
				"320505": "虎丘区",
				"320506": "吴中区",
				"320507": "相城区",
				"320508": "姑苏区",
				"320509": "吴江区",
				"320581": "常熟市",
				"320582": "张家港市",
				"320583": "昆山市",
				"320585": "太仓市"
			}
		},
		"320600": {
			code: "320600",
			name: "南通市",
			districts: {
				"320602": "崇川区",
				"320611": "港闸区",
				"320612": "通州区",
				"320623": "如东县",
				"320681": "启东市",
				"320682": "如皋市",
				"320684": "海门市",
				"320685": "海安市"
			}
		},
		"320700": {
			code: "320700",
			name: "连云港市",
			districts: {
				"320703": "连云区",
				"320706": "海州区",
				"320707": "赣榆区",
				"320722": "东海县",
				"320723": "灌云县",
				"320724": "灌南县"
			}
		},
		"320800": {
			code: "320800",
			name: "淮安市",
			districts: {
				"320803": "淮安区",
				"320804": "淮阴区",
				"320812": "清江浦区",
				"320813": "洪泽区",
				"320826": "涟水县",
				"320830": "盱眙县",
				"320831": "金湖县"
			}
		},
		"320900": {
			code: "320900",
			name: "盐城市",
			districts: {
				"320902": "亭湖区",
				"320903": "盐都区",
				"320904": "大丰区",
				"320921": "响水县",
				"320922": "滨海县",
				"320923": "阜宁县",
				"320924": "射阳县",
				"320925": "建湖县",
				"320981": "东台市"
			}
		},
		"321000": {
			code: "321000",
			name: "扬州市",
			districts: {
				"321002": "广陵区",
				"321003": "邗江区",
				"321012": "江都区",
				"321023": "宝应县",
				"321081": "仪征市",
				"321084": "高邮市"
			}
		},
		"321100": {
			code: "321100",
			name: "镇江市",
			districts: {
				"321102": "京口区",
				"321111": "润州区",
				"321112": "丹徒区",
				"321181": "丹阳市",
				"321182": "扬中市",
				"321183": "句容市"
			}
		},
		"321200": {
			code: "321200",
			name: "泰州市",
			districts: {
				"321202": "海陵区",
				"321203": "高港区",
				"321204": "姜堰区",
				"321281": "兴化市",
				"321282": "靖江市",
				"321283": "泰兴市"
			}
		},
		"321300": {
			code: "321300",
			name: "宿迁市",
			districts: {
				"321302": "宿城区",
				"321311": "宿豫区",
				"321322": "沭阳县",
				"321323": "泗阳县",
				"321324": "泗洪县"
			}
		}
	}
},
	"330000": {
	code: "330000",
	name: "浙江省",
	cities: {
		"330100": {
			code: "330100",
			name: "杭州市",
			districts: {
				"330102": "上城区",
				"330103": "下城区",
				"330104": "江干区",
				"330105": "拱墅区",
				"330106": "西湖区",
				"330108": "滨江区",
				"330109": "萧山区",
				"330110": "余杭区",
				"330111": "富阳区",
				"330112": "临安区",
				"330122": "桐庐县",
				"330127": "淳安县",
				"330182": "建德市"
			}
		},
		"330200": {
			code: "330200",
			name: "宁波市",
			districts: {
				"330203": "海曙区",
				"330205": "江北区",
				"330206": "北仑区",
				"330211": "镇海区",
				"330212": "鄞州区",
				"330213": "奉化区",
				"330225": "象山县",
				"330226": "宁海县",
				"330281": "余姚市",
				"330282": "慈溪市"
			}
		},
		"330300": {
			code: "330300",
			name: "温州市",
			districts: {
				"330302": "鹿城区",
				"330303": "龙湾区",
				"330304": "瓯海区",
				"330305": "洞头区",
				"330324": "永嘉县",
				"330326": "平阳县",
				"330327": "苍南县",
				"330328": "文成县",
				"330329": "泰顺县",
				"330381": "瑞安市",
				"330382": "乐清市"
			}
		},
		"330400": {
			code: "330400",
			name: "嘉兴市",
			districts: {
				"330402": "南湖区",
				"330411": "秀洲区",
				"330421": "嘉善县",
				"330424": "海盐县",
				"330481": "海宁市",
				"330482": "平湖市",
				"330483": "桐乡市"
			}
		},
		"330500": {
			code: "330500",
			name: "湖州市",
			districts: {
				"330502": "吴兴区",
				"330503": "南浔区",
				"330521": "德清县",
				"330522": "长兴县",
				"330523": "安吉县"
			}
		},
		"330600": {
			code: "330600",
			name: "绍兴市",
			districts: {
				"330602": "越城区",
				"330603": "柯桥区",
				"330604": "上虞区",
				"330624": "新昌县",
				"330681": "诸暨市",
				"330683": "嵊州市"
			}
		},
		"330700": {
			code: "330700",
			name: "金华市",
			districts: {
				"330702": "婺城区",
				"330703": "金东区",
				"330723": "武义县",
				"330726": "浦江县",
				"330727": "磐安县",
				"330781": "兰溪市",
				"330782": "义乌市",
				"330783": "东阳市",
				"330784": "永康市"
			}
		},
		"330800": {
			code: "330800",
			name: "衢州市",
			districts: {
				"330802": "柯城区",
				"330803": "衢江区",
				"330822": "常山县",
				"330824": "开化县",
				"330825": "龙游县",
				"330881": "江山市"
			}
		},
		"330900": {
			code: "330900",
			name: "舟山市",
			districts: {
				"330902": "定海区",
				"330903": "普陀区",
				"330921": "岱山县",
				"330922": "嵊泗县"
			}
		},
		"331000": {
			code: "331000",
			name: "台州市",
			districts: {
				"331002": "椒江区",
				"331003": "黄岩区",
				"331004": "路桥区",
				"331022": "三门县",
				"331023": "天台县",
				"331024": "仙居县",
				"331081": "温岭市",
				"331082": "临海市",
				"331083": "玉环市"
			}
		},
		"331100": {
			code: "331100",
			name: "丽水市",
			districts: {
				"331102": "莲都区",
				"331121": "青田县",
				"331122": "缙云县",
				"331123": "遂昌县",
				"331124": "松阳县",
				"331125": "云和县",
				"331126": "庆元县",
				"331127": "景宁畲族自治县",
				"331181": "龙泉市"
			}
		}
	}
},
	"340000": {
	code: "340000",
	name: "安徽省",
	cities: {
		"340100": {
			code: "340100",
			name: "合肥市",
			districts: {
				"340102": "瑶海区",
				"340103": "庐阳区",
				"340104": "蜀山区",
				"340111": "包河区",
				"340121": "长丰县",
				"340122": "肥东县",
				"340123": "肥西县",
				"340124": "庐江县",
				"340181": "巢湖市"
			}
		},
		"340200": {
			code: "340200",
			name: "芜湖市",
			districts: {
				"340202": "镜湖区",
				"340203": "弋江区",
				"340207": "鸠江区",
				"340208": "三山区",
				"340221": "芜湖县",
				"340222": "繁昌县",
				"340223": "南陵县",
				"340225": "无为县"
			}
		},
		"340300": {
			code: "340300",
			name: "蚌埠市",
			districts: {
				"340302": "龙子湖区",
				"340303": "蚌山区",
				"340304": "禹会区",
				"340311": "淮上区",
				"340321": "怀远县",
				"340322": "五河县",
				"340323": "固镇县"
			}
		},
		"340400": {
			code: "340400",
			name: "淮南市",
			districts: {
				"340402": "大通区",
				"340403": "田家庵区",
				"340404": "谢家集区",
				"340405": "八公山区",
				"340406": "潘集区",
				"340421": "凤台县",
				"340422": "寿县"
			}
		},
		"340500": {
			code: "340500",
			name: "马鞍山市",
			districts: {
				"340503": "花山区",
				"340504": "雨山区",
				"340506": "博望区",
				"340521": "当涂县",
				"340522": "含山县",
				"340523": "和县"
			}
		},
		"340600": {
			code: "340600",
			name: "淮北市",
			districts: {
				"340602": "杜集区",
				"340603": "相山区",
				"340604": "烈山区",
				"340621": "濉溪县"
			}
		},
		"340700": {
			code: "340700",
			name: "铜陵市",
			districts: {
				"340705": "铜官区",
				"340706": "义安区",
				"340711": "郊区",
				"340722": "枞阳县"
			}
		},
		"340800": {
			code: "340800",
			name: "安庆市",
			districts: {
				"340802": "迎江区",
				"340803": "大观区",
				"340811": "宜秀区",
				"340822": "怀宁县",
				"340825": "太湖县",
				"340826": "宿松县",
				"340827": "望江县",
				"340828": "岳西县",
				"340881": "桐城市",
				"340882": "潜山市"
			}
		},
		"341000": {
			code: "341000",
			name: "黄山市",
			districts: {
				"341002": "屯溪区",
				"341003": "黄山区",
				"341004": "徽州区",
				"341021": "歙县",
				"341022": "休宁县",
				"341023": "黟县",
				"341024": "祁门县"
			}
		},
		"341100": {
			code: "341100",
			name: "滁州市",
			districts: {
				"341102": "琅琊区",
				"341103": "南谯区",
				"341122": "来安县",
				"341124": "全椒县",
				"341125": "定远县",
				"341126": "凤阳县",
				"341181": "天长市",
				"341182": "明光市"
			}
		},
		"341200": {
			code: "341200",
			name: "阜阳市",
			districts: {
				"341202": "颍州区",
				"341203": "颍东区",
				"341204": "颍泉区",
				"341221": "临泉县",
				"341222": "太和县",
				"341225": "阜南县",
				"341226": "颍上县",
				"341282": "界首市"
			}
		},
		"341300": {
			code: "341300",
			name: "宿州市",
			districts: {
				"341302": "埇桥区",
				"341321": "砀山县",
				"341322": "萧县",
				"341323": "灵璧县",
				"341324": "泗县"
			}
		},
		"341500": {
			code: "341500",
			name: "六安市",
			districts: {
				"341502": "金安区",
				"341503": "裕安区",
				"341504": "叶集区",
				"341522": "霍邱县",
				"341523": "舒城县",
				"341524": "金寨县",
				"341525": "霍山县"
			}
		},
		"341600": {
			code: "341600",
			name: "亳州市",
			districts: {
				"341602": "谯城区",
				"341621": "涡阳县",
				"341622": "蒙城县",
				"341623": "利辛县"
			}
		},
		"341700": {
			code: "341700",
			name: "池州市",
			districts: {
				"341702": "贵池区",
				"341721": "东至县",
				"341722": "石台县",
				"341723": "青阳县"
			}
		},
		"341800": {
			code: "341800",
			name: "宣城市",
			districts: {
				"341802": "宣州区",
				"341821": "郎溪县",
				"341822": "广德县",
				"341823": "泾县",
				"341824": "绩溪县",
				"341825": "旌德县",
				"341881": "宁国市"
			}
		}
	}
},
	"350000": {
	code: "350000",
	name: "福建省",
	cities: {
		"350100": {
			code: "350100",
			name: "福州市",
			districts: {
				"350102": "鼓楼区",
				"350103": "台江区",
				"350104": "仓山区",
				"350105": "马尾区",
				"350111": "晋安区",
				"350112": "长乐区",
				"350121": "闽侯县",
				"350122": "连江县",
				"350123": "罗源县",
				"350124": "闽清县",
				"350125": "永泰县",
				"350128": "平潭县",
				"350181": "福清市"
			}
		},
		"350200": {
			code: "350200",
			name: "厦门市",
			districts: {
				"350203": "思明区",
				"350205": "海沧区",
				"350206": "湖里区",
				"350211": "集美区",
				"350212": "同安区",
				"350213": "翔安区"
			}
		},
		"350300": {
			code: "350300",
			name: "莆田市",
			districts: {
				"350302": "城厢区",
				"350303": "涵江区",
				"350304": "荔城区",
				"350305": "秀屿区",
				"350322": "仙游县"
			}
		},
		"350400": {
			code: "350400",
			name: "三明市",
			districts: {
				"350402": "梅列区",
				"350403": "三元区",
				"350421": "明溪县",
				"350423": "清流县",
				"350424": "宁化县",
				"350425": "大田县",
				"350426": "尤溪县",
				"350427": "沙县",
				"350428": "将乐县",
				"350429": "泰宁县",
				"350430": "建宁县",
				"350481": "永安市"
			}
		},
		"350500": {
			code: "350500",
			name: "泉州市",
			districts: {
				"350502": "鲤城区",
				"350503": "丰泽区",
				"350504": "洛江区",
				"350505": "泉港区",
				"350521": "惠安县",
				"350524": "安溪县",
				"350525": "永春县",
				"350526": "德化县",
				"350527": "金门县",
				"350581": "石狮市",
				"350582": "晋江市",
				"350583": "南安市"
			}
		},
		"350600": {
			code: "350600",
			name: "漳州市",
			districts: {
				"350602": "芗城区",
				"350603": "龙文区",
				"350622": "云霄县",
				"350623": "漳浦县",
				"350624": "诏安县",
				"350625": "长泰县",
				"350626": "东山县",
				"350627": "南靖县",
				"350628": "平和县",
				"350629": "华安县",
				"350681": "龙海市"
			}
		},
		"350700": {
			code: "350700",
			name: "南平市",
			districts: {
				"350702": "延平区",
				"350703": "建阳区",
				"350721": "顺昌县",
				"350722": "浦城县",
				"350723": "光泽县",
				"350724": "松溪县",
				"350725": "政和县",
				"350781": "邵武市",
				"350782": "武夷山市",
				"350783": "建瓯市"
			}
		},
		"350800": {
			code: "350800",
			name: "龙岩市",
			districts: {
				"350802": "新罗区",
				"350803": "永定区",
				"350821": "长汀县",
				"350823": "上杭县",
				"350824": "武平县",
				"350825": "连城县",
				"350881": "漳平市"
			}
		},
		"350900": {
			code: "350900",
			name: "宁德市",
			districts: {
				"350902": "蕉城区",
				"350921": "霞浦县",
				"350922": "古田县",
				"350923": "屏南县",
				"350924": "寿宁县",
				"350925": "周宁县",
				"350926": "柘荣县",
				"350981": "福安市",
				"350982": "福鼎市"
			}
		}
	}
},
	"360000": {
	code: "360000",
	name: "江西省",
	cities: {
		"360100": {
			code: "360100",
			name: "南昌市",
			districts: {
				"360102": "东湖区",
				"360103": "西湖区",
				"360104": "青云谱区",
				"360105": "湾里区",
				"360111": "青山湖区",
				"360112": "新建区",
				"360121": "南昌县",
				"360123": "安义县",
				"360124": "进贤县"
			}
		},
		"360200": {
			code: "360200",
			name: "景德镇市",
			districts: {
				"360202": "昌江区",
				"360203": "珠山区",
				"360222": "浮梁县",
				"360281": "乐平市"
			}
		},
		"360300": {
			code: "360300",
			name: "萍乡市",
			districts: {
				"360302": "安源区",
				"360313": "湘东区",
				"360321": "莲花县",
				"360322": "上栗县",
				"360323": "芦溪县"
			}
		},
		"360400": {
			code: "360400",
			name: "九江市",
			districts: {
				"360402": "濂溪区",
				"360403": "浔阳区",
				"360404": "柴桑区",
				"360423": "武宁县",
				"360424": "修水县",
				"360425": "永修县",
				"360426": "德安县",
				"360428": "都昌县",
				"360429": "湖口县",
				"360430": "彭泽县",
				"360481": "瑞昌市",
				"360482": "共青城市",
				"360483": "庐山市"
			}
		},
		"360500": {
			code: "360500",
			name: "新余市",
			districts: {
				"360502": "渝水区",
				"360521": "分宜县"
			}
		},
		"360600": {
			code: "360600",
			name: "鹰潭市",
			districts: {
				"360602": "月湖区",
				"360603": "余江区",
				"360681": "贵溪市"
			}
		},
		"360700": {
			code: "360700",
			name: "赣州市",
			districts: {
				"360702": "章贡区",
				"360703": "南康区",
				"360704": "赣县区",
				"360722": "信丰县",
				"360723": "大余县",
				"360724": "上犹县",
				"360725": "崇义县",
				"360726": "安远县",
				"360727": "龙南县",
				"360728": "定南县",
				"360729": "全南县",
				"360730": "宁都县",
				"360731": "于都县",
				"360732": "兴国县",
				"360733": "会昌县",
				"360734": "寻乌县",
				"360735": "石城县",
				"360781": "瑞金市"
			}
		},
		"360800": {
			code: "360800",
			name: "吉安市",
			districts: {
				"360802": "吉州区",
				"360803": "青原区",
				"360821": "吉安县",
				"360822": "吉水县",
				"360823": "峡江县",
				"360824": "新干县",
				"360825": "永丰县",
				"360826": "泰和县",
				"360827": "遂川县",
				"360828": "万安县",
				"360829": "安福县",
				"360830": "永新县",
				"360881": "井冈山市"
			}
		},
		"360900": {
			code: "360900",
			name: "宜春市",
			districts: {
				"360902": "袁州区",
				"360921": "奉新县",
				"360922": "万载县",
				"360923": "上高县",
				"360924": "宜丰县",
				"360925": "靖安县",
				"360926": "铜鼓县",
				"360981": "丰城市",
				"360982": "樟树市",
				"360983": "高安市"
			}
		},
		"361000": {
			code: "361000",
			name: "抚州市",
			districts: {
				"361002": "临川区",
				"361003": "东乡区",
				"361021": "南城县",
				"361022": "黎川县",
				"361023": "南丰县",
				"361024": "崇仁县",
				"361025": "乐安县",
				"361026": "宜黄县",
				"361027": "金溪县",
				"361028": "资溪县",
				"361030": "广昌县"
			}
		},
		"361100": {
			code: "361100",
			name: "上饶市",
			districts: {
				"361102": "信州区",
				"361103": "广丰区",
				"361121": "上饶县",
				"361123": "玉山县",
				"361124": "铅山县",
				"361125": "横峰县",
				"361126": "弋阳县",
				"361127": "余干县",
				"361128": "鄱阳县",
				"361129": "万年县",
				"361130": "婺源县",
				"361181": "德兴市"
			}
		}
	}
},
	"370000": {
	code: "370000",
	name: "山东省",
	cities: {
		"370100": {
			code: "370100",
			name: "济南市",
			districts: {
				"370102": "历下区",
				"370103": "市中区",
				"370104": "槐荫区",
				"370105": "天桥区",
				"370112": "历城区",
				"370113": "长清区",
				"370114": "章丘区",
				"370115": "济阳区",
				"370116": "莱芜区",
				"370117": "钢城区",
				"370124": "平阴县",
				"370126": "商河县"
			}
		},
		"370200": {
			code: "370200",
			name: "青岛市",
			districts: {
				"370202": "市南区",
				"370203": "市北区",
				"370211": "黄岛区",
				"370212": "崂山区",
				"370213": "李沧区",
				"370214": "城阳区",
				"370215": "即墨区",
				"370281": "胶州市",
				"370283": "平度市",
				"370285": "莱西市"
			}
		},
		"370300": {
			code: "370300",
			name: "淄博市",
			districts: {
				"370302": "淄川区",
				"370303": "张店区",
				"370304": "博山区",
				"370305": "临淄区",
				"370306": "周村区",
				"370321": "桓台县",
				"370322": "高青县",
				"370323": "沂源县"
			}
		},
		"370400": {
			code: "370400",
			name: "枣庄市",
			districts: {
				"370402": "市中区",
				"370403": "薛城区",
				"370404": "峄城区",
				"370405": "台儿庄区",
				"370406": "山亭区",
				"370481": "滕州市"
			}
		},
		"370500": {
			code: "370500",
			name: "东营市",
			districts: {
				"370502": "东营区",
				"370503": "河口区",
				"370505": "垦利区",
				"370522": "利津县",
				"370523": "广饶县"
			}
		},
		"370600": {
			code: "370600",
			name: "烟台市",
			districts: {
				"370602": "芝罘区",
				"370611": "福山区",
				"370612": "牟平区",
				"370613": "莱山区",
				"370614": "蓬莱区",
				"370681": "龙口市",
				"370682": "莱阳市",
				"370683": "莱州市",
				"370684": "蓬莱市",
				"370685": "招远市",
				"370686": "栖霞市",
				"370687": "海阳市"
			}
		},
		"370700": {
			code: "370700",
			name: "潍坊市",
			districts: {
				"370702": "潍城区",
				"370703": "寒亭区",
				"370704": "坊子区",
				"370705": "奎文区",
				"370724": "临朐县",
				"370725": "昌乐县",
				"370781": "青州市",
				"370782": "诸城市",
				"370783": "寿光市",
				"370784": "安丘市",
				"370785": "高密市",
				"370786": "昌邑市"
			}
		},
		"370800": {
			code: "370800",
			name: "济宁市",
			districts: {
				"370811": "任城区",
				"370812": "兖州区",
				"370826": "微山县",
				"370827": "鱼台县",
				"370828": "金乡县",
				"370829": "嘉祥县",
				"370830": "汶上县",
				"370831": "泗水县",
				"370832": "梁山县",
				"370881": "曲阜市",
				"370883": "邹城市"
			}
		},
		"370900": {
			code: "370900",
			name: "泰安市",
			districts: {
				"370902": "泰山区",
				"370911": "岱岳区",
				"370921": "宁阳县",
				"370923": "东平县",
				"370982": "新泰市",
				"370983": "肥城市"
			}
		},
		"371000": {
			code: "371000",
			name: "威海市",
			districts: {
				"371002": "环翠区",
				"371003": "文登区",
				"371082": "荣成市",
				"371083": "乳山市"
			}
		},
		"371100": {
			code: "371100",
			name: "日照市",
			districts: {
				"371102": "东港区",
				"371103": "岚山区",
				"371121": "五莲县",
				"371122": "莒县"
			}
		},
		"371300": {
			code: "371300",
			name: "临沂市",
			districts: {
				"371302": "兰山区",
				"371311": "罗庄区",
				"371312": "河东区",
				"371321": "沂南县",
				"371322": "郯城县",
				"371323": "沂水县",
				"371324": "兰陵县",
				"371325": "费县",
				"371326": "平邑县",
				"371327": "莒南县",
				"371328": "蒙阴县",
				"371329": "临沭县"
			}
		},
		"371400": {
			code: "371400",
			name: "德州市",
			districts: {
				"371402": "德城区",
				"371403": "陵城区",
				"371422": "宁津县",
				"371423": "庆云县",
				"371424": "临邑县",
				"371425": "齐河县",
				"371426": "平原县",
				"371427": "夏津县",
				"371428": "武城县",
				"371481": "乐陵市",
				"371482": "禹城市"
			}
		},
		"371500": {
			code: "371500",
			name: "聊城市",
			districts: {
				"371502": "东昌府区",
				"371521": "阳谷县",
				"371522": "莘县",
				"371523": "茌平县",
				"371524": "东阿县",
				"371525": "冠县",
				"371526": "高唐县",
				"371581": "临清市"
			}
		},
		"371600": {
			code: "371600",
			name: "滨州市",
			districts: {
				"371602": "滨城区",
				"371603": "沾化区",
				"371621": "惠民县",
				"371622": "阳信县",
				"371623": "无棣县",
				"371625": "博兴县",
				"371681": "邹平市"
			}
		},
		"371700": {
			code: "371700",
			name: "菏泽市",
			districts: {
				"371702": "牡丹区",
				"371703": "定陶区",
				"371721": "曹县",
				"371722": "单县",
				"371723": "成武县",
				"371724": "巨野县",
				"371725": "郓城县",
				"371726": "鄄城县",
				"371728": "东明县"
			}
		}
	}
},
	"410000": {
	code: "410000",
	name: "河南省",
	cities: {
		"410100": {
			code: "410100",
			name: "郑州市",
			districts: {
				"410102": "中原区",
				"410103": "二七区",
				"410104": "管城回族区",
				"410105": "金水区",
				"410106": "上街区",
				"410108": "惠济区",
				"410122": "中牟县",
				"410181": "巩义市",
				"410182": "荥阳市",
				"410183": "新密市",
				"410184": "新郑市",
				"410185": "登封市"
			}
		},
		"410200": {
			code: "410200",
			name: "开封市",
			districts: {
				"410202": "龙亭区",
				"410203": "顺河回族区",
				"410204": "鼓楼区",
				"410205": "禹王台区",
				"410212": "祥符区",
				"410221": "杞县",
				"410222": "通许县",
				"410223": "尉氏县",
				"410225": "兰考县"
			}
		},
		"410300": {
			code: "410300",
			name: "洛阳市",
			districts: {
				"410302": "老城区",
				"410303": "西工区",
				"410304": "瀍河回族区",
				"410305": "涧西区",
				"410306": "吉利区",
				"410311": "洛龙区",
				"410322": "孟津县",
				"410323": "新安县",
				"410324": "栾川县",
				"410325": "嵩县",
				"410326": "汝阳县",
				"410327": "宜阳县",
				"410328": "洛宁县",
				"410329": "伊川县",
				"410381": "偃师市"
			}
		},
		"410400": {
			code: "410400",
			name: "平顶山市",
			districts: {
				"410402": "新华区",
				"410403": "卫东区",
				"410404": "石龙区",
				"410411": "湛河区",
				"410421": "宝丰县",
				"410422": "叶县",
				"410423": "鲁山县",
				"410425": "郏县",
				"410481": "舞钢市",
				"410482": "汝州市"
			}
		},
		"410500": {
			code: "410500",
			name: "安阳市",
			districts: {
				"410502": "文峰区",
				"410503": "北关区",
				"410505": "殷都区",
				"410506": "龙安区",
				"410522": "安阳县",
				"410523": "汤阴县",
				"410526": "滑县",
				"410527": "内黄县",
				"410581": "林州市"
			}
		},
		"410600": {
			code: "410600",
			name: "鹤壁市",
			districts: {
				"410602": "鹤山区",
				"410603": "山城区",
				"410611": "淇滨区",
				"410621": "浚县",
				"410622": "淇县"
			}
		},
		"410700": {
			code: "410700",
			name: "新乡市",
			districts: {
				"410702": "红旗区",
				"410703": "卫滨区",
				"410704": "凤泉区",
				"410711": "牧野区",
				"410721": "新乡县",
				"410724": "获嘉县",
				"410725": "原阳县",
				"410726": "延津县",
				"410727": "封丘县",
				"410728": "长垣县",
				"410781": "卫辉市",
				"410782": "辉县市"
			}
		},
		"410800": {
			code: "410800",
			name: "焦作市",
			districts: {
				"410802": "解放区",
				"410803": "中站区",
				"410804": "马村区",
				"410811": "山阳区",
				"410821": "修武县",
				"410822": "博爱县",
				"410823": "武陟县",
				"410825": "温县",
				"410882": "沁阳市",
				"410883": "孟州市"
			}
		},
		"410900": {
			code: "410900",
			name: "濮阳市",
			districts: {
				"410902": "华龙区",
				"410922": "清丰县",
				"410923": "南乐县",
				"410926": "范县",
				"410927": "台前县",
				"410928": "濮阳县"
			}
		},
		"411000": {
			code: "411000",
			name: "许昌市",
			districts: {
				"411002": "魏都区",
				"411003": "建安区",
				"411024": "鄢陵县",
				"411025": "襄城县",
				"411081": "禹州市",
				"411082": "长葛市"
			}
		},
		"411100": {
			code: "411100",
			name: "漯河市",
			districts: {
				"411102": "源汇区",
				"411103": "郾城区",
				"411104": "召陵区",
				"411121": "舞阳县",
				"411122": "临颍县"
			}
		},
		"411200": {
			code: "411200",
			name: "三门峡市",
			districts: {
				"411202": "湖滨区",
				"411203": "陕州区",
				"411221": "渑池县",
				"411224": "卢氏县",
				"411281": "义马市",
				"411282": "灵宝市"
			}
		},
		"411300": {
			code: "411300",
			name: "南阳市",
			districts: {
				"411302": "宛城区",
				"411303": "卧龙区",
				"411321": "南召县",
				"411322": "方城县",
				"411323": "西峡县",
				"411324": "镇平县",
				"411325": "内乡县",
				"411326": "淅川县",
				"411327": "社旗县",
				"411328": "唐河县",
				"411329": "新野县",
				"411330": "桐柏县",
				"411381": "邓州市"
			}
		},
		"411400": {
			code: "411400",
			name: "商丘市",
			districts: {
				"411402": "梁园区",
				"411403": "睢阳区",
				"411421": "民权县",
				"411422": "睢县",
				"411423": "宁陵县",
				"411424": "柘城县",
				"411425": "虞城县",
				"411426": "夏邑县",
				"411481": "永城市"
			}
		},
		"411500": {
			code: "411500",
			name: "信阳市",
			districts: {
				"411502": "浉河区",
				"411503": "平桥区",
				"411521": "罗山县",
				"411522": "光山县",
				"411523": "新县",
				"411524": "商城县",
				"411525": "固始县",
				"411526": "潢川县",
				"411527": "淮滨县",
				"411528": "息县"
			}
		},
		"411600": {
			code: "411600",
			name: "周口市",
			districts: {
				"411602": "川汇区",
				"411621": "扶沟县",
				"411622": "西华县",
				"411623": "商水县",
				"411624": "沈丘县",
				"411625": "郸城县",
				"411626": "淮阳县",
				"411627": "太康县",
				"411628": "鹿邑县",
				"411681": "项城市"
			}
		},
		"411700": {
			code: "411700",
			name: "驻马店市",
			districts: {
				"411702": "驿城区",
				"411721": "西平县",
				"411722": "上蔡县",
				"411723": "平舆县",
				"411724": "正阳县",
				"411725": "确山县",
				"411726": "泌阳县",
				"411727": "汝南县",
				"411728": "遂平县",
				"411729": "新蔡县"
			}
		}
	}
},
	"420000": {
	code: "420000",
	name: "湖北省",
	cities: {
		"420100": {
			code: "420100",
			name: "武汉市",
			districts: {
				"420102": "江岸区",
				"420103": "江汉区",
				"420104": "硚口区",
				"420105": "汉阳区",
				"420106": "武昌区",
				"420107": "青山区",
				"420111": "洪山区",
				"420112": "东西湖区",
				"420113": "汉南区",
				"420114": "蔡甸区",
				"420115": "江夏区",
				"420116": "黄陂区",
				"420117": "新洲区"
			}
		},
		"420200": {
			code: "420200",
			name: "黄石市",
			districts: {
				"420202": "黄石港区",
				"420203": "西塞山区",
				"420204": "下陆区",
				"420205": "铁山区",
				"420222": "阳新县",
				"420281": "大冶市"
			}
		},
		"420300": {
			code: "420300",
			name: "十堰市",
			districts: {
				"420302": "茅箭区",
				"420303": "张湾区",
				"420304": "郧阳区",
				"420322": "郧西县",
				"420323": "竹山县",
				"420324": "竹溪县",
				"420325": "房县",
				"420381": "丹江口市"
			}
		},
		"420500": {
			code: "420500",
			name: "宜昌市",
			districts: {
				"420502": "西陵区",
				"420503": "伍家岗区",
				"420504": "点军区",
				"420505": "猇亭区",
				"420506": "夷陵区",
				"420525": "远安县",
				"420526": "兴山县",
				"420527": "秭归县",
				"420528": "长阳土家族自治县",
				"420529": "五峰土家族自治县",
				"420581": "宜都市",
				"420582": "当阳市",
				"420583": "枝江市"
			}
		},
		"420600": {
			code: "420600",
			name: "襄阳市",
			districts: {
				"420602": "襄城区",
				"420606": "樊城区",
				"420607": "襄州区",
				"420624": "南漳县",
				"420625": "谷城县",
				"420626": "保康县",
				"420682": "老河口市",
				"420683": "枣阳市",
				"420684": "宜城市"
			}
		},
		"420700": {
			code: "420700",
			name: "鄂州市",
			districts: {
				"420702": "梁子湖区",
				"420703": "华容区",
				"420704": "鄂城区"
			}
		},
		"420800": {
			code: "420800",
			name: "荆门市",
			districts: {
				"420802": "东宝区",
				"420804": "掇刀区",
				"420822": "沙洋县",
				"420881": "钟祥市",
				"420882": "京山市"
			}
		},
		"420900": {
			code: "420900",
			name: "孝感市",
			districts: {
				"420902": "孝南区",
				"420921": "孝昌县",
				"420922": "大悟县",
				"420923": "云梦县",
				"420981": "应城市",
				"420982": "安陆市",
				"420984": "汉川市"
			}
		},
		"421000": {
			code: "421000",
			name: "荆州市",
			districts: {
				"421002": "沙市区",
				"421003": "荆州区",
				"421022": "公安县",
				"421023": "监利县",
				"421024": "江陵县",
				"421081": "石首市",
				"421083": "洪湖市",
				"421087": "松滋市"
			}
		},
		"421100": {
			code: "421100",
			name: "黄冈市",
			districts: {
				"421102": "黄州区",
				"421121": "团风县",
				"421122": "红安县",
				"421123": "罗田县",
				"421124": "英山县",
				"421125": "浠水县",
				"421126": "蕲春县",
				"421127": "黄梅县",
				"421181": "麻城市",
				"421182": "武穴市"
			}
		},
		"421200": {
			code: "421200",
			name: "咸宁市",
			districts: {
				"421202": "咸安区",
				"421221": "嘉鱼县",
				"421222": "通城县",
				"421223": "崇阳县",
				"421224": "通山县",
				"421281": "赤壁市"
			}
		},
		"421300": {
			code: "421300",
			name: "随州市",
			districts: {
				"421303": "曾都区",
				"421321": "随县",
				"421381": "广水市"
			}
		},
		"422800": {
			code: "422800",
			name: "恩施土家族苗族自治州",
			districts: {
				"422801": "恩施市",
				"422802": "利川市",
				"422822": "建始县",
				"422823": "巴东县",
				"422825": "宣恩县",
				"422826": "咸丰县",
				"422827": "来凤县",
				"422828": "鹤峰县"
			}
		}
	}
},
	"430000": {
	code: "430000",
	name: "湖南省",
	cities: {
		"430100": {
			code: "430100",
			name: "长沙市",
			districts: {
				"430102": "芙蓉区",
				"430103": "天心区",
				"430104": "岳麓区",
				"430105": "开福区",
				"430111": "雨花区",
				"430112": "望城区",
				"430121": "长沙县",
				"430181": "浏阳市",
				"430182": "宁乡市"
			}
		},
		"430200": {
			code: "430200",
			name: "株洲市",
			districts: {
				"430202": "荷塘区",
				"430203": "芦淞区",
				"430204": "石峰区",
				"430211": "天元区",
				"430212": "渌口区",
				"430223": "攸县",
				"430224": "茶陵县",
				"430225": "炎陵县",
				"430281": "醴陵市"
			}
		},
		"430300": {
			code: "430300",
			name: "湘潭市",
			districts: {
				"430302": "雨湖区",
				"430304": "岳塘区",
				"430321": "湘潭县",
				"430381": "湘乡市",
				"430382": "韶山市"
			}
		},
		"430400": {
			code: "430400",
			name: "衡阳市",
			districts: {
				"430405": "珠晖区",
				"430406": "雁峰区",
				"430407": "石鼓区",
				"430408": "蒸湘区",
				"430412": "南岳区",
				"430421": "衡阳县",
				"430422": "衡南县",
				"430423": "衡山县",
				"430424": "衡东县",
				"430426": "祁东县",
				"430481": "耒阳市",
				"430482": "常宁市"
			}
		},
		"430500": {
			code: "430500",
			name: "邵阳市",
			districts: {
				"430502": "双清区",
				"430503": "大祥区",
				"430511": "北塔区",
				"430521": "邵东县",
				"430522": "新邵县",
				"430523": "邵阳县",
				"430524": "隆回县",
				"430525": "洞口县",
				"430527": "绥宁县",
				"430528": "新宁县",
				"430529": "城步苗族自治县",
				"430581": "武冈市"
			}
		},
		"430600": {
			code: "430600",
			name: "岳阳市",
			districts: {
				"430602": "岳阳楼区",
				"430603": "云溪区",
				"430611": "君山区",
				"430621": "岳阳县",
				"430623": "华容县",
				"430624": "湘阴县",
				"430626": "平江县",
				"430681": "汨罗市",
				"430682": "临湘市"
			}
		},
		"430700": {
			code: "430700",
			name: "常德市",
			districts: {
				"430702": "武陵区",
				"430703": "鼎城区",
				"430721": "安乡县",
				"430722": "汉寿县",
				"430723": "澧县",
				"430724": "临澧县",
				"430725": "桃源县",
				"430726": "石门县",
				"430781": "津市市"
			}
		},
		"430800": {
			code: "430800",
			name: "张家界市",
			districts: {
				"430802": "永定区",
				"430811": "武陵源区",
				"430821": "慈利县",
				"430822": "桑植县"
			}
		},
		"430900": {
			code: "430900",
			name: "益阳市",
			districts: {
				"430902": "资阳区",
				"430903": "赫山区",
				"430921": "南县",
				"430922": "桃江县",
				"430923": "安化县",
				"430981": "沅江市"
			}
		},
		"431000": {
			code: "431000",
			name: "郴州市",
			districts: {
				"431002": "北湖区",
				"431003": "苏仙区",
				"431021": "桂阳县",
				"431022": "宜章县",
				"431023": "永兴县",
				"431024": "嘉禾县",
				"431025": "临武县",
				"431026": "汝城县",
				"431027": "桂东县",
				"431028": "安仁县",
				"431081": "资兴市"
			}
		},
		"431100": {
			code: "431100",
			name: "永州市",
			districts: {
				"431102": "零陵区",
				"431103": "冷水滩区",
				"431121": "祁阳县",
				"431122": "东安县",
				"431123": "双牌县",
				"431124": "道县",
				"431125": "江永县",
				"431126": "宁远县",
				"431127": "蓝山县",
				"431128": "新田县",
				"431129": "江华瑶族自治县"
			}
		},
		"431200": {
			code: "431200",
			name: "怀化市",
			districts: {
				"431202": "鹤城区",
				"431221": "中方县",
				"431222": "沅陵县",
				"431223": "辰溪县",
				"431224": "溆浦县",
				"431225": "会同县",
				"431226": "麻阳苗族自治县",
				"431227": "新晃侗族自治县",
				"431228": "芷江侗族自治县",
				"431229": "靖州苗族侗族自治县",
				"431230": "通道侗族自治县",
				"431281": "洪江市"
			}
		},
		"431300": {
			code: "431300",
			name: "娄底市",
			districts: {
				"431302": "娄星区",
				"431321": "双峰县",
				"431322": "新化县",
				"431381": "冷水江市",
				"431382": "涟源市"
			}
		},
		"433100": {
			code: "433100",
			name: "湘西土家族苗族自治州",
			districts: {
				"433101": "吉首市",
				"433122": "泸溪县",
				"433123": "凤凰县",
				"433124": "花垣县",
				"433125": "保靖县",
				"433126": "古丈县",
				"433127": "永顺县",
				"433130": "龙山县"
			}
		}
	}
},
	"440000": {
	code: "440000",
	name: "广东省",
	cities: {
		"440100": {
			code: "440100",
			name: "广州市",
			districts: {
				"440103": "荔湾区",
				"440104": "越秀区",
				"440105": "海珠区",
				"440106": "天河区",
				"440111": "白云区",
				"440112": "黄埔区",
				"440113": "番禺区",
				"440114": "花都区",
				"440115": "南沙区",
				"440117": "从化区",
				"440118": "增城区"
			}
		},
		"440200": {
			code: "440200",
			name: "韶关市",
			districts: {
				"440203": "武江区",
				"440204": "浈江区",
				"440205": "曲江区",
				"440222": "始兴县",
				"440224": "仁化县",
				"440229": "翁源县",
				"440232": "乳源瑶族自治县",
				"440233": "新丰县",
				"440281": "乐昌市",
				"440282": "南雄市"
			}
		},
		"440300": {
			code: "440300",
			name: "深圳市",
			districts: {
				"440303": "罗湖区",
				"440304": "福田区",
				"440305": "南山区",
				"440306": "宝安区",
				"440307": "龙岗区",
				"440308": "盐田区",
				"440309": "龙华区",
				"440310": "坪山区",
				"440311": "光明区"
			}
		},
		"440400": {
			code: "440400",
			name: "珠海市",
			districts: {
				"440402": "香洲区",
				"440403": "斗门区",
				"440404": "金湾区"
			}
		},
		"440500": {
			code: "440500",
			name: "汕头市",
			districts: {
				"440507": "龙湖区",
				"440511": "金平区",
				"440512": "濠江区",
				"440513": "潮阳区",
				"440514": "潮南区",
				"440515": "澄海区",
				"440523": "南澳县"
			}
		},
		"440600": {
			code: "440600",
			name: "佛山市",
			districts: {
				"440604": "禅城区",
				"440605": "南海区",
				"440606": "顺德区",
				"440607": "三水区",
				"440608": "高明区"
			}
		},
		"440700": {
			code: "440700",
			name: "江门市",
			districts: {
				"440703": "蓬江区",
				"440704": "江海区",
				"440705": "新会区",
				"440781": "台山市",
				"440783": "开平市",
				"440784": "鹤山市",
				"440785": "恩平市"
			}
		},
		"440800": {
			code: "440800",
			name: "湛江市",
			districts: {
				"440802": "赤坎区",
				"440803": "霞山区",
				"440804": "坡头区",
				"440811": "麻章区",
				"440823": "遂溪县",
				"440825": "徐闻县",
				"440881": "廉江市",
				"440882": "雷州市",
				"440883": "吴川市"
			}
		},
		"440900": {
			code: "440900",
			name: "茂名市",
			districts: {
				"440902": "茂南区",
				"440904": "电白区",
				"440981": "高州市",
				"440982": "化州市",
				"440983": "信宜市"
			}
		},
		"441200": {
			code: "441200",
			name: "肇庆市",
			districts: {
				"441202": "端州区",
				"441203": "鼎湖区",
				"441204": "高要区",
				"441223": "广宁县",
				"441224": "怀集县",
				"441225": "封开县",
				"441226": "德庆县",
				"441284": "四会市"
			}
		},
		"441300": {
			code: "441300",
			name: "惠州市",
			districts: {
				"441302": "惠城区",
				"441303": "惠阳区",
				"441322": "博罗县",
				"441323": "惠东县",
				"441324": "龙门县"
			}
		},
		"441400": {
			code: "441400",
			name: "梅州市",
			districts: {
				"441402": "梅江区",
				"441403": "梅县区",
				"441422": "大埔县",
				"441423": "丰顺县",
				"441424": "五华县",
				"441426": "平远县",
				"441427": "蕉岭县",
				"441481": "兴宁市"
			}
		},
		"441500": {
			code: "441500",
			name: "汕尾市",
			districts: {
				"441502": "城区",
				"441521": "海丰县",
				"441523": "陆河县",
				"441581": "陆丰市"
			}
		},
		"441600": {
			code: "441600",
			name: "河源市",
			districts: {
				"441602": "源城区",
				"441621": "紫金县",
				"441622": "龙川县",
				"441623": "连平县",
				"441624": "和平县",
				"441625": "东源县"
			}
		},
		"441700": {
			code: "441700",
			name: "阳江市",
			districts: {
				"441702": "江城区",
				"441704": "阳东区",
				"441721": "阳西县",
				"441781": "阳春市"
			}
		},
		"441800": {
			code: "441800",
			name: "清远市",
			districts: {
				"441802": "清城区",
				"441803": "清新区",
				"441821": "佛冈县",
				"441823": "阳山县",
				"441825": "连山壮族瑶族自治县",
				"441826": "连南瑶族自治县",
				"441881": "英德市",
				"441882": "连州市"
			}
		},
		"441900": {
			code: "441900",
			name: "东莞市",
			districts: {
			}
		},
		"442000": {
			code: "442000",
			name: "中山市",
			districts: {
			}
		},
		"445100": {
			code: "445100",
			name: "潮州市",
			districts: {
				"445102": "湘桥区",
				"445103": "潮安区",
				"445122": "饶平县"
			}
		},
		"445200": {
			code: "445200",
			name: "揭阳市",
			districts: {
				"445202": "榕城区",
				"445203": "揭东区",
				"445222": "揭西县",
				"445224": "惠来县",
				"445281": "普宁市"
			}
		},
		"445300": {
			code: "445300",
			name: "云浮市",
			districts: {
				"445302": "云城区",
				"445303": "云安区",
				"445321": "新兴县",
				"445322": "郁南县",
				"445381": "罗定市"
			}
		}
	}
},
	"450000": {
	code: "450000",
	name: "广西壮族自治区",
	cities: {
		"450100": {
			code: "450100",
			name: "南宁市",
			districts: {
				"450102": "兴宁区",
				"450103": "青秀区",
				"450105": "江南区",
				"450107": "西乡塘区",
				"450108": "良庆区",
				"450109": "邕宁区",
				"450110": "武鸣区",
				"450123": "隆安县",
				"450124": "马山县",
				"450125": "上林县",
				"450126": "宾阳县",
				"450127": "横县"
			}
		},
		"450200": {
			code: "450200",
			name: "柳州市",
			districts: {
				"450202": "城中区",
				"450203": "鱼峰区",
				"450204": "柳南区",
				"450205": "柳北区",
				"450206": "柳江区",
				"450222": "柳城县",
				"450223": "鹿寨县",
				"450224": "融安县",
				"450225": "融水苗族自治县",
				"450226": "三江侗族自治县"
			}
		},
		"450300": {
			code: "450300",
			name: "桂林市",
			districts: {
				"450302": "秀峰区",
				"450303": "叠彩区",
				"450304": "象山区",
				"450305": "七星区",
				"450311": "雁山区",
				"450312": "临桂区",
				"450321": "阳朔县",
				"450323": "灵川县",
				"450324": "全州县",
				"450325": "兴安县",
				"450326": "永福县",
				"450327": "灌阳县",
				"450328": "龙胜各族自治县",
				"450329": "资源县",
				"450330": "平乐县",
				"450332": "恭城瑶族自治县",
				"450381": "荔浦市"
			}
		},
		"450400": {
			code: "450400",
			name: "梧州市",
			districts: {
				"450403": "万秀区",
				"450405": "长洲区",
				"450406": "龙圩区",
				"450421": "苍梧县",
				"450422": "藤县",
				"450423": "蒙山县",
				"450481": "岑溪市"
			}
		},
		"450500": {
			code: "450500",
			name: "北海市",
			districts: {
				"450502": "海城区",
				"450503": "银海区",
				"450512": "铁山港区",
				"450521": "合浦县"
			}
		},
		"450600": {
			code: "450600",
			name: "防城港市",
			districts: {
				"450602": "港口区",
				"450603": "防城区",
				"450621": "上思县",
				"450681": "东兴市"
			}
		},
		"450700": {
			code: "450700",
			name: "钦州市",
			districts: {
				"450702": "钦南区",
				"450703": "钦北区",
				"450721": "灵山县",
				"450722": "浦北县"
			}
		},
		"450800": {
			code: "450800",
			name: "贵港市",
			districts: {
				"450802": "港北区",
				"450803": "港南区",
				"450804": "覃塘区",
				"450821": "平南县",
				"450881": "桂平市"
			}
		},
		"450900": {
			code: "450900",
			name: "玉林市",
			districts: {
				"450902": "玉州区",
				"450903": "福绵区",
				"450921": "容县",
				"450922": "陆川县",
				"450923": "博白县",
				"450924": "兴业县",
				"450981": "北流市"
			}
		},
		"451000": {
			code: "451000",
			name: "百色市",
			districts: {
				"451002": "右江区",
				"451021": "田阳县",
				"451022": "田东县",
				"451023": "平果县",
				"451024": "德保县",
				"451026": "那坡县",
				"451027": "凌云县",
				"451028": "乐业县",
				"451029": "田林县",
				"451030": "西林县",
				"451031": "隆林各族自治县",
				"451081": "靖西市"
			}
		},
		"451100": {
			code: "451100",
			name: "贺州市",
			districts: {
				"451102": "八步区",
				"451103": "平桂区",
				"451121": "昭平县",
				"451122": "钟山县",
				"451123": "富川瑶族自治县"
			}
		},
		"451200": {
			code: "451200",
			name: "河池市",
			districts: {
				"451202": "金城江区",
				"451203": "宜州区",
				"451221": "南丹县",
				"451222": "天峨县",
				"451223": "凤山县",
				"451224": "东兰县",
				"451225": "罗城仫佬族自治县",
				"451226": "环江毛南族自治县",
				"451227": "巴马瑶族自治县",
				"451228": "都安瑶族自治县",
				"451229": "大化瑶族自治县"
			}
		},
		"451300": {
			code: "451300",
			name: "来宾市",
			districts: {
				"451302": "兴宾区",
				"451321": "忻城县",
				"451322": "象州县",
				"451323": "武宣县",
				"451324": "金秀瑶族自治县",
				"451381": "合山市"
			}
		},
		"451400": {
			code: "451400",
			name: "崇左市",
			districts: {
				"451402": "江州区",
				"451421": "扶绥县",
				"451422": "宁明县",
				"451423": "龙州县",
				"451424": "大新县",
				"451425": "天等县",
				"451481": "凭祥市"
			}
		}
	}
},
	"460000": {
	code: "460000",
	name: "海南省",
	cities: {
		"460100": {
			code: "460100",
			name: "海口市",
			districts: {
				"460105": "秀英区",
				"460106": "龙华区",
				"460107": "琼山区",
				"460108": "美兰区"
			}
		},
		"460200": {
			code: "460200",
			name: "三亚市",
			districts: {
				"460202": "海棠区",
				"460203": "吉阳区",
				"460204": "天涯区",
				"460205": "崖州区"
			}
		},
		"460300": {
			code: "460300",
			name: "三沙市",
			districts: {
				"460321": "西沙群岛",
				"460322": "南沙群岛",
				"460323": "中沙群岛的岛礁及其海域",
				"460324": "永乐群岛"
			}
		},
		"460400": {
			code: "460400",
			name: "儋州市",
			districts: {
			}
		}
	}
},
	"500000": {
	code: "500000",
	name: "重庆市",
	cities: {
		"500000": {
			code: "500000",
			name: "重庆市",
			districts: {
				"500101": "万州区",
				"500102": "涪陵区",
				"500103": "渝中区",
				"500104": "大渡口区",
				"500105": "江北区",
				"500106": "沙坪坝区",
				"500107": "九龙坡区",
				"500108": "南岸区",
				"500109": "北碚区",
				"500110": "綦江区",
				"500111": "大足区",
				"500112": "渝北区",
				"500113": "巴南区",
				"500114": "黔江区",
				"500115": "长寿区",
				"500116": "江津区",
				"500117": "合川区",
				"500118": "永川区",
				"500119": "南川区",
				"500120": "璧山区",
				"500151": "铜梁区",
				"500152": "潼南区",
				"500153": "荣昌区",
				"500154": "开州区",
				"500155": "梁平区",
				"500156": "武隆区",
				"500229": "城口县",
				"500230": "丰都县",
				"500231": "垫江县",
				"500233": "忠县",
				"500235": "云阳县",
				"500236": "奉节县",
				"500237": "巫山县",
				"500238": "巫溪县",
				"500240": "石柱土家族自治县",
				"500241": "秀山土家族苗族自治县",
				"500242": "酉阳土家族苗族自治县",
				"500243": "彭水苗族土家族自治县"
			}
		}
	}
},
	"510000": {
	code: "510000",
	name: "四川省",
	cities: {
		"510100": {
			code: "510100",
			name: "成都市",
			districts: {
				"510104": "锦江区",
				"510105": "青羊区",
				"510106": "金牛区",
				"510107": "武侯区",
				"510108": "成华区",
				"510112": "龙泉驿区",
				"510113": "青白江区",
				"510114": "新都区",
				"510115": "温江区",
				"510116": "双流区",
				"510117": "郫都区",
				"510121": "金堂县",
				"510129": "大邑县",
				"510131": "蒲江县",
				"510132": "新津县",
				"510181": "都江堰市",
				"510182": "彭州市",
				"510183": "邛崃市",
				"510184": "崇州市",
				"510185": "简阳市"
			}
		},
		"510300": {
			code: "510300",
			name: "自贡市",
			districts: {
				"510302": "自流井区",
				"510303": "贡井区",
				"510304": "大安区",
				"510311": "沿滩区",
				"510321": "荣县",
				"510322": "富顺县"
			}
		},
		"510400": {
			code: "510400",
			name: "攀枝花市",
			districts: {
				"510402": "东区",
				"510403": "西区",
				"510411": "仁和区",
				"510421": "米易县",
				"510422": "盐边县"
			}
		},
		"510500": {
			code: "510500",
			name: "泸州市",
			districts: {
				"510502": "江阳区",
				"510503": "纳溪区",
				"510504": "龙马潭区",
				"510521": "泸县",
				"510522": "合江县",
				"510524": "叙永县",
				"510525": "古蔺县"
			}
		},
		"510600": {
			code: "510600",
			name: "德阳市",
			districts: {
				"510603": "旌阳区",
				"510604": "罗江区",
				"510623": "中江县",
				"510681": "广汉市",
				"510682": "什邡市",
				"510683": "绵竹市"
			}
		},
		"510700": {
			code: "510700",
			name: "绵阳市",
			districts: {
				"510703": "涪城区",
				"510704": "游仙区",
				"510705": "安州区",
				"510722": "三台县",
				"510723": "盐亭县",
				"510725": "梓潼县",
				"510726": "北川羌族自治县",
				"510727": "平武县",
				"510781": "江油市"
			}
		},
		"510800": {
			code: "510800",
			name: "广元市",
			districts: {
				"510802": "利州区",
				"510811": "昭化区",
				"510812": "朝天区",
				"510821": "旺苍县",
				"510822": "青川县",
				"510823": "剑阁县",
				"510824": "苍溪县"
			}
		},
		"510900": {
			code: "510900",
			name: "遂宁市",
			districts: {
				"510903": "船山区",
				"510904": "安居区",
				"510921": "蓬溪县",
				"510922": "射洪县",
				"510923": "大英县"
			}
		},
		"511000": {
			code: "511000",
			name: "内江市",
			districts: {
				"511002": "市中区",
				"511011": "东兴区",
				"511024": "威远县",
				"511025": "资中县",
				"511083": "隆昌市"
			}
		},
		"511100": {
			code: "511100",
			name: "乐山市",
			districts: {
				"511102": "市中区",
				"511111": "沙湾区",
				"511112": "五通桥区",
				"511113": "金口河区",
				"511123": "犍为县",
				"511124": "井研县",
				"511126": "夹江县",
				"511129": "沐川县",
				"511132": "峨边彝族自治县",
				"511133": "马边彝族自治县",
				"511181": "峨眉山市"
			}
		},
		"511300": {
			code: "511300",
			name: "南充市",
			districts: {
				"511302": "顺庆区",
				"511303": "高坪区",
				"511304": "嘉陵区",
				"511321": "南部县",
				"511322": "营山县",
				"511323": "蓬安县",
				"511324": "仪陇县",
				"511325": "西充县",
				"511381": "阆中市"
			}
		},
		"511400": {
			code: "511400",
			name: "眉山市",
			districts: {
				"511402": "东坡区",
				"511403": "彭山区",
				"511421": "仁寿县",
				"511423": "洪雅县",
				"511424": "丹棱县",
				"511425": "青神县"
			}
		},
		"511500": {
			code: "511500",
			name: "宜宾市",
			districts: {
				"511502": "翠屏区",
				"511503": "南溪区",
				"511504": "叙州区",
				"511523": "江安县",
				"511524": "长宁县",
				"511525": "高县",
				"511526": "珙县",
				"511527": "筠连县",
				"511528": "兴文县",
				"511529": "屏山县"
			}
		},
		"511600": {
			code: "511600",
			name: "广安市",
			districts: {
				"511602": "广安区",
				"511603": "前锋区",
				"511621": "岳池县",
				"511622": "武胜县",
				"511623": "邻水县",
				"511681": "华蓥市"
			}
		},
		"511700": {
			code: "511700",
			name: "达州市",
			districts: {
				"511702": "通川区",
				"511703": "达川区",
				"511722": "宣汉县",
				"511723": "开江县",
				"511724": "大竹县",
				"511725": "渠县",
				"511781": "万源市"
			}
		},
		"511800": {
			code: "511800",
			name: "雅安市",
			districts: {
				"511802": "雨城区",
				"511803": "名山区",
				"511822": "荥经县",
				"511823": "汉源县",
				"511824": "石棉县",
				"511825": "天全县",
				"511826": "芦山县",
				"511827": "宝兴县"
			}
		},
		"511900": {
			code: "511900",
			name: "巴中市",
			districts: {
				"511902": "巴州区",
				"511903": "恩阳区",
				"511921": "通江县",
				"511922": "南江县",
				"511923": "平昌县"
			}
		},
		"512000": {
			code: "512000",
			name: "资阳市",
			districts: {
				"512002": "雁江区",
				"512021": "安岳县",
				"512022": "乐至县"
			}
		},
		"513200": {
			code: "513200",
			name: "阿坝藏族羌族自治州",
			districts: {
				"513201": "马尔康市",
				"513221": "汶川县",
				"513222": "理县",
				"513223": "茂县",
				"513224": "松潘县",
				"513225": "九寨沟县",
				"513226": "金川县",
				"513227": "小金县",
				"513228": "黑水县",
				"513230": "壤塘县",
				"513231": "阿坝县",
				"513232": "若尔盖县",
				"513233": "红原县"
			}
		},
		"513300": {
			code: "513300",
			name: "甘孜藏族自治州",
			districts: {
				"513301": "康定市",
				"513322": "泸定县",
				"513323": "丹巴县",
				"513324": "九龙县",
				"513325": "雅江县",
				"513326": "道孚县",
				"513327": "炉霍县",
				"513328": "甘孜县",
				"513329": "新龙县",
				"513330": "德格县",
				"513331": "白玉县",
				"513332": "石渠县",
				"513333": "色达县",
				"513334": "理塘县",
				"513335": "巴塘县",
				"513336": "乡城县",
				"513337": "稻城县",
				"513338": "得荣县"
			}
		},
		"513400": {
			code: "513400",
			name: "凉山彝族自治州",
			districts: {
				"513401": "西昌市",
				"513422": "木里藏族自治县",
				"513423": "盐源县",
				"513424": "德昌县",
				"513425": "会理县",
				"513426": "会东县",
				"513427": "宁南县",
				"513428": "普格县",
				"513429": "布拖县",
				"513430": "金阳县",
				"513431": "昭觉县",
				"513432": "喜德县",
				"513433": "冕宁县",
				"513434": "越西县",
				"513435": "甘洛县",
				"513436": "美姑县",
				"513437": "雷波县"
			}
		}
	}
},
	"520000": {
	code: "520000",
	name: "贵州省",
	cities: {
		"520100": {
			code: "520100",
			name: "贵阳市",
			districts: {
				"520102": "南明区",
				"520103": "云岩区",
				"520111": "花溪区",
				"520112": "乌当区",
				"520113": "白云区",
				"520115": "观山湖区",
				"520121": "开阳县",
				"520122": "息烽县",
				"520123": "修文县",
				"520181": "清镇市"
			}
		},
		"520200": {
			code: "520200",
			name: "六盘水市",
			districts: {
				"520201": "钟山区",
				"520203": "六枝特区",
				"520221": "水城县",
				"520281": "盘州市"
			}
		},
		"520300": {
			code: "520300",
			name: "遵义市",
			districts: {
				"520302": "红花岗区",
				"520303": "汇川区",
				"520304": "播州区",
				"520322": "桐梓县",
				"520323": "绥阳县",
				"520324": "正安县",
				"520325": "道真仡佬族苗族自治县",
				"520326": "务川仡佬族苗族自治县",
				"520327": "凤冈县",
				"520328": "湄潭县",
				"520329": "余庆县",
				"520330": "习水县",
				"520381": "赤水市",
				"520382": "仁怀市"
			}
		},
		"520400": {
			code: "520400",
			name: "安顺市",
			districts: {
				"520402": "西秀区",
				"520403": "平坝区",
				"520422": "普定县",
				"520423": "镇宁布依族苗族自治县",
				"520424": "关岭布依族苗族自治县",
				"520425": "紫云苗族布依族自治县"
			}
		},
		"520500": {
			code: "520500",
			name: "毕节市",
			districts: {
				"520502": "七星关区",
				"520521": "大方县",
				"520522": "黔西县",
				"520523": "金沙县",
				"520524": "织金县",
				"520525": "纳雍县",
				"520526": "威宁彝族回族苗族自治县",
				"520527": "赫章县"
			}
		},
		"520600": {
			code: "520600",
			name: "铜仁市",
			districts: {
				"520602": "碧江区",
				"520603": "万山区",
				"520621": "江口县",
				"520622": "玉屏侗族自治县",
				"520623": "石阡县",
				"520624": "思南县",
				"520625": "印江土家族苗族自治县",
				"520626": "德江县",
				"520627": "沿河土家族自治县",
				"520628": "松桃苗族自治县"
			}
		},
		"522300": {
			code: "522300",
			name: "黔西南布依族苗族自治州",
			districts: {
				"522301": "兴义市",
				"522302": "兴仁市",
				"522323": "普安县",
				"522324": "晴隆县",
				"522325": "贞丰县",
				"522326": "望谟县",
				"522327": "册亨县",
				"522328": "安龙县"
			}
		},
		"522600": {
			code: "522600",
			name: "黔东南苗族侗族自治州",
			districts: {
				"522601": "凯里市",
				"522622": "黄平县",
				"522623": "施秉县",
				"522624": "三穗县",
				"522625": "镇远县",
				"522626": "岑巩县",
				"522627": "天柱县",
				"522628": "锦屏县",
				"522629": "剑河县",
				"522630": "台江县",
				"522631": "黎平县",
				"522632": "榕江县",
				"522633": "从江县",
				"522634": "雷山县",
				"522635": "麻江县",
				"522636": "丹寨县"
			}
		},
		"522700": {
			code: "522700",
			name: "黔南布依族苗族自治州",
			districts: {
				"522701": "都匀市",
				"522702": "福泉市",
				"522722": "荔波县",
				"522723": "贵定县",
				"522725": "瓮安县",
				"522726": "独山县",
				"522727": "平塘县",
				"522728": "罗甸县",
				"522729": "长顺县",
				"522730": "龙里县",
				"522731": "惠水县",
				"522732": "三都水族自治县"
			}
		}
	}
},
	"530000": {
	code: "530000",
	name: "云南省",
	cities: {
		"530100": {
			code: "530100",
			name: "昆明市",
			districts: {
				"530102": "五华区",
				"530103": "盘龙区",
				"530111": "官渡区",
				"530112": "西山区",
				"530113": "东川区",
				"530114": "呈贡区",
				"530115": "晋宁区",
				"530124": "富民县",
				"530125": "宜良县",
				"530126": "石林彝族自治县",
				"530127": "嵩明县",
				"530128": "禄劝彝族苗族自治县",
				"530129": "寻甸回族彝族自治县",
				"530181": "安宁市"
			}
		},
		"530300": {
			code: "530300",
			name: "曲靖市",
			districts: {
				"530302": "麒麟区",
				"530303": "沾益区",
				"530304": "马龙区",
				"530322": "陆良县",
				"530323": "师宗县",
				"530324": "罗平县",
				"530325": "富源县",
				"530326": "会泽县",
				"530381": "宣威市"
			}
		},
		"530400": {
			code: "530400",
			name: "玉溪市",
			districts: {
				"530402": "红塔区",
				"530403": "江川区",
				"530422": "澄江县",
				"530423": "通海县",
				"530424": "华宁县",
				"530425": "易门县",
				"530426": "峨山彝族自治县",
				"530427": "新平彝族傣族自治县",
				"530428": "元江哈尼族彝族傣族自治县"
			}
		},
		"530500": {
			code: "530500",
			name: "保山市",
			districts: {
				"530502": "隆阳区",
				"530521": "施甸县",
				"530523": "龙陵县",
				"530524": "昌宁县",
				"530581": "腾冲市"
			}
		},
		"530600": {
			code: "530600",
			name: "昭通市",
			districts: {
				"530602": "昭阳区",
				"530621": "鲁甸县",
				"530622": "巧家县",
				"530623": "盐津县",
				"530624": "大关县",
				"530625": "永善县",
				"530626": "绥江县",
				"530627": "镇雄县",
				"530628": "彝良县",
				"530629": "威信县",
				"530681": "水富市"
			}
		},
		"530700": {
			code: "530700",
			name: "丽江市",
			districts: {
				"530702": "古城区",
				"530721": "玉龙纳西族自治县",
				"530722": "永胜县",
				"530723": "华坪县",
				"530724": "宁蒗彝族自治县"
			}
		},
		"530800": {
			code: "530800",
			name: "普洱市",
			districts: {
				"530802": "思茅区",
				"530821": "宁洱哈尼族彝族自治县",
				"530822": "墨江哈尼族自治县",
				"530823": "景东彝族自治县",
				"530824": "景谷傣族彝族自治县",
				"530825": "镇沅彝族哈尼族拉祜族自治县",
				"530826": "江城哈尼族彝族自治县",
				"530827": "孟连傣族拉祜族佤族自治县",
				"530828": "澜沧拉祜族自治县",
				"530829": "西盟佤族自治县"
			}
		},
		"530900": {
			code: "530900",
			name: "临沧市",
			districts: {
				"530902": "临翔区",
				"530921": "凤庆县",
				"530922": "云县",
				"530923": "永德县",
				"530924": "镇康县",
				"530925": "双江拉祜族佤族布朗族傣族自治县",
				"530926": "耿马傣族佤族自治县",
				"530927": "沧源佤族自治县"
			}
		},
		"532300": {
			code: "532300",
			name: "楚雄彝族自治州",
			districts: {
				"532301": "楚雄市",
				"532322": "双柏县",
				"532323": "牟定县",
				"532324": "南华县",
				"532325": "姚安县",
				"532326": "大姚县",
				"532327": "永仁县",
				"532328": "元谋县",
				"532329": "武定县",
				"532331": "禄丰县"
			}
		},
		"532500": {
			code: "532500",
			name: "红河哈尼族彝族自治州",
			districts: {
				"532501": "个旧市",
				"532502": "开远市",
				"532503": "蒙自市",
				"532504": "弥勒市",
				"532523": "屏边苗族自治县",
				"532524": "建水县",
				"532525": "石屏县",
				"532527": "泸西县",
				"532528": "元阳县",
				"532529": "红河县",
				"532530": "金平苗族瑶族傣族自治县",
				"532531": "绿春县",
				"532532": "河口瑶族自治县"
			}
		},
		"532600": {
			code: "532600",
			name: "文山壮族苗族自治州",
			districts: {
				"532601": "文山市",
				"532622": "砚山县",
				"532623": "西畴县",
				"532624": "麻栗坡县",
				"532625": "马关县",
				"532626": "丘北县",
				"532627": "广南县",
				"532628": "富宁县"
			}
		},
		"532800": {
			code: "532800",
			name: "西双版纳傣族自治州",
			districts: {
				"532801": "景洪市",
				"532822": "勐海县",
				"532823": "勐腊县"
			}
		},
		"532900": {
			code: "532900",
			name: "大理白族自治州",
			districts: {
				"532901": "大理市",
				"532922": "漾濞彝族自治县",
				"532923": "祥云县",
				"532924": "宾川县",
				"532925": "弥渡县",
				"532926": "南涧彝族自治县",
				"532927": "巍山彝族回族自治县",
				"532928": "永平县",
				"532929": "云龙县",
				"532930": "洱源县",
				"532931": "剑川县",
				"532932": "鹤庆县"
			}
		},
		"533100": {
			code: "533100",
			name: "德宏傣族景颇族自治州",
			districts: {
				"533102": "瑞丽市",
				"533103": "芒市",
				"533122": "梁河县",
				"533123": "盈江县",
				"533124": "陇川县"
			}
		},
		"533300": {
			code: "533300",
			name: "怒江傈僳族自治州",
			districts: {
				"533301": "泸水市",
				"533323": "福贡县",
				"533324": "贡山独龙族怒族自治县",
				"533325": "兰坪白族普米族自治县"
			}
		},
		"533400": {
			code: "533400",
			name: "迪庆藏族自治州",
			districts: {
				"533401": "香格里拉市",
				"533422": "德钦县",
				"533423": "维西傈僳族自治县"
			}
		}
	}
},
	"540000": {
	code: "540000",
	name: "西藏自治区",
	cities: {
		"540100": {
			code: "540100",
			name: "拉萨市",
			districts: {
				"540102": "城关区",
				"540103": "堆龙德庆区",
				"540104": "达孜区",
				"540121": "林周县",
				"540122": "当雄县",
				"540123": "尼木县",
				"540124": "曲水县",
				"540127": "墨竹工卡县"
			}
		},
		"540200": {
			code: "540200",
			name: "日喀则市",
			districts: {
				"540202": "桑珠孜区",
				"540221": "南木林县",
				"540222": "江孜县",
				"540223": "定日县",
				"540224": "萨迦县",
				"540225": "拉孜县",
				"540226": "昂仁县",
				"540227": "谢通门县",
				"540228": "白朗县",
				"540229": "仁布县",
				"540230": "康马县",
				"540231": "定结县",
				"540232": "仲巴县",
				"540233": "亚东县",
				"540234": "吉隆县",
				"540235": "聂拉木县",
				"540236": "萨嘎县",
				"540237": "岗巴县"
			}
		},
		"540300": {
			code: "540300",
			name: "昌都市",
			districts: {
				"540302": "卡若区",
				"540321": "江达县",
				"540322": "贡觉县",
				"540323": "类乌齐县",
				"540324": "丁青县",
				"540325": "察雅县",
				"540326": "八宿县",
				"540327": "左贡县",
				"540328": "芒康县",
				"540329": "洛隆县",
				"540330": "边坝县"
			}
		},
		"540400": {
			code: "540400",
			name: "林芝市",
			districts: {
				"540402": "巴宜区",
				"540421": "工布江达县",
				"540422": "米林县",
				"540423": "墨脱县",
				"540424": "波密县",
				"540425": "察隅县",
				"540426": "朗县"
			}
		},
		"540500": {
			code: "540500",
			name: "山南市",
			districts: {
				"540502": "乃东区",
				"540521": "扎囊县",
				"540522": "贡嘎县",
				"540523": "桑日县",
				"540524": "琼结县",
				"540525": "曲松县",
				"540526": "措美县",
				"540527": "洛扎县",
				"540528": "加查县",
				"540529": "隆子县",
				"540530": "错那县",
				"540531": "浪卡子县"
			}
		},
		"540600": {
			code: "540600",
			name: "那曲市",
			districts: {
				"540602": "色尼区",
				"540621": "嘉黎县",
				"540622": "比如县",
				"540623": "聂荣县",
				"540624": "安多县",
				"540625": "申扎县",
				"540626": "索县",
				"540627": "班戈县",
				"540628": "巴青县",
				"540629": "尼玛县",
				"540630": "双湖县"
			}
		},
		"542500": {
			code: "542500",
			name: "阿里地区",
			districts: {
				"542521": "普兰县",
				"542522": "札达县",
				"542523": "噶尔县",
				"542524": "日土县",
				"542525": "革吉县",
				"542526": "改则县",
				"542527": "措勤县"
			}
		}
	}
},
	"610000": {
	code: "610000",
	name: "陕西省",
	cities: {
		"610100": {
			code: "610100",
			name: "西安市",
			districts: {
				"610102": "新城区",
				"610103": "碑林区",
				"610104": "莲湖区",
				"610111": "灞桥区",
				"610112": "未央区",
				"610113": "雁塔区",
				"610114": "阎良区",
				"610115": "临潼区",
				"610116": "长安区",
				"610117": "高陵区",
				"610118": "鄠邑区",
				"610122": "蓝田县",
				"610124": "周至县"
			}
		},
		"610200": {
			code: "610200",
			name: "铜川市",
			districts: {
				"610202": "王益区",
				"610203": "印台区",
				"610204": "耀州区",
				"610222": "宜君县"
			}
		},
		"610300": {
			code: "610300",
			name: "宝鸡市",
			districts: {
				"610302": "渭滨区",
				"610303": "金台区",
				"610304": "陈仓区",
				"610322": "凤翔县",
				"610323": "岐山县",
				"610324": "扶风县",
				"610326": "眉县",
				"610327": "陇县",
				"610328": "千阳县",
				"610329": "麟游县",
				"610330": "凤县",
				"610331": "太白县"
			}
		},
		"610400": {
			code: "610400",
			name: "咸阳市",
			districts: {
				"610402": "秦都区",
				"610403": "杨陵区",
				"610404": "渭城区",
				"610422": "三原县",
				"610423": "泾阳县",
				"610424": "乾县",
				"610425": "礼泉县",
				"610426": "永寿县",
				"610428": "长武县",
				"610429": "旬邑县",
				"610430": "淳化县",
				"610431": "武功县",
				"610481": "兴平市",
				"610482": "彬州市"
			}
		},
		"610500": {
			code: "610500",
			name: "渭南市",
			districts: {
				"610502": "临渭区",
				"610503": "华州区",
				"610522": "潼关县",
				"610523": "大荔县",
				"610524": "合阳县",
				"610525": "澄城县",
				"610526": "蒲城县",
				"610527": "白水县",
				"610528": "富平县",
				"610581": "韩城市",
				"610582": "华阴市"
			}
		},
		"610600": {
			code: "610600",
			name: "延安市",
			districts: {
				"610602": "宝塔区",
				"610603": "安塞区",
				"610621": "延长县",
				"610622": "延川县",
				"610623": "子长县",
				"610625": "志丹县",
				"610626": "吴起县",
				"610627": "甘泉县",
				"610628": "富县",
				"610629": "洛川县",
				"610630": "宜川县",
				"610631": "黄龙县",
				"610632": "黄陵县"
			}
		},
		"610700": {
			code: "610700",
			name: "汉中市",
			districts: {
				"610702": "汉台区",
				"610703": "南郑区",
				"610722": "城固县",
				"610723": "洋县",
				"610724": "西乡县",
				"610725": "勉县",
				"610726": "宁强县",
				"610727": "略阳县",
				"610728": "镇巴县",
				"610729": "留坝县",
				"610730": "佛坪县"
			}
		},
		"610800": {
			code: "610800",
			name: "榆林市",
			districts: {
				"610802": "榆阳区",
				"610803": "横山区",
				"610822": "府谷县",
				"610824": "靖边县",
				"610825": "定边县",
				"610826": "绥德县",
				"610827": "米脂县",
				"610828": "佳县",
				"610829": "吴堡县",
				"610830": "清涧县",
				"610831": "子洲县",
				"610881": "神木市"
			}
		},
		"610900": {
			code: "610900",
			name: "安康市",
			districts: {
				"610902": "汉滨区",
				"610921": "汉阴县",
				"610922": "石泉县",
				"610923": "宁陕县",
				"610924": "紫阳县",
				"610925": "岚皋县",
				"610926": "平利县",
				"610927": "镇坪县",
				"610928": "旬阳县",
				"610929": "白河县"
			}
		},
		"611000": {
			code: "611000",
			name: "商洛市",
			districts: {
				"611002": "商州区",
				"611021": "洛南县",
				"611022": "丹凤县",
				"611023": "商南县",
				"611024": "山阳县",
				"611025": "镇安县",
				"611026": "柞水县"
			}
		}
	}
},
	"620000": {
	code: "620000",
	name: "甘肃省",
	cities: {
		"620100": {
			code: "620100",
			name: "兰州市",
			districts: {
				"620102": "城关区",
				"620103": "七里河区",
				"620104": "西固区",
				"620105": "安宁区",
				"620111": "红古区",
				"620121": "永登县",
				"620122": "皋兰县",
				"620123": "榆中县"
			}
		},
		"620200": {
			code: "620200",
			name: "嘉峪关市",
			districts: {
			}
		},
		"620300": {
			code: "620300",
			name: "金昌市",
			districts: {
				"620302": "金川区",
				"620321": "永昌县"
			}
		},
		"620400": {
			code: "620400",
			name: "白银市",
			districts: {
				"620402": "白银区",
				"620403": "平川区",
				"620421": "靖远县",
				"620422": "会宁县",
				"620423": "景泰县"
			}
		},
		"620500": {
			code: "620500",
			name: "天水市",
			districts: {
				"620502": "秦州区",
				"620503": "麦积区",
				"620521": "清水县",
				"620522": "秦安县",
				"620523": "甘谷县",
				"620524": "武山县",
				"620525": "张家川回族自治县"
			}
		},
		"620600": {
			code: "620600",
			name: "武威市",
			districts: {
				"620602": "凉州区",
				"620621": "民勤县",
				"620622": "古浪县",
				"620623": "天祝藏族自治县"
			}
		},
		"620700": {
			code: "620700",
			name: "张掖市",
			districts: {
				"620702": "甘州区",
				"620721": "肃南裕固族自治县",
				"620722": "民乐县",
				"620723": "临泽县",
				"620724": "高台县",
				"620725": "山丹县"
			}
		},
		"620800": {
			code: "620800",
			name: "平凉市",
			districts: {
				"620802": "崆峒区",
				"620821": "泾川县",
				"620822": "灵台县",
				"620823": "崇信县",
				"620825": "庄浪县",
				"620826": "静宁县",
				"620881": "华亭市"
			}
		},
		"620900": {
			code: "620900",
			name: "酒泉市",
			districts: {
				"620902": "肃州区",
				"620921": "金塔县",
				"620922": "瓜州县",
				"620923": "肃北蒙古族自治县",
				"620924": "阿克塞哈萨克族自治县",
				"620981": "玉门市",
				"620982": "敦煌市"
			}
		},
		"621000": {
			code: "621000",
			name: "庆阳市",
			districts: {
				"621002": "西峰区",
				"621021": "庆城县",
				"621022": "环县",
				"621023": "华池县",
				"621024": "合水县",
				"621025": "正宁县",
				"621026": "宁县",
				"621027": "镇原县"
			}
		},
		"621100": {
			code: "621100",
			name: "定西市",
			districts: {
				"621102": "安定区",
				"621121": "通渭县",
				"621122": "陇西县",
				"621123": "渭源县",
				"621124": "临洮县",
				"621125": "漳县",
				"621126": "岷县"
			}
		},
		"621200": {
			code: "621200",
			name: "陇南市",
			districts: {
				"621202": "武都区",
				"621221": "成县",
				"621222": "文县",
				"621223": "宕昌县",
				"621224": "康县",
				"621225": "西和县",
				"621226": "礼县",
				"621227": "徽县",
				"621228": "两当县"
			}
		},
		"622900": {
			code: "622900",
			name: "临夏回族自治州",
			districts: {
				"622901": "临夏市",
				"622921": "临夏县",
				"622922": "康乐县",
				"622923": "永靖县",
				"622924": "广河县",
				"622925": "和政县",
				"622926": "东乡族自治县",
				"622927": "积石山保安族东乡族撒拉族自治县"
			}
		},
		"623000": {
			code: "623000",
			name: "甘南藏族自治州",
			districts: {
				"623001": "合作市",
				"623021": "临潭县",
				"623022": "卓尼县",
				"623023": "舟曲县",
				"623024": "迭部县",
				"623025": "玛曲县",
				"623026": "碌曲县",
				"623027": "夏河县"
			}
		}
	}
},
	"630000": {
	code: "630000",
	name: "青海省",
	cities: {
		"630100": {
			code: "630100",
			name: "西宁市",
			districts: {
				"630102": "城东区",
				"630103": "城中区",
				"630104": "城西区",
				"630105": "城北区",
				"630121": "大通回族土族自治县",
				"630122": "湟中县",
				"630123": "湟源县"
			}
		},
		"630200": {
			code: "630200",
			name: "海东市",
			districts: {
				"630202": "乐都区",
				"630203": "平安区",
				"630222": "民和回族土族自治县",
				"630223": "互助土族自治县",
				"630224": "化隆回族自治县",
				"630225": "循化撒拉族自治县"
			}
		},
		"632200": {
			code: "632200",
			name: "海北藏族自治州",
			districts: {
				"632221": "门源回族自治县",
				"632222": "祁连县",
				"632223": "海晏县",
				"632224": "刚察县"
			}
		},
		"632300": {
			code: "632300",
			name: "黄南藏族自治州",
			districts: {
				"632321": "同仁县",
				"632322": "尖扎县",
				"632323": "泽库县",
				"632324": "河南蒙古族自治县"
			}
		},
		"632500": {
			code: "632500",
			name: "海南藏族自治州",
			districts: {
				"632521": "共和县",
				"632522": "同德县",
				"632523": "贵德县",
				"632524": "兴海县",
				"632525": "贵南县"
			}
		},
		"632600": {
			code: "632600",
			name: "果洛藏族自治州",
			districts: {
				"632621": "玛沁县",
				"632622": "班玛县",
				"632623": "甘德县",
				"632624": "达日县",
				"632625": "久治县",
				"632626": "玛多县"
			}
		},
		"632700": {
			code: "632700",
			name: "玉树藏族自治州",
			districts: {
				"632701": "玉树市",
				"632722": "杂多县",
				"632723": "称多县",
				"632724": "治多县",
				"632725": "囊谦县",
				"632726": "曲麻莱县"
			}
		},
		"632800": {
			code: "632800",
			name: "海西蒙古族藏族自治州",
			districts: {
				"632801": "格尔木市",
				"632802": "德令哈市",
				"632803": "茫崖市",
				"632821": "乌兰县",
				"632822": "都兰县",
				"632823": "天峻县"
			}
		}
	}
},
	"640000": {
	code: "640000",
	name: "宁夏回族自治区",
	cities: {
		"640100": {
			code: "640100",
			name: "银川市",
			districts: {
				"640104": "兴庆区",
				"640105": "西夏区",
				"640106": "金凤区",
				"640121": "永宁县",
				"640122": "贺兰县",
				"640181": "灵武市"
			}
		},
		"640200": {
			code: "640200",
			name: "石嘴山市",
			districts: {
				"640202": "大武口区",
				"640205": "惠农区",
				"640221": "平罗县"
			}
		},
		"640300": {
			code: "640300",
			name: "吴忠市",
			districts: {
				"640302": "利通区",
				"640303": "红寺堡区",
				"640323": "盐池县",
				"640324": "同心县",
				"640381": "青铜峡市"
			}
		},
		"640400": {
			code: "640400",
			name: "固原市",
			districts: {
				"640402": "原州区",
				"640422": "西吉县",
				"640423": "隆德县",
				"640424": "泾源县",
				"640425": "彭阳县"
			}
		},
		"640500": {
			code: "640500",
			name: "中卫市",
			districts: {
				"640502": "沙坡头区",
				"640521": "中宁县",
				"640522": "海原县"
			}
		}
	}
},
	"650000": {
	code: "650000",
	name: "新疆维吾尔自治区",
	cities: {
		"650100": {
			code: "650100",
			name: "乌鲁木齐市",
			districts: {
				"650102": "天山区",
				"650103": "沙依巴克区",
				"650104": "新市区",
				"650105": "水磨沟区",
				"650106": "头屯河区",
				"650107": "达坂城区",
				"650109": "米东区",
				"650121": "乌鲁木齐县"
			}
		},
		"650200": {
			code: "650200",
			name: "克拉玛依市",
			districts: {
				"650202": "独山子区",
				"650203": "克拉玛依区",
				"650204": "白碱滩区",
				"650205": "乌尔禾区"
			}
		},
		"650400": {
			code: "650400",
			name: "吐鲁番市",
			districts: {
				"650402": "高昌区",
				"650421": "鄯善县",
				"650422": "托克逊县"
			}
		},
		"650500": {
			code: "650500",
			name: "哈密市",
			districts: {
				"650502": "伊州区",
				"650521": "巴里坤哈萨克自治县",
				"650522": "伊吾县"
			}
		},
		"652300": {
			code: "652300",
			name: "昌吉回族自治州",
			districts: {
				"652301": "昌吉市",
				"652302": "阜康市",
				"652323": "呼图壁县",
				"652324": "玛纳斯县",
				"652325": "奇台县",
				"652327": "吉木萨尔县",
				"652328": "木垒哈萨克自治县"
			}
		},
		"652700": {
			code: "652700",
			name: "博尔塔拉蒙古自治州",
			districts: {
				"652701": "博乐市",
				"652702": "阿拉山口市",
				"652722": "精河县",
				"652723": "温泉县"
			}
		},
		"652800": {
			code: "652800",
			name: "巴音郭楞蒙古自治州",
			districts: {
				"652801": "库尔勒市",
				"652822": "轮台县",
				"652823": "尉犁县",
				"652824": "若羌县",
				"652825": "且末县",
				"652826": "焉耆回族自治县",
				"652827": "和静县",
				"652828": "和硕县",
				"652829": "博湖县"
			}
		},
		"652900": {
			code: "652900",
			name: "阿克苏地区",
			districts: {
				"652901": "阿克苏市",
				"652922": "温宿县",
				"652923": "库车县",
				"652924": "沙雅县",
				"652925": "新和县",
				"652926": "拜城县",
				"652927": "乌什县",
				"652928": "阿瓦提县",
				"652929": "柯坪县"
			}
		},
		"653000": {
			code: "653000",
			name: "克孜勒苏柯尔克孜自治州",
			districts: {
				"653001": "阿图什市",
				"653022": "阿克陶县",
				"653023": "阿合奇县",
				"653024": "乌恰县"
			}
		},
		"653100": {
			code: "653100",
			name: "喀什地区",
			districts: {
				"653101": "喀什市",
				"653121": "疏附县",
				"653122": "疏勒县",
				"653123": "英吉沙县",
				"653124": "泽普县",
				"653125": "莎车县",
				"653126": "叶城县",
				"653127": "麦盖提县",
				"653128": "岳普湖县",
				"653129": "伽师县",
				"653130": "巴楚县",
				"653131": "塔什库尔干塔吉克自治县"
			}
		},
		"653200": {
			code: "653200",
			name: "和田地区",
			districts: {
				"653201": "和田市",
				"653221": "和田县",
				"653222": "墨玉县",
				"653223": "皮山县",
				"653224": "洛浦县",
				"653225": "策勒县",
				"653226": "于田县",
				"653227": "民丰县"
			}
		},
		"654000": {
			code: "654000",
			name: "伊犁哈萨克自治州",
			districts: {
				"654002": "伊宁市",
				"654003": "奎屯市",
				"654004": "霍尔果斯市",
				"654021": "伊宁县",
				"654022": "察布查尔锡伯自治县",
				"654023": "霍城县",
				"654024": "巩留县",
				"654025": "新源县",
				"654026": "昭苏县",
				"654027": "特克斯县",
				"654028": "尼勒克县"
			}
		},
		"654200": {
			code: "654200",
			name: "塔城地区",
			districts: {
				"654201": "塔城市",
				"654202": "乌苏市",
				"654221": "额敏县",
				"654223": "沙湾县",
				"654224": "托里县",
				"654225": "裕民县",
				"654226": "和布克赛尔蒙古自治县"
			}
		},
		"654300": {
			code: "654300",
			name: "阿勒泰地区",
			districts: {
				"654301": "阿勒泰市",
				"654321": "布尔津县",
				"654322": "富蕴县",
				"654323": "福海县",
				"654324": "哈巴河县",
				"654325": "青河县",
				"654326": "吉木乃县"
			}
		}
	}
},
	"810000": {
	code: "810000",
	name: "香港特别行政区",
	cities: {
		"810000": {
			code: "810000",
			name: "香港特别行政区",
			districts: {
				"810101": "中西区",
				"810102": "湾仔区",
				"810103": "东区",
				"810104": "南区",
				"810105": "油尖旺区",
				"810106": "深水埗区",
				"810107": "九龙城区",
				"810108": "黄大仙区",
				"810109": "观塘区",
				"810110": "北区",
				"810111": "大埔区",
				"810112": "沙田区",
				"810113": "西贡区",
				"810114": "荃湾区",
				"810115": "屯门区",
				"810116": "元朗区",
				"810117": "葵青区",
				"810118": "离岛区"
			}
		}
	}
},
	"820000": {
	code: "820000",
	name: "澳门特别行政区",
	cities: {
		"820000": {
			code: "820000",
			name: "澳门特别行政区",
			districts: {
				"820101": "花地玛堂区",
				"820102": "圣安多尼堂区",
				"820103": "大堂区",
				"820104": "望德堂区",
				"820105": "风顺堂区",
				"820106": "嘉模堂区",
				"820107": "圣方济各堂区",
				"820108": "路氹城",
				"820109": "澳门新城"
			}
		}
	}
},
	"830000": {
	code: "830000",
	name: "台湾省",
	cities: {
		"830100": {
			code: "830100",
			name: "台北市",
			districts: {
				"830101": "中正区",
				"830102": "大同区",
				"830103": "中山区",
				"830104": "万华区",
				"830105": "信义区",
				"830106": "松山区",
				"830107": "大安区",
				"830108": "南港区",
				"830109": "北投区",
				"830110": "内湖区",
				"830111": "士林区",
				"830112": "文山区"
			}
		},
		"830200": {
			code: "830200",
			name: "新北市",
			districts: {
				"830201": "板桥区",
				"830202": "土城区",
				"830203": "新庄区",
				"830204": "新店区",
				"830205": "深坑区",
				"830206": "石碇区",
				"830207": "坪林区",
				"830208": "乌来区",
				"830209": "五股区",
				"830210": "八里区",
				"830211": "林口区",
				"830212": "淡水区",
				"830213": "中和区",
				"830214": "永和区",
				"830215": "三重区",
				"830216": "芦洲区",
				"830217": "泰山区",
				"830218": "树林区",
				"830219": "莺歌区",
				"830220": "三峡区",
				"830221": "汐止区",
				"830222": "金山区",
				"830223": "万里区",
				"830224": "三芝区",
				"830225": "石门区",
				"830226": "瑞芳区",
				"830227": "贡寮区",
				"830228": "双溪区",
				"830229": "平溪区"
			}
		},
		"830300": {
			code: "830300",
			name: "桃园市",
			districts: {
				"830301": "桃园区",
				"830302": "中坜区",
				"830303": "平镇区",
				"830304": "八德区",
				"830305": "杨梅区",
				"830306": "芦竹区",
				"830307": "大溪区",
				"830308": "龙潭区",
				"830309": "龟山区",
				"830310": "大园区",
				"830311": "观音区",
				"830312": "新屋区",
				"830313": "复兴区"
			}
		},
		"830400": {
			code: "830400",
			name: "台中市",
			districts: {
				"830401": "中区",
				"830402": "东区",
				"830403": "西区",
				"830404": "南区",
				"830405": "北区",
				"830406": "西屯区",
				"830407": "南屯区",
				"830408": "北屯区",
				"830409": "丰原区",
				"830410": "大里区",
				"830411": "太平区",
				"830412": "东势区",
				"830413": "大甲区",
				"830414": "清水区",
				"830415": "沙鹿区",
				"830416": "梧栖区",
				"830417": "后里区",
				"830418": "神冈区",
				"830419": "潭子区",
				"830420": "大雅区",
				"830421": "新小区",
				"830422": "石冈区",
				"830423": "外埔区",
				"830424": "大安区",
				"830425": "乌日区",
				"830426": "大肚区",
				"830427": "龙井区",
				"830428": "雾峰区",
				"830429": "和平区"
			}
		},
		"830500": {
			code: "830500",
			name: "台南市",
			districts: {
				"830501": "中西区",
				"830502": "东区",
				"830503": "南区",
				"830504": "北区",
				"830505": "安平区",
				"830506": "安南区",
				"830507": "永康区",
				"830508": "归仁区",
				"830509": "新化区",
				"830510": "左镇区",
				"830511": "玉井区",
				"830512": "楠西区",
				"830513": "南化区",
				"830514": "仁德区",
				"830515": "关庙区",
				"830516": "龙崎区",
				"830517": "官田区",
				"830518": "麻豆区",
				"830519": "佳里区",
				"830520": "西港区",
				"830521": "七股区",
				"830522": "将军区",
				"830523": "学甲区",
				"830524": "北门区",
				"830525": "新营区",
				"830526": "后壁区",
				"830527": "白河区",
				"830528": "东山区",
				"830529": "六甲区",
				"830530": "下营区",
				"830531": "柳营区",
				"830532": "盐水区",
				"830533": "善化区",
				"830534": "大内区",
				"830535": "山上区",
				"830536": "新市区",
				"830537": "安定区"
			}
		},
		"830600": {
			code: "830600",
			name: "高雄市",
			districts: {
				"830601": "楠梓区",
				"830602": "左营区",
				"830603": "鼓山区",
				"830604": "三民区",
				"830605": "盐埕区",
				"830606": "前金区",
				"830607": "新兴区",
				"830608": "苓雅区",
				"830609": "前镇区",
				"830610": "旗津区",
				"830611": "小港区",
				"830612": "凤山区",
				"830613": "大寮区",
				"830614": "鸟松区",
				"830615": "林园区",
				"830616": "仁武区",
				"830617": "大树区",
				"830618": "大社区",
				"830619": "冈山区",
				"830620": "路竹区",
				"830621": "桥头区",
				"830622": "梓官区",
				"830623": "弥陀区",
				"830624": "永安区",
				"830625": "燕巢区",
				"830626": "阿莲区",
				"830627": "茄萣区",
				"830628": "湖内区",
				"830629": "旗山区",
				"830630": "美浓区",
				"830631": "内门区",
				"830632": "杉林区",
				"830633": "甲仙区",
				"830634": "六龟区",
				"830635": "茂林区",
				"830636": "桃源区",
				"830637": "那玛夏区"
			}
		},
		"830700": {
			code: "830700",
			name: "基隆市",
			districts: {
				"830701": "中正区",
				"830702": "七堵区",
				"830703": "暖暖区",
				"830704": "仁爱区",
				"830705": "中山区",
				"830706": "安乐区",
				"830707": "信义区"
			}
		},
		"830800": {
			code: "830800",
			name: "新竹市",
			districts: {
				"830801": "东区",
				"830802": "北区",
				"830803": "香山区"
			}
		},
		"830900": {
			code: "830900",
			name: "嘉义市",
			districts: {
				"830901": "东区",
				"830902": "西区"
			}
		}
	}
}
};

var REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北'];
var areas = location$1; // 随机生成一个大区。

var region = function region() {
  return pick(REGION);
}; // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。

var province = function province() {
  return pickMap(areas).name;
};
/**
 * 随机生成一个（中国）市。
 * @param prefix 是否有省前缀
 */

var city = function city(prefix) {
  if (prefix === void 0) {
    prefix = false;
  }

  var province = pickMap(areas);
  var city = pickMap(province.cities);
  return prefix ? [province.name, city.name].join(' ') : city.name;
};
/**
 * 随机生成一个（中国）县。
 * @param prefix 是否有省/市前缀
 */

var county = function county(prefix) {
  if (prefix === void 0) {
    prefix = false;
  } // 直筒子市，无区县
  // https://baike.baidu.com/item/%E7%9B%B4%E7%AD%92%E5%AD%90%E5%B8%82


  var specialCity = ['460400', '441900', '442000', '620200'];
  var province = pickMap(areas);
  var city = pickMap(province.cities);

  if (specialCity.indexOf(city.code) !== -1) {
    return county(prefix);
  }

  var district = pickMap(city.districts) || '-';
  return prefix ? [province.name, city.name, district].join(' ') : district;
};
/**
 * 随机生成一个邮政编码（默认6位数字）。
 * @param len
 */

var zip = function zip(len) {
  if (len === void 0) {
    len = 6;
  }

  var zip = '';

  for (var i = 0; i < len; i++) {
    zip += natural(0, 9);
  }

  return zip;
};

var address = /*#__PURE__*/Object.freeze({
  region: region,
  province: province,
  city: city,
  county: county,
  zip: zip
});

// Miscellaneous
var areas$1 = location$1; // 随机生成一个 guid
// http://www.broofa.com/2008/09/javascript-uuid-function/

var guid = function guid() {
  var pool = 'abcdefABCDEF1234567890';
  return string(pool, 8) + '-' + string(pool, 4) + '-' + string(pool, 4) + '-' + string(pool, 4) + '-' + string(pool, 12);
};
var uuid = guid; // 随机生成一个 18 位身份证。
// http://baike.baidu.com/view/1697.htm#4
// [身份证](http://baike.baidu.com/view/1697.htm#4)
// 地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
// [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)

var id = function id() {
  var _id;

  var _sum = 0;
  var rank = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'];
  var last = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; // 直筒子市，无区县
  // https://baike.baidu.com/item/%E7%9B%B4%E7%AD%92%E5%AD%90%E5%B8%82

  var specialCity = ['460400', '441900', '442000', '620200'];
  var province = pickMap(areas$1);
  var city = pickMap(province.cities);

  if (specialCity.indexOf(city.code) !== -1) {
    return id();
  }

  var districts = city.districts;
  var district = pick(keys(districts));
  _id = district + date('yyyyMMdd') + string('number', 3);

  for (var i = 0; i < id.length; i++) {
    _sum += id[i] * Number(rank[i]);
  }

  _id += last[_sum % 11];
  return _id;
}; // 生成一个全局的自增整数。
// 类似自增主键（auto increment primary key）。

var key = 0;
var increment = function increment(step) {
  return key += Number(step) || 1; // step?
};
var inc = increment;
/**
 * 随机生成一个版本号
 * @param depth 版本号的层级，默认为3
 */

var version = function version(depth) {
  if (depth === void 0) {
    depth = 3;
  }

  var numbers = [];

  for (var i = 0; i < depth; i++) {
    numbers.push(natural(0, 10));
  }

  return numbers.join('.');
}; // 随机生成一个中国手机号

var phone = function phone() {
  var segments = [// 移动号段
  '134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159', '165', '172', '178', '182', '183', '184', '187', '188', // 联通号段
  '130', '131', '132', '145', '155', '156', '171', '175', '176', '185', '186', // 电信号段
  '133', '149', '153', '173', '174', '177', '180', '181', '189', '191'];
  return pick(segments) + string('number', 8);
};

var misc = /*#__PURE__*/Object.freeze({
  guid: guid,
  uuid: uuid,
  id: id,
  increment: increment,
  inc: inc,
  version: version,
  phone: phone
});

var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
}; // Mock.Random
var Random = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, basic), date$1), image$1), color$1), text), name$1), web), address), helper), misc);

// 解析数据模板（属性名部分）。
var parse = function parse(name) {
  name = name == undefined ? '' : name + '';
  var parameters = (name || '').match(constant.RE_KEY); // name|min-max, name|count

  var range = parameters && parameters[3] && parameters[3].match(constant.RE_RANGE);
  var min = range && range[1] && parseInt(range[1], 10); // || 1

  var max = range && range[2] && parseInt(range[2], 10); // || 1
  // 如果是 min-max, 返回 min-max 之间的一个数
  // 如果是 count, 返回 count

  var count = range ? range[2] ? Random.integer(min, max) : parseInt(range[1], 10) : undefined;
  var decimal = parameters && parameters[4] && parameters[4].match(constant.RE_RANGE);
  var dmin = decimal && decimal[1] && parseInt(decimal[1], 10); // || 0,

  var dmax = decimal && decimal[2] && parseInt(decimal[2], 10); // || 0,
  // int || dmin-dmax

  var dcount = decimal ? decimal[2] ? Random.integer(dmin, dmax) : parseInt(decimal[1], 10) : undefined;
  var result = {
    // 1 name, 2 inc, 3 range, 4 decimal
    parameters: parameters,
    // 1 min, 2 max
    range: range,
    min: min,
    max: max,
    count: count,
    decimal: decimal,
    dmin: dmin,
    dmax: dmax,
    dcount: dcount
  };

  for (var r in result) {
    if (result[r] != undefined) {
      return result;
    }
  }

  return {};
};

// ## RegExp Handler

var LOWER = ascii(97, 122);
var UPPER = ascii(65, 90);
var NUMBER = ascii(48, 57);
var OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(123, 126); // 排除 95 _ ascii(91, 94) + ascii(96, 96)

var PRINTABLE = ascii(32, 126);
var SPACE = " \f\n\r\t\x0B\xA0\u2028\u2029";
var CHARACTER_CLASSES = {
  '\\w': LOWER + UPPER + NUMBER + '_',
  '\\W': OTHER.replace('_', ''),
  '\\s': SPACE,
  '\\S': function () {
    var result = PRINTABLE;

    for (var i = 0; i < SPACE.length; i++) {
      result = result.replace(SPACE[i], '');
    }

    return result;
  }(),
  '\\d': NUMBER,
  '\\D': LOWER + UPPER + OTHER
};

function ascii(from, to) {
  var result = '';

  for (var i = from; i <= to; i++) {
    result += String.fromCharCode(i);
  }

  return result;
}

var handler = {
  // var ast = RegExpParser.parse(regexp.source)
  gen: function gen(node, result, cache) {
    cache = cache || {
      guid: 1
    };
    return handler[node.type] ? handler[node.type](node, result, cache) : handler.token(node, result, cache);
  },
  token: function token(node) {
    switch (node.type) {
      case 'start':
      case 'end':
        return '';

      case 'any-character':
        return Random.character();

      case 'backspace':
        return '';

      case 'word-boundary':
        // TODO
        return '';

      case 'non-word-boundary':
        // TODO
        break;

      case 'digit':
        return Random.pick(NUMBER.split(''));

      case 'non-digit':
        return Random.pick((LOWER + UPPER + OTHER).split(''));

      case 'form-feed':
        break;

      case 'line-feed':
        return node.body || node.text;

      case 'carriage-return':
        break;

      case 'white-space':
        return Random.pick(SPACE.split(''));

      case 'non-white-space':
        return Random.pick((LOWER + UPPER + NUMBER).split(''));

      case 'tab':
        break;

      case 'vertical-tab':
        break;

      case 'word':
        // \w [a-zA-Z0-9]
        return Random.pick((LOWER + UPPER + NUMBER).split(''));

      case 'non-word':
        // \W [^a-zA-Z0-9]
        return Random.pick(OTHER.replace('_', '').split(''));

      case 'null-character':
        break;
    }

    return node.body || node.text;
  },
  // {
  //   type: 'alternate',
  //   offset: 0,
  //   text: '',
  //   left: {
  //     boyd: []
  //   },
  //   right: {
  //     boyd: []
  //   }
  // }
  alternate: function alternate(node, result, cache) {
    // node.left/right {}
    return handler.gen(Random["boolean"]() ? node.left : node.right, result, cache);
  },
  // {
  //   type: 'match',
  //   offset: 0,
  //   text: '',
  //   body: []
  // }
  match: function match(node, result, cache) {
    result = ''; // node.body []

    for (var i = 0; i < node.body.length; i++) {
      result += handler.gen(node.body[i], result, cache);
    }

    return result;
  },
  // ()
  'capture-group': function captureGroup(node, result, cache) {
    // node.body {}
    result = handler.gen(node.body, result, cache);
    cache[cache.guid++] = result;
    return result;
  },
  // (?:...)
  'non-capture-group': function nonCaptureGroup(node, result, cache) {
    // node.body {}
    return handler.gen(node.body, result, cache);
  },
  // (?=p)
  'positive-lookahead': function positiveLookahead(node, result, cache) {
    // node.body
    return handler.gen(node.body, result, cache);
  },
  // (?!p)
  'negative-lookahead': function negativeLookahead() {
    // node.body
    return '';
  },
  // {
  //   type: 'quantified',
  //   offset: 3,
  //   text: 'c*',
  //   body: {
  //     type: 'literal',
  //     offset: 3,
  //     text: 'c',
  //     body: 'c',
  //     escaped: false
  //   },
  //   quantifier: {
  //     type: 'quantifier',
  //     offset: 4,
  //     text: '*',
  //     min: 0,
  //     max: Infinity,
  //     greedy: true
  //   }
  // }
  quantified: function quantified(node, result, cache) {
    result = ''; // node.quantifier {}

    var count = handler.quantifier(node.quantifier); // node.body {}

    for (var i = 0; i < count; i++) {
      result += handler.gen(node.body, result, cache);
    }

    return result;
  },
  // quantifier: {
  //   type: 'quantifier',
  //   offset: 4,
  //   text: '*',
  //   min: 0,
  //   max: Infinity,
  //   greedy: true
  // }
  quantifier: function quantifier(node) {
    var min = Math.max(node.min, 0);
    var max = isFinite(node.max) ? node.max : min + Random.integer(3, 7);
    return Random.integer(min, max);
  },
  charset: function charset(node, result, cache) {
    // node.invert
    if (node.invert) {
      return handler['invert-charset'](node, result, cache);
    } // node.body []


    var literal = Random.pick(node.body);
    return handler.gen(literal, result, cache);
  },
  'invert-charset': function invertCharset(node, result, cache) {
    var pool = PRINTABLE;

    for (var i = 0, item = void 0; i < node.body.length; i++) {
      item = node.body[i];

      switch (item.type) {
        case 'literal':
          pool = pool.replace(item.body, '');
          break;

        case 'range':
          var min = handler.gen(item.start, result, cache).charCodeAt();
          var max = handler.gen(item.end, result, cache).charCodeAt();

          for (var ii = min; ii <= max; ii++) {
            pool = pool.replace(String.fromCharCode(ii), '');
          }

        /* falls through */

        default:
          var characters = CHARACTER_CLASSES[item.text];

          if (characters) {
            for (var iii = 0; iii <= characters.length; iii++) {
              pool = pool.replace(characters[iii], '');
            }
          }

      }
    }

    return Random.pick(pool.split(''));
  },
  range: function range(node, result, cache) {
    // node.start, node.end
    var min = handler.gen(node.start, result, cache).charCodeAt();
    var max = handler.gen(node.end, result, cache).charCodeAt();
    return String.fromCharCode(Random.integer(min, max));
  },
  literal: function literal(node) {
    return node.escaped ? node.body : node.text;
  },
  // Unicode \u
  unicode: function unicode(node) {
    return String.fromCharCode(parseInt(node.code, 16));
  },
  // 十六进制 \xFF
  hex: function hex(node) {
    return String.fromCharCode(parseInt(node.code, 16));
  },
  octal: function octal(node) {
    return String.fromCharCode(parseInt(node.code, 8));
  },
  // 反向引用
  'back-reference': function backReference(node, result, cache) {
    return cache[node.code] || '';
  },
  // http://en.wikipedia.org/wiki/C0_and_C1_control_codes
  CONTROL_CHARACTER_MAP: function () {
    var CONTROL_CHARACTER = '@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _'.split(' ');
    var CONTROL_CHARACTER_UNICODE = "\0 \x01 \x02 \x03 \x04 \x05 \x06 \x07 \b \t \n \x0B \f \r \x0E \x0F \x10 \x11 \x12 \x13 \x14 \x15 \x16 \x17 \x18 \x19 \x1A \x1B \x1C \x1D \x1E \x1F".split(' ');
    var map = {};

    for (var i = 0; i < CONTROL_CHARACTER.length; i++) {
      map[CONTROL_CHARACTER[i]] = CONTROL_CHARACTER_UNICODE[i];
    }

    return map;
  }(),
  'control-character': function controlCharacter(node) {
    return this.CONTROL_CHARACTER_MAP[node.code];
  }
};

// https://github.com/nuysoft/regexp
// forked from https://github.com/ForbesLindesay/regexp
function Token(n) {
  this.type = n, this.offset = Token.offset(), this.text = Token.text();
}

function Alternate(n, l) {
  Token.call(this, 'alternate'), this.left = n, this.right = l;
}

function Match(n) {
  Token.call(this, 'match'), this.body = n.filter(Boolean);
}

function Group(n, l) {
  Token.call(this, n), this.body = l;
}

function CaptureGroup(n) {
  Group.call(this, 'capture-group'), this.index = cgs[this.offset] || (cgs[this.offset] = index++), this.body = n;
}

function Quantified(n, l) {
  Token.call(this, 'quantified'), this.body = n, this.quantifier = l;
}

function Quantifier(n, l) {
  Token.call(this, 'quantifier'), this.min = n, this.max = l, this.greedy = !0;
}

function CharSet(n, l) {
  Token.call(this, 'charset'), this.invert = n, this.body = l;
}

function CharacterRange(n, l) {
  Token.call(this, 'range'), this.start = n, this.end = l;
}

function Literal(n) {
  Token.call(this, 'literal'), this.body = n, this.escaped = this.body != this.text;
}

function Unicode(n) {
  Token.call(this, 'unicode'), this.code = n.toUpperCase();
}

function Hex(n) {
  Token.call(this, 'hex'), this.code = n.toUpperCase();
}

function Octal(n) {
  Token.call(this, 'octal'), this.code = n.toUpperCase();
}

function BackReference(n) {
  Token.call(this, 'back-reference'), this.code = n.toUpperCase();
}

function ControlCharacter(n) {
  Token.call(this, 'control-character'), this.code = n.toUpperCase();
}

var parser = function () {
  function n(n, l) {
    function u() {
      this.constructor = n;
    }

    u.prototype = l.prototype, n.prototype = new u();
  }

  function l(n, l, u, t, r) {
    function e(n, l) {
      function u(n) {
        function l(n) {
          return n.charCodeAt(0).toString(16).toUpperCase();
        }

        return n.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (n) {
          return '\\x0' + l(n);
        }).replace(/[\x10-\x1F\x80-\xFF]/g, function (n) {
          return '\\x' + l(n);
        }).replace(/[\u0180-\u0FFF]/g, function (n) {
          return "\\u0" + l(n);
        }).replace(/[\u1080-\uFFFF]/g, function (n) {
          return "\\u" + l(n);
        });
      }

      var t, r;

      switch (n.length) {
        case 0:
          t = 'end of input';
          break;

        case 1:
          t = n[0];
          break;

        default:
          t = n.slice(0, -1).join(', ') + ' or ' + n[n.length - 1];
      }

      return r = l ? '"' + u(l) + '"' : 'end of input', 'Expected ' + t + ' but ' + r + ' found.';
    }

    this.expected = n, this.found = l, this.offset = u, this.line = t, this.column = r, this.name = 'SyntaxError', this.message = e(n, l);
  }

  function u(n) {
    function u() {
      return n.substring(Lt, qt);
    }

    function t() {
      return Lt;
    }

    function r(l) {
      function u(l, u, t) {
        var r, e;

        for (r = u; t > r; r++) {
          e = n.charAt(r), '\n' === e ? (l.seenCR || l.line++, l.column = 1, l.seenCR = !1) : '\r' === e || "\u2028" === e || "\u2029" === e ? (l.line++, l.column = 1, l.seenCR = !0) : (l.column++, l.seenCR = !1);
        }
      }

      return Mt !== l && (Mt > l && (Mt = 0, Dt = {
        line: 1,
        column: 1,
        seenCR: !1
      }), u(Dt, Mt, l), Mt = l), Dt;
    }

    function e(n) {
      Ht > qt || (qt > Ht && (Ht = qt, Ot = []), Ot.push(n));
    }

    function o(n) {
      var l = 0;

      for (n.sort(); l < n.length;) {
        n[l - 1] === n[l] ? n.splice(l, 1) : l++;
      }
    }

    function c() {
      var l, u, t, r, o;
      return l = qt, u = i(), null !== u ? (t = qt, 124 === n.charCodeAt(qt) ? (r = fl, qt++) : (r = null, 0 === Wt && e(sl)), null !== r ? (o = c(), null !== o ? (r = [r, o], t = r) : (qt = t, t = il)) : (qt = t, t = il), null === t && (t = al), null !== t ? (Lt = l, u = hl(u, t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il), l;
    }

    function i() {
      var n, l, u, t, r;
      if (n = qt, l = f(), null === l && (l = al), null !== l) {
        if (u = qt, Wt++, t = d(), Wt--, null === t ? u = al : (qt = u, u = il), null !== u) {
          for (t = [], r = h(), null === r && (r = a()); null !== r;) {
            t.push(r), r = h(), null === r && (r = a());
          }

          null !== t ? (r = s(), null === r && (r = al), null !== r ? (Lt = n, l = dl(l, t, r), null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il);
        } else qt = n, n = il;
      } else qt = n, n = il;
      return n;
    }

    function a() {
      var n;
      return n = x(), null === n && (n = Q(), null === n && (n = B())), n;
    }

    function f() {
      var l, u;
      return l = qt, 94 === n.charCodeAt(qt) ? (u = pl, qt++) : (u = null, 0 === Wt && e(vl)), null !== u && (Lt = l, u = wl()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function s() {
      var l, u;
      return l = qt, 36 === n.charCodeAt(qt) ? (u = Al, qt++) : (u = null, 0 === Wt && e(Cl)), null !== u && (Lt = l, u = gl()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function h() {
      var n, l, u;
      return n = qt, l = a(), null !== l ? (u = d(), null !== u ? (Lt = n, l = bl(l, u), null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il), n;
    }

    function d() {
      var n, l, u;
      return Wt++, n = qt, l = p(), null !== l ? (u = k(), null === u && (u = al), null !== u ? (Lt = n, l = Tl(l, u), null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il), Wt--, null === n && (l = null, 0 === Wt && e(kl)), n;
    }

    function p() {
      var n;
      return n = v(), null === n && (n = w(), null === n && (n = A(), null === n && (n = C(), null === n && (n = g(), null === n && (n = b()))))), n;
    }

    function v() {
      var l, u, t, r, o, c;
      return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)), null !== u ? (t = T(), null !== t ? (44 === n.charCodeAt(qt) ? (r = ml, qt++) : (r = null, 0 === Wt && e(Rl)), null !== r ? (o = T(), null !== o ? (125 === n.charCodeAt(qt) ? (c = Fl, qt++) : (c = null, 0 === Wt && e(Ql)), null !== c ? (Lt = l, u = Sl(t, o), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
    }

    function w() {
      var l, u, t, r;
      return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)), null !== u ? (t = T(), null !== t ? (n.substr(qt, 2) === Ul ? (r = Ul, qt += 2) : (r = null, 0 === Wt && e(El)), null !== r ? (Lt = l, u = Gl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
    }

    function A() {
      var l, u, t, r;
      return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)), null !== u ? (t = T(), null !== t ? (125 === n.charCodeAt(qt) ? (r = Fl, qt++) : (r = null, 0 === Wt && e(Ql)), null !== r ? (Lt = l, u = Bl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
    }

    function C() {
      var l, u;
      return l = qt, 43 === n.charCodeAt(qt) ? (u = jl, qt++) : (u = null, 0 === Wt && e($l)), null !== u && (Lt = l, u = ql()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function g() {
      var l, u;
      return l = qt, 42 === n.charCodeAt(qt) ? (u = Ll, qt++) : (u = null, 0 === Wt && e(Ml)), null !== u && (Lt = l, u = Dl()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function b() {
      var l, u;
      return l = qt, 63 === n.charCodeAt(qt) ? (u = Hl, qt++) : (u = null, 0 === Wt && e(Ol)), null !== u && (Lt = l, u = Wl()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function k() {
      var l;
      return 63 === n.charCodeAt(qt) ? (l = Hl, qt++) : (l = null, 0 === Wt && e(Ol)), l;
    }

    function T() {
      var l, u, t;
      if (l = qt, u = [], zl.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(Il)), null !== t) for (; null !== t;) {
        u.push(t), zl.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(Il));
      } else u = il;
      return null !== u && (Lt = l, u = Jl(u)), null === u ? (qt = l, l = u) : l = u, l;
    }

    function x() {
      var l, u, t, r;
      return l = qt, 40 === n.charCodeAt(qt) ? (u = Kl, qt++) : (u = null, 0 === Wt && e(Nl)), null !== u ? (t = R(), null === t && (t = F(), null === t && (t = m(), null === t && (t = y()))), null !== t ? (41 === n.charCodeAt(qt) ? (r = Pl, qt++) : (r = null, 0 === Wt && e(Vl)), null !== r ? (Lt = l, u = Xl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
    }

    function y() {
      var n, l;
      return n = qt, l = c(), null !== l && (Lt = n, l = Yl(l)), null === l ? (qt = n, n = l) : n = l, n;
    }

    function m() {
      var l, u, t;
      return l = qt, n.substr(qt, 2) === Zl ? (u = Zl, qt += 2) : (u = null, 0 === Wt && e(_l)), null !== u ? (t = c(), null !== t ? (Lt = l, u = nu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il), l;
    }

    function R() {
      var l, u, t;
      return l = qt, n.substr(qt, 2) === lu ? (u = lu, qt += 2) : (u = null, 0 === Wt && e(uu)), null !== u ? (t = c(), null !== t ? (Lt = l, u = tu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il), l;
    }

    function F() {
      var l, u, t;
      return l = qt, n.substr(qt, 2) === ru ? (u = ru, qt += 2) : (u = null, 0 === Wt && e(eu)), null !== u ? (t = c(), null !== t ? (Lt = l, u = ou(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il), l;
    }

    function Q() {
      var l, u, t, r, o;
      if (Wt++, l = qt, 91 === n.charCodeAt(qt) ? (u = iu, qt++) : (u = null, 0 === Wt && e(au)), null !== u) {
        if (94 === n.charCodeAt(qt) ? (t = pl, qt++) : (t = null, 0 === Wt && e(vl)), null === t && (t = al), null !== t) {
          for (r = [], o = S(), null === o && (o = U()); null !== o;) {
            r.push(o), o = S(), null === o && (o = U());
          }

          null !== r ? (93 === n.charCodeAt(qt) ? (o = fu, qt++) : (o = null, 0 === Wt && e(su)), null !== o ? (Lt = l, u = hu(t, r), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il);
        } else qt = l, l = il;
      } else qt = l, l = il;
      return Wt--, null === l && (u = null, 0 === Wt && e(cu)), l;
    }

    function S() {
      var l, u, t, r;
      return Wt++, l = qt, u = U(), null !== u ? (45 === n.charCodeAt(qt) ? (t = pu, qt++) : (t = null, 0 === Wt && e(vu)), null !== t ? (r = U(), null !== r ? (Lt = l, u = wu(u, r), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), Wt--, null === l && (u = null, 0 === Wt && e(du)), l;
    }

    function U() {
      var n;
      return Wt++, n = G(), null === n && (n = E()), Wt--, null === n && (0 === Wt && e(Au)), n;
    }

    function E() {
      var l, u;
      return l = qt, Cu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null, 0 === Wt && e(gu)), null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u, l;
    }

    function G() {
      var n;
      return n = L(), null === n && (n = Y(), null === n && (n = H(), null === n && (n = O(), null === n && (n = W(), null === n && (n = z(), null === n && (n = I(), null === n && (n = J(), null === n && (n = K(), null === n && (n = N(), null === n && (n = P(), null === n && (n = V(), null === n && (n = X(), null === n && (n = _(), null === n && (n = nl(), null === n && (n = ll(), null === n && (n = ul(), null === n && (n = tl()))))))))))))))))), n;
    }

    function B() {
      var n;
      return n = j(), null === n && (n = q(), null === n && (n = $())), n;
    }

    function j() {
      var l, u;
      return l = qt, 46 === n.charCodeAt(qt) ? (u = ku, qt++) : (u = null, 0 === Wt && e(Tu)), null !== u && (Lt = l, u = xu()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function $() {
      var l, u;
      return Wt++, l = qt, mu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null, 0 === Wt && e(Ru)), null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u, Wt--, null === l && (u = null, 0 === Wt && e(yu)), l;
    }

    function q() {
      var n;
      return n = M(), null === n && (n = D(), null === n && (n = Y(), null === n && (n = H(), null === n && (n = O(), null === n && (n = W(), null === n && (n = z(), null === n && (n = I(), null === n && (n = J(), null === n && (n = K(), null === n && (n = N(), null === n && (n = P(), null === n && (n = V(), null === n && (n = X(), null === n && (n = Z(), null === n && (n = _(), null === n && (n = nl(), null === n && (n = ll(), null === n && (n = ul(), null === n && (n = tl()))))))))))))))))))), n;
    }

    function L() {
      var l, u;
      return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)), null !== u && (Lt = l, u = Su()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function M() {
      var l, u;
      return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)), null !== u && (Lt = l, u = Uu()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function D() {
      var l, u;
      return l = qt, n.substr(qt, 2) === Eu ? (u = Eu, qt += 2) : (u = null, 0 === Wt && e(Gu)), null !== u && (Lt = l, u = Bu()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function H() {
      var l, u;
      return l = qt, n.substr(qt, 2) === ju ? (u = ju, qt += 2) : (u = null, 0 === Wt && e($u)), null !== u && (Lt = l, u = qu()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function O() {
      var l, u;
      return l = qt, n.substr(qt, 2) === Lu ? (u = Lu, qt += 2) : (u = null, 0 === Wt && e(Mu)), null !== u && (Lt = l, u = Du()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function W() {
      var l, u;
      return l = qt, n.substr(qt, 2) === Hu ? (u = Hu, qt += 2) : (u = null, 0 === Wt && e(Ou)), null !== u && (Lt = l, u = Wu()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function z() {
      var l, u;
      return l = qt, n.substr(qt, 2) === zu ? (u = zu, qt += 2) : (u = null, 0 === Wt && e(Iu)), null !== u && (Lt = l, u = Ju()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function I() {
      var l, u;
      return l = qt, n.substr(qt, 2) === Ku ? (u = Ku, qt += 2) : (u = null, 0 === Wt && e(Nu)), null !== u && (Lt = l, u = Pu()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function J() {
      var l, u;
      return l = qt, n.substr(qt, 2) === Vu ? (u = Vu, qt += 2) : (u = null, 0 === Wt && e(Xu)), null !== u && (Lt = l, u = Yu()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function K() {
      var l, u;
      return l = qt, n.substr(qt, 2) === Zu ? (u = Zu, qt += 2) : (u = null, 0 === Wt && e(_u)), null !== u && (Lt = l, u = nt()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function N() {
      var l, u;
      return l = qt, n.substr(qt, 2) === lt ? (u = lt, qt += 2) : (u = null, 0 === Wt && e(ut)), null !== u && (Lt = l, u = tt()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function P() {
      var l, u;
      return l = qt, n.substr(qt, 2) === rt ? (u = rt, qt += 2) : (u = null, 0 === Wt && e(et)), null !== u && (Lt = l, u = ot()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function V() {
      var l, u;
      return l = qt, n.substr(qt, 2) === ct ? (u = ct, qt += 2) : (u = null, 0 === Wt && e(it)), null !== u && (Lt = l, u = at()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function X() {
      var l, u;
      return l = qt, n.substr(qt, 2) === ft ? (u = ft, qt += 2) : (u = null, 0 === Wt && e(st)), null !== u && (Lt = l, u = ht()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function Y() {
      var l, u, t;
      return l = qt, n.substr(qt, 2) === dt ? (u = dt, qt += 2) : (u = null, 0 === Wt && e(pt)), null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)), null !== t ? (Lt = l, u = wt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il), l;
    }

    function Z() {
      var l, u, t;
      return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)), null !== u ? (gt.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(bt)), null !== t ? (Lt = l, u = kt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il), l;
    }

    function _() {
      var l, u, t, r;

      if (l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)), null !== u) {
        if (t = [], yt.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(mt)), null !== r) for (; null !== r;) {
          t.push(r), yt.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(mt));
        } else t = il;
        null !== t ? (Lt = l, u = Rt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il);
      } else qt = l, l = il;

      return l;
    }

    function nl() {
      var l, u, t, r;

      if (l = qt, n.substr(qt, 2) === Ft ? (u = Ft, qt += 2) : (u = null, 0 === Wt && e(Qt)), null !== u) {
        if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)), null !== r) for (; null !== r;) {
          t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut));
        } else t = il;
        null !== t ? (Lt = l, u = Et(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il);
      } else qt = l, l = il;

      return l;
    }

    function ll() {
      var l, u, t, r;

      if (l = qt, n.substr(qt, 2) === Gt ? (u = Gt, qt += 2) : (u = null, 0 === Wt && e(Bt)), null !== u) {
        if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)), null !== r) for (; null !== r;) {
          t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut));
        } else t = il;
        null !== t ? (Lt = l, u = jt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il);
      } else qt = l, l = il;

      return l;
    }

    function ul() {
      var l, u;
      return l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)), null !== u && (Lt = l, u = $t()), null === u ? (qt = l, l = u) : l = u, l;
    }

    function tl() {
      var l, u, t;
      return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)), null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)), null !== t ? (Lt = l, u = bu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il), l;
    }

    var rl,
        el = arguments.length > 1 ? arguments[1] : {},
        ol = {
      regexp: c
    },
        cl = c,
        il = null,
        al = '',
        fl = '|',
        sl = '"|"',
        hl = function hl(n, l) {
      return l ? new Alternate(n, l[1]) : n;
    },
        dl = function dl(n, l, u) {
      return new Match([n].concat(l).concat([u]));
    },
        pl = '^',
        vl = '"^"',
        wl = function wl() {
      return new Token('start');
    },
        Al = '$',
        Cl = '"$"',
        gl = function gl() {
      return new Token('end');
    },
        bl = function bl(n, l) {
      return new Quantified(n, l);
    },
        kl = 'Quantifier',
        Tl = function Tl(n, l) {
      return l && (n.greedy = !1), n;
    },
        xl = '{',
        yl = '"{"',
        ml = ',',
        Rl = '","',
        Fl = '}',
        Ql = '"}"',
        Sl = function Sl(n, l) {
      return new Quantifier(n, l);
    },
        Ul = ',}',
        El = '",}"',
        Gl = function Gl(n) {
      return new Quantifier(n, 1 / 0);
    },
        Bl = function Bl(n) {
      return new Quantifier(n, n);
    },
        jl = '+',
        $l = '"+"',
        ql = function ql() {
      return new Quantifier(1, 1 / 0);
    },
        Ll = '*',
        Ml = '"*"',
        Dl = function Dl() {
      return new Quantifier(0, 1 / 0);
    },
        Hl = '?',
        Ol = '"?"',
        Wl = function Wl() {
      return new Quantifier(0, 1);
    },
        zl = /^[0-9]/,
        Il = '[0-9]',
        Jl = function Jl(n) {
      return +n.join('');
    },
        Kl = '(',
        Nl = '"("',
        Pl = ')',
        Vl = '")"',
        Xl = function Xl(n) {
      return n;
    },
        Yl = function Yl(n) {
      return new CaptureGroup(n);
    },
        Zl = '?:',
        _l = '"?:"',
        nu = function nu(n) {
      return new Group('non-capture-group', n);
    },
        lu = '?=',
        uu = '"?="',
        tu = function tu(n) {
      return new Group('positive-lookahead', n);
    },
        ru = '?!',
        eu = '"?!"',
        ou = function ou(n) {
      return new Group('negative-lookahead', n);
    },
        cu = 'CharacterSet',
        iu = '[',
        au = '"["',
        fu = ']',
        su = '"]"',
        hu = function hu(n, l) {
      return new CharSet(!!n, l);
    },
        du = 'CharacterRange',
        pu = '-',
        vu = '"-"',
        wu = function wu(n, l) {
      return new CharacterRange(n, l);
    },
        Au = 'Character',
        Cu = /^[^\\\]]/,
        gu = '[^\\\\\\]]',
        bu = function bu(n) {
      return new Literal(n);
    },
        ku = '.',
        Tu = '"."',
        xu = function xu() {
      return new Token('any-character');
    },
        yu = 'Literal',
        mu = /^[^|\\\/.[()?+*$\^]/,
        Ru = '[^|\\\\\\/.[()?+*$\\^]',
        Fu = '\\b',
        Qu = '"\\\\b"',
        Su = function Su() {
      return new Token('backspace');
    },
        Uu = function Uu() {
      return new Token('word-boundary');
    },
        Eu = '\\B',
        Gu = '"\\\\B"',
        Bu = function Bu() {
      return new Token('non-word-boundary');
    },
        ju = '\\d',
        $u = '"\\\\d"',
        qu = function qu() {
      return new Token('digit');
    },
        Lu = '\\D',
        Mu = '"\\\\D"',
        Du = function Du() {
      return new Token('non-digit');
    },
        Hu = '\\f',
        Ou = '"\\\\f"',
        Wu = function Wu() {
      return new Token('form-feed');
    },
        zu = '\\n',
        Iu = '"\\\\n"',
        Ju = function Ju() {
      return new Token('line-feed');
    },
        Ku = '\\r',
        Nu = '"\\\\r"',
        Pu = function Pu() {
      return new Token('carriage-return');
    },
        Vu = '\\s',
        Xu = '"\\\\s"',
        Yu = function Yu() {
      return new Token('white-space');
    },
        Zu = '\\S',
        _u = '"\\\\S"',
        nt = function nt() {
      return new Token('non-white-space');
    },
        lt = '\\t',
        ut = '"\\\\t"',
        tt = function tt() {
      return new Token('tab');
    },
        rt = '\\v',
        et = '"\\\\v"',
        ot = function ot() {
      return new Token('vertical-tab');
    },
        ct = '\\w',
        it = '"\\\\w"',
        at = function at() {
      return new Token('word');
    },
        ft = '\\W',
        st = '"\\\\W"',
        ht = function ht() {
      return new Token('non-word');
    },
        dt = '\\c',
        pt = '"\\\\c"',
        vt = 'any character',
        wt = function wt(n) {
      return new ControlCharacter(n);
    },
        At = '\\',
        Ct = '"\\\\"',
        gt = /^[1-9]/,
        bt = '[1-9]',
        kt = function kt(n) {
      return new BackReference(n);
    },
        Tt = '\\0',
        xt = '"\\\\0"',
        yt = /^[0-7]/,
        mt = '[0-7]',
        Rt = function Rt(n) {
      return new Octal(n.join(''));
    },
        Ft = '\\x',
        Qt = '"\\\\x"',
        St = /^[0-9a-fA-F]/,
        Ut = '[0-9a-fA-F]',
        Et = function Et(n) {
      return new Hex(n.join(''));
    },
        Gt = "\\u",
        Bt = "\"\\\\u\"",
        jt = function jt(n) {
      return new Unicode(n.join(''));
    },
        $t = function $t() {
      return new Token('null-character');
    },
        qt = 0,
        Lt = 0,
        Mt = 0,
        Dt = {
      line: 1,
      column: 1,
      seenCR: !1
    },
        Ht = 0,
        Ot = [],
        Wt = 0;

    if ('startRule' in el) {
      if (!(el.startRule in ol)) throw new Error('Can\'t start parsing from rule "' + el.startRule + '".');
      cl = ol[el.startRule];
    }

    if (Token.offset = t, Token.text = u, rl = cl(), null !== rl && qt === n.length) return rl;
    throw o(Ot), Lt = Math.max(qt, Ht), new l(Ot, Lt < n.length ? n.charAt(Lt) : null, Lt, r(Lt).line, r(Lt).column);
  }

  return n(l, Error), {
    SyntaxError: l,
    parse: u
  };
}(),
    index = 1,
    cgs = {};

var RE = {
  Parser: parser,
  Handler: handler
};

var handler$1 = {
  // template        属性值（即数据模板）
  // name            属性名
  // context         数据上下文，生成后的数据
  // templateContext 模板上下文，
  //
  // Handle.gen(template, name, options)
  // context
  //     currentContext, templateCurrentContext,
  //     path, templatePath
  //     root, templateRoot
  gen: function gen(template, name, context) {
    name = name === undefined ? '' : name.toString();
    context = context || {};
    context = {
      // 当前访问路径，只有属性名，不包括生成规则
      path: context.path || [constant.GUID],
      templatePath: context.templatePath || [constant.GUID++],
      currentContext: context.currentContext,
      templateCurrentContext: context.templateCurrentContext || template,
      root: context.root || context.currentContext,
      templateRoot: context.templateRoot || context.templateCurrentContext || template
    };
    var rule = parse(name);
    var type$1 = type(template);
    var data;

    if (handler$1[type$1]) {
      data = handler$1[type$1]({
        type: type$1,
        template: template,
        name: name,
        rule: rule,
        context: context,
        parsedName: name ? name.replace(constant.RE_KEY, '$1') : name
      });

      if (!context.root) {
        context.root = data;
      }

      return data;
    }

    return template;
  },
  array: function array(options) {
    var result = []; // 'name|1': []
    // 'name|count': []
    // 'name|min-max': []

    if (options.template.length === 0) return result; // 'arr': [{ 'email': '@EMAIL' }, { 'email': '@EMAIL' }]

    if (!options.rule.parameters) {
      for (var i = 0; i < options.template.length; i++) {
        options.context.path.push(i);
        options.context.templatePath.push(i);
        result.push(handler$1.gen(options.template[i], i, {
          path: options.context.path,
          templatePath: options.context.templatePath,
          currentContext: result,
          templateCurrentContext: options.template,
          root: options.context.root || result,
          templateRoot: options.context.templateRoot || options.template
        }));
        options.context.path.pop();
        options.context.templatePath.pop();
      }
    } else {
      // 'method|1': ['GET', 'POST', 'HEAD', 'DELETE']
      if (options.rule.min === 1 && options.rule.max === undefined) {
        // fix Mock.js#17
        options.context.path.push(options.name);
        options.context.templatePath.push(options.name);
        result = Random.pick(handler$1.gen(options.template, undefined, {
          path: options.context.path,
          templatePath: options.context.templatePath,
          currentContext: result,
          templateCurrentContext: options.template,
          root: options.context.root || result,
          templateRoot: options.context.templateRoot || options.template
        }));
        options.context.path.pop();
        options.context.templatePath.pop();
      } else {
        // 'data|+1': [{}, {}]
        if (options.rule.parameters[2]) {
          options.template.__order_index = options.template.__order_index || 0;
          options.context.path.push(options.name);
          options.context.templatePath.push(options.name);
          result = handler$1.gen(options.template, undefined, {
            path: options.context.path,
            templatePath: options.context.templatePath,
            currentContext: result,
            templateCurrentContext: options.template,
            root: options.context.root || result,
            templateRoot: options.context.templateRoot || options.template
          })[options.template.__order_index % options.template.length];
          options.template.__order_index += +options.rule.parameters[2];
          options.context.path.pop();
          options.context.templatePath.pop();
        } else {
          // 'data|1-10': [{}]
          for (var i = 0; i < options.rule.count; i++) {
            // 'data|1-10': [{}, {}]
            for (var ii = 0; ii < options.template.length; ii++) {
              options.context.path.push(result.length);
              options.context.templatePath.push(ii);
              result.push(handler$1.gen(options.template[ii], result.length, {
                path: options.context.path,
                templatePath: options.context.templatePath,
                currentContext: result,
                templateCurrentContext: options.template,
                root: options.context.root || result,
                templateRoot: options.context.templateRoot || options.template
              }));
              options.context.path.pop();
              options.context.templatePath.pop();
            }
          }
        }
      }
    }

    return result;
  },
  object: function object(options) {
    var result = {};
    var keys$1;
    var fnKeys;
    var key;
    var parsedKey;
    var inc;
    var i; // 'obj|min-max': {}

    if (options.rule.min != undefined) {
      keys$1 = keys(options.template);
      keys$1 = Random.shuffle(keys$1);
      keys$1 = keys$1.slice(0, options.rule.count);

      for (i = 0; i < keys$1.length; i++) {
        key = keys$1[i];
        parsedKey = key.replace(constant.RE_KEY, '$1');
        options.context.path.push(parsedKey);
        options.context.templatePath.push(key);
        result[parsedKey] = handler$1.gen(options.template[key], key, {
          path: options.context.path,
          templatePath: options.context.templatePath,
          currentContext: result,
          templateCurrentContext: options.template,
          root: options.context.root || result,
          templateRoot: options.context.templateRoot || options.template
        });
        options.context.path.pop();
        options.context.templatePath.pop();
      }
    } else {
      // 'obj': {}
      keys$1 = [];
      fnKeys = []; // Mock.js#25 改变了非函数属性的顺序，查找起来不方便

      for (key in options.template) {
        var target = typeof options.template[key] === 'function' ? fnKeys : keys$1;
        target.push(key);
      }

      keys$1 = keys$1.concat(fnKeys);

      for (i = 0; i < keys$1.length; i++) {
        key = keys$1[i];
        parsedKey = key.replace(constant.RE_KEY, '$1');
        options.context.path.push(parsedKey);
        options.context.templatePath.push(key);
        result[parsedKey] = handler$1.gen(options.template[key], key, {
          path: options.context.path,
          templatePath: options.context.templatePath,
          currentContext: result,
          templateCurrentContext: options.template,
          root: options.context.root || result,
          templateRoot: options.context.templateRoot || options.template
        });
        options.context.path.pop();
        options.context.templatePath.pop(); // 'id|+1': 1

        inc = key.match(constant.RE_KEY);

        if (inc && inc[2] && type(options.template[key]) === 'number') {
          options.template[key] += parseInt(inc[2], 10);
        }
      }
    }

    return result;
  },
  number: function number(options) {
    var result;
    var parts;

    if (options.rule.decimal) {
      // float
      options.template += '';
      parts = options.template.split('.'); // 'float1|.1-10': 10,
      // 'float2|1-100.1-10': 1,
      // 'float3|999.1-10': 1,
      // 'float4|.3-10': 123.123,

      parts[0] = options.rule.range ? options.rule.count : parts[0];
      parts[1] = (parts[1] || '').slice(0, options.rule.dcount);

      while (parts[1].length < options.rule.dcount) {
        parts[1] += // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
        parts[1].length < options.rule.dcount - 1 ? Random.character('number') : Random.character('123456789');
      }

      result = parseFloat(parts.join('.'));
    } else {
      // integer
      // 'grade1|1-100': 1,
      result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template;
    }

    return result;
  },
  "boolean": function boolean(options) {
    // 'prop|multiple': false, 当前值是相反值的概率倍数
    // 'prop|probability-probability': false, 当前值与相反值的概率
    var result = options.rule.parameters ? Random.bool(options.rule.min, options.rule.max, options.template) : options.template;
    return result;
  },
  string: function string(options) {
    var result = '';
    var placeholders;
    var ph;
    var phed;

    if (options.template.length) {
      // 'foo': '★',
      if (options.rule.count == undefined) {
        result += options.template;
      } // 'star|1-5': '★',


      for (var i = 0; i < options.rule.count; i++) {
        result += options.template;
      } // 'email|1-10': '@EMAIL, ',


      placeholders = result.match(constant.RE_PLACEHOLDER) || []; // A-Z_0-9 > \w_

      for (var i = 0; i < placeholders.length; i++) {
        ph = placeholders[i]; // 遇到转义斜杠，不需要解析占位符

        if (/^\\/.test(ph)) {
          placeholders.splice(i--, 1);
          continue;
        }

        phed = handler$1.placeholder(ph, options.context.currentContext, options.context.templateCurrentContext, options); // 只有一个占位符，并且没有其他字符

        if (placeholders.length === 1 && ph === result && _typeof(phed) !== _typeof(result)) {
          result = phed;
          break;
        }

        result = result.replace(ph, phed);
      }
    } else {
      // 'ASCII|1-10': '',
      // 'ASCII': '',
      result = options.rule.range ? Random.string(options.rule.count) : options.template;
    }

    return result;
  },
  "function": function _function(options) {
    // ( context, options )
    return options.template.call(options.context.currentContext, options);
  },
  regexp: function regexp(options) {
    var source = ''; // 'name': /regexp/,

    if (options.rule.count == undefined) {
      source += options.template.source; // regexp.source
    } // 'name|1-5': /regexp/,


    for (var i = 0; i < options.rule.count; i++) {
      source += options.template.source;
    }

    return RE.Handler.gen(RE.Parser.parse(source));
  },
  _all: function _all() {
    var re = {};

    for (var key in Random) {
      re[key.toLowerCase()] = key;
    }

    return re;
  },
  // 处理占位符，转换为最终值
  placeholder: function placeholder(_placeholder, obj, templateContext, options) {
    // 1 key, 2 params
    // regexp init
    constant.RE_PLACEHOLDER.exec('');
    var parts = constant.RE_PLACEHOLDER.exec(_placeholder);
    var key = parts && parts[1];
    var lkey = key && key.toLowerCase();

    var okey = handler$1._all()[lkey];

    var paramsInput = parts && parts[2] || '';
    var pathParts = handler$1.splitPathToArray(key);
    var params = []; // 解析占位符的参数

    try {
      // 1. 尝试保持参数的类型
      // #24 [Window Firefox 30.0 引用 占位符 抛错](https://github.com/nuysoft/Mock/issues/24)
      // [BX9056: 各浏览器下 window.eval 方法的执行上下文存在差异](http://www.w3help.org/zh-cn/causes/BX9056)
      // 应该属于 Window Firefox 30.0 的 BUG
      params = eval('(function(){ return [].splice.call(arguments, 0 ) })(' + paramsInput + ')');
    } catch (error) {
      // 2. 如果失败，只能解析为字符串
      params = paramsInput.split(/,\s*/);
    } // 占位符优先引用数据模板中的属性
    // { first: '@EMAIL', full: '@first' } =>  { first: 'dsa@163.com', full: 'dsa@163.com' }


    if (obj && key in obj) {
      return obj[key];
    } // 绝对路径 or 相对路径


    if (key.charAt(0) === '/' || pathParts.length > 1) {
      return handler$1.getValueByKeyPath(key, options);
    } // 递归引用数据模板中的属性
    // fix Mock.js#15 避免自己依赖自己)


    if (templateContext && _typeof(templateContext) === 'object' && key in templateContext && _placeholder !== templateContext[key]) {
      // 先计算被引用的属性值
      templateContext[key] = handler$1.gen(templateContext[key], key, {
        currentContext: obj,
        templateCurrentContext: templateContext
      });
      return templateContext[key];
    } // 如果未找到，则原样返回


    if (!(key in Random) && !(lkey in Random) && !(okey in Random)) {
      return _placeholder;
    } // 递归解析参数中的占位符


    for (var i = 0; i < params.length; i++) {
      constant.RE_PLACEHOLDER.exec('');

      if (constant.RE_PLACEHOLDER.test(params[i])) {
        params[i] = handler$1.placeholder(params[i], obj, templateContext, options);
      }
    }

    var handle = Random[key] || Random[lkey] || Random[okey];

    switch (type(handle)) {
      case 'array':
        // 自动从数组中取一个，例如 @areas
        return Random.pick(handle);

      case 'function':
        // 执行占位符方法（大多数情况）
        handle.options = options;
        var re = handle.apply(Random, params); // 因为是在字符串中，所以默认为空字符串。

        if (re === undefined) {
          re = '';
        }

        delete handle.options;
        return re;
    }
  },
  getValueByKeyPath: function getValueByKeyPath(key, options) {
    var originalKey = key;
    var keyPathParts = handler$1.splitPathToArray(key);
    var absolutePathParts = []; // 绝对路径

    if (key.charAt(0) === '/') {
      absolutePathParts = [options.context.path[0]].concat(handler$1.normalizePath(keyPathParts));
    } else {
      // 相对路径
      if (keyPathParts.length > 1) {
        absolutePathParts = options.context.path.slice(0);
        absolutePathParts.pop();
        absolutePathParts = handler$1.normalizePath(absolutePathParts.concat(keyPathParts));
      }
    }

    key = keyPathParts[keyPathParts.length - 1];
    var currentContext = options.context.root;
    var templateCurrentContext = options.context.templateRoot;

    for (var i = 1; i < absolutePathParts.length - 1; i++) {
      currentContext = currentContext[absolutePathParts[i]];
      templateCurrentContext = templateCurrentContext[absolutePathParts[i]];
    } // 引用的值已经计算好


    if (currentContext && key in currentContext) {
      return currentContext[key];
    } // 尚未计算，递归引用数据模板中的属性
    // fix #15 避免自己依赖自己


    if (templateCurrentContext && _typeof(templateCurrentContext) === 'object' && key in templateCurrentContext && originalKey !== templateCurrentContext[key]) {
      // 先计算被引用的属性值
      templateCurrentContext[key] = handler$1.gen(templateCurrentContext[key], key, {
        currentContext: currentContext,
        templateCurrentContext: templateCurrentContext
      });
      return templateCurrentContext[key];
    }
  },
  // https://github.com/kissyteam/kissy/blob/master/src/path/src/path.js
  normalizePath: function normalizePath(pathParts) {
    var newPathParts = [];

    for (var i = 0; i < pathParts.length; i++) {
      switch (pathParts[i]) {
        case '..':
          newPathParts.pop();
          break;

        case '.':
          break;

        default:
          newPathParts.push(pathParts[i]);
      }
    }

    return newPathParts;
  },
  splitPathToArray: function splitPathToArray(path) {
    return path.split(/\/+/).filter(function (_) {
      return _;
    });
  }
};

// 把 Mock.js 风格的数据模板转换成 JSON Schema。

function toJSONSchema(template, name, path
/* Internal Use Only */
) {
  // type rule properties items
  path = path || [];
  var result = {
    name: typeof name === 'string' ? name.replace(constant.RE_KEY, '$1') : name,
    template: template,
    type: type(template),
    rule: parse(name)
  };
  result.path = path.slice(0);
  result.path.push(name === undefined ? 'ROOT' : result.name);

  switch (result.type) {
    case 'array':
      result.items = [];
      each(template, function (value, index) {
        result.items.push(toJSONSchema(value, index, result.path));
      });
      break;

    case 'object':
      result.properties = [];
      each(template, function (value, key) {
        result.properties.push(toJSONSchema(value, key, result.path));
      });
      break;
  }

  return result;
}

// ## valid(template, data)
//     有生成规则：比较解析后的 name
//     无生成规则：直接比较
// ## type
//     无类型转换：直接比较
//     有类型转换：先试着解析 template，然后再检查？
// ## value vs. template
//     基本类型
//         无生成规则：直接比较
//         有生成规则：
//             number
//                 min-max.dmin-dmax
//                 min-max.dcount
//                 count.dmin-dmax
//                 count.dcount
//                 +step
//                 整数部分
//                 小数部分
//             boolean
//             string
//                 min-max
//                 count
// ## properties
//     对象
//         有生成规则：检测期望的属性个数，继续递归
//         无生成规则：检测全部的属性个数，继续递归
// ## items
//     数组
//         有生成规则：
//             `'name|1': [{}, {} ...]`            其中之一，继续递归
//             `'name|+1': [{}, {} ...]`           顺序检测，继续递归
//             `'name|min-max': [{}, {} ...]`      检测个数，继续递归
//             `'name|count': [{}, {} ...]`        检测个数，继续递归
//         无生成规则：检测全部的元素个数，继续递归

var Diff = {
  diff: function diff(schema, data, name
  /* Internal Use Only */
  ) {
    var result = []; // 先检测名称 name 和类型 type，如果匹配，才有必要继续检测

    if (this.name(schema, data, name, result) && this.type(schema, data, name, result)) {
      this.value(schema, data, name, result);
      this.properties(schema, data, name, result);
      this.items(schema, data, name, result);
    }

    return result;
  },

  /* jshint unused:false */
  name: function name(schema, data, _name, result) {
    var length = result.length;
    Assert.equal('name', schema.path, _name + '', schema.name + '', result);
    return result.length === length;
  },
  type: function type$1(schema, data, name, result) {
    var length = result.length;

    switch (schema.type) {
      case 'string':
        // 跳过含有『占位符』的属性值，因为『占位符』返回值的类型可能和模板不一致，例如 '@int' 会返回一个整形值
        if (schema.template.match(constant.RE_PLACEHOLDER)) return true;
        break;

      case 'array':
        if (schema.rule.parameters) {
          // name|count: array
          if (schema.rule.min !== undefined && schema.rule.max === undefined) {
            // 跳过 name|1: array，因为最终值的类型（很可能）不是数组，也不一定与 `array` 中的类型一致
            if (schema.rule.count === 1) {
              return true;
            }
          } // 跳过 name|+inc: array


          if (schema.rule.parameters[2]) {
            return true;
          }
        }

        break;

      case 'function':
        // 跳过 `'name': function`，因为函数可以返回任何类型的值。
        return true;
    }

    Assert.equal('type', schema.path, type(data), schema.type, result);
    return result.length === length;
  },
  value: function value(schema, data, name, result) {
    var length = result.length;
    var rule = schema.rule;
    var templateType = schema.type;

    if (templateType === 'object' || templateType === 'array' || templateType === 'function') {
      return true;
    } // 无生成规则


    if (!rule.parameters) {
      switch (templateType) {
        case 'regexp':
          Assert.match('value', schema.path, data, schema.template, result);
          return result.length === length;

        case 'string':
          // 同样跳过含有『占位符』的属性值，因为『占位符』的返回值会通常会与模板不一致
          if (schema.template.match(constant.RE_PLACEHOLDER)) {
            return result.length === length;
          }

          break;
      }

      Assert.equal('value', schema.path, data, schema.template, result);
      return result.length === length;
    } // 有生成规则


    var actualRepeatCount;

    switch (templateType) {
      case 'number':
        var parts = (data + '').split('.');
        parts[0] = +parts[0]; // 整数部分
        // |min-max

        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('value', schema.path, parts[0], Math.min(rule.min, rule.max), result); // , 'numeric instance is lower than the required minimum (minimum: {expected}, found: {actual})')

          Assert.lessThanOrEqualTo('value', schema.path, parts[0], Math.max(rule.min, rule.max), result);
        } // |count


        if (rule.min !== undefined && rule.max === undefined) {
          Assert.equal('value', schema.path, parts[0], rule.min, result, '[value] ' + name);
        } // 小数部分


        if (rule.decimal) {
          // |dmin-dmax
          if (rule.dmin !== undefined && rule.dmax !== undefined) {
            Assert.greaterThanOrEqualTo('value', schema.path, parts[1].length, rule.dmin, result);
            Assert.lessThanOrEqualTo('value', schema.path, parts[1].length, rule.dmax, result);
          } // |dcount


          if (rule.dmin !== undefined && rule.dmax === undefined) {
            Assert.equal('value', schema.path, parts[1].length, rule.dmin, result);
          }
        }

        break;

      case 'boolean':
        break;

      case 'string':
        // 'aaa'.match(/a/g)
        actualRepeatCount = data.match(new RegExp(schema.template, 'g'));
        actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0; // |min-max

        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.min, result);
          Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.max, result);
        } // |count


        if (rule.min !== undefined && rule.max === undefined) {
          Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result);
        }

        break;

      case 'regexp':
        actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ''), 'g'));
        actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0; // |min-max

        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.min, result);
          Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.max, result);
        } // |count


        if (rule.min !== undefined && rule.max === undefined) {
          Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result);
        }

        break;
    }

    return result.length === length;
  },
  properties: function properties(schema, data, name, result) {
    var length = result.length;
    var rule = schema.rule;
    var keys$1 = keys(data);

    if (!schema.properties) {
      return;
    } // 无生成规则


    if (!schema.rule.parameters) {
      Assert.equal('properties length', schema.path, keys$1.length, schema.properties.length, result);
    } else {
      // 有生成规则
      // |min-max
      if (rule.min !== undefined && rule.max !== undefined) {
        Assert.greaterThanOrEqualTo('properties length', schema.path, keys$1.length, Math.min(rule.min, rule.max), result);
        Assert.lessThanOrEqualTo('properties length', schema.path, keys$1.length, Math.max(rule.min, rule.max), result);
      } // |count


      if (rule.min !== undefined && rule.max === undefined) {
        // |1, |>1
        if (rule.count !== 1) {
          Assert.equal('properties length', schema.path, keys$1.length, rule.min, result);
        }
      }
    }

    if (result.length !== length) {
      return false;
    }

    var _loop_1 = function _loop_1(i) {
      var property;
      each(schema.properties, function (item
      /*, index*/
      ) {
        if (item.name === keys$1[i]) {
          property = item;
        }
      });
      property = property || schema.properties[i];
      result.push.apply(result, this_1.diff(property, data[keys$1[i]], keys$1[i]));
    };

    var this_1 = this;

    for (var i = 0; i < keys$1.length; i++) {
      _loop_1(i);
    }

    return result.length === length;
  },
  items: function items(schema, data, name, result) {
    var length = result.length;

    if (!schema.items) {
      return;
    }

    var rule = schema.rule; // 无生成规则

    if (!schema.rule.parameters) {
      Assert.equal('items length', schema.path, data.length, schema.items.length, result);
    } else {
      // 有生成规则
      // |min-max
      if (rule.min !== undefined && rule.max !== undefined) {
        Assert.greaterThanOrEqualTo('items', schema.path, data.length, Math.min(rule.min, rule.max) * schema.items.length, result, '[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements');
        Assert.lessThanOrEqualTo('items', schema.path, data.length, Math.max(rule.min, rule.max) * schema.items.length, result, '[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements');
      } // |count


      if (rule.min !== undefined && rule.max === undefined) {
        // |1, |>1
        if (rule.count === 1) {
          return result.length === length;
        } else {
          Assert.equal('items length', schema.path, data.length, rule.min * schema.items.length, result);
        }
      } // |+inc


      if (rule.parameters[2]) {
        return result.length === length;
      }
    }

    if (result.length !== length) {
      return false;
    }

    for (var i = 0; i < data.length; i++) {
      result.push.apply(result, this.diff(schema.items[i % schema.items.length], data[i], i % schema.items.length));
    }

    return result.length === length;
  }
}; // 完善、友好的提示信息
//
// Equal, not equal to, greater than, less than, greater than or equal to, less than or equal to
// 路径 验证类型 描述
//
// Expect path.name is less than or equal to expected, but path.name is actual.
//
//   Expect path.name is less than or equal to expected, but path.name is actual.
//   Expect path.name is greater than or equal to expected, but path.name is actual.

var Assert = {
  message: function message(item) {
    if (item.message) {
      return item.message;
    }

    var upperType = item.type.toUpperCase();
    var lowerType = item.type.toLowerCase();
    var path = isArray(item.path) && item.path.join('.') || item.path;
    var action = item.action;
    var expected = item.expected;
    var actual = item.actual;
    return "[" + upperType + "] Expect " + path + "'" + lowerType + " " + action + " " + expected + ", but is " + actual;
  },
  equal: function equal(type, path, actual, expected, result, message) {
    if (actual === expected) {
      return true;
    }

    switch (type) {
      case 'type':
        // 正则模板 === 字符串最终值
        if (expected === 'regexp' && actual === 'string') {
          return true;
        }

        break;
    }

    var item = {
      path: path,
      type: type,
      actual: actual,
      expected: expected,
      action: 'is equal to',
      message: message
    };
    item.message = Assert.message(item);
    result.push(item);
    return false;
  },
  // actual matches expected
  match: function match(type, path, actual, expected, result, message) {
    if (expected.test(actual)) {
      return true;
    }

    var item = {
      path: path,
      type: type,
      actual: actual,
      expected: expected,
      action: 'matches',
      message: message
    };
    item.message = Assert.message(item);
    result.push(item);
    return false;
  },
  notEqual: function notEqual(type, path, actual, expected, result, message) {
    if (actual !== expected) {
      return true;
    }

    var item = {
      path: path,
      type: type,
      actual: actual,
      expected: expected,
      action: 'is not equal to',
      message: message
    };
    item.message = Assert.message(item);
    result.push(item);
    return false;
  },
  greaterThan: function greaterThan(type, path, actual, expected, result, message) {
    if (actual > expected) {
      return true;
    }

    var item = {
      path: path,
      type: type,
      actual: actual,
      expected: expected,
      action: 'is greater than',
      message: message
    };
    item.message = Assert.message(item);
    result.push(item);
    return false;
  },
  lessThan: function lessThan(type, path, actual, expected, result, message) {
    if (actual < expected) {
      return true;
    }

    var item = {
      path: path,
      type: type,
      actual: actual,
      expected: expected,
      action: 'is less to',
      message: message
    };
    item.message = Assert.message(item);
    result.push(item);
    return false;
  },
  greaterThanOrEqualTo: function greaterThanOrEqualTo(type, path, actual, expected, result, message) {
    if (actual >= expected) {
      return true;
    }

    var item = {
      path: path,
      type: type,
      actual: actual,
      expected: expected,
      action: 'is greater than or equal to',
      message: message
    };
    item.message = Assert.message(item);
    result.push(item);
    return false;
  },
  lessThanOrEqualTo: function lessThanOrEqualTo(type, path, actual, expected, result, message) {
    if (actual <= expected) {
      return true;
    }

    var item = {
      path: path,
      type: type,
      actual: actual,
      expected: expected,
      action: 'is less than or equal to',
      message: message
    };
    item.message = Assert.message(item);
    result.push(item);
    return false;
  }
};

var valid = function valid(template, data) {
  var schema = toJSONSchema(template);
  return Diff.diff(schema, data);
};

valid.Diff = Diff;
valid.Assert = Assert;

var _XMLHttpRequest = XMLHttpRequest;
var _ActiveXObject = window.ActiveXObject; // PhantomJS
// TypeError: '[object EventConstructor]' is not a constructor (evaluating 'new Event("readystatechange")')
// https://github.com/bluerail/twitter-bootstrap-rails-confirm/issues/18
// https://github.com/ariya/phantomjs/issues/11289

try {
  new Event('custom');
} catch (exception) {
  window.Event = function (type, bubbles, cancelable, detail) {
    var event = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'

    event.initCustomEvent(type, bubbles, cancelable, detail);
    return event;
  };
}

var XHR_STATES;

(function (XHR_STATES) {
  // The object has been constructed.
  XHR_STATES[XHR_STATES["UNSENT"] = 0] = "UNSENT"; // The open() method has been successfully invoked.

  XHR_STATES[XHR_STATES["OPENED"] = 1] = "OPENED"; // All redirects (if any) have been followed and all HTTP headers of the response have been received.

  XHR_STATES[XHR_STATES["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED"; // The response's body is being received.

  XHR_STATES[XHR_STATES["LOADING"] = 3] = "LOADING"; // The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects).

  XHR_STATES[XHR_STATES["DONE"] = 4] = "DONE";
})(XHR_STATES || (XHR_STATES = {}));

var XHR_EVENTS = ['readystatechange', 'loadstart', 'progress', 'abort', 'error', 'load', 'timeout', 'loadend'];
var XHR_REQUEST_PROPERTIES = ['timeout', 'withCredentials'];
var XHR_RESPONSE_PROPERTIES = ['readyState', 'responseURL', 'status', 'statusText', 'responseType', 'response', 'responseText', 'responseXML'];

var MockXMLHttpRequest =
/** @class */
function () {
  function MockXMLHttpRequest() {
    // 标记当前对象为 MockXMLHttpRequest
    this.mock = true; // 是否拦截 Ajax 请求

    this.match = false;
    this.timeout = 0;
    this.readyState = XHR_STATES.UNSENT;
    this.withCredentials = false; // https://xhr.spec.whatwg.org/#the-send()-method

    this.upload = {};
    this.responseURL = '';
    this.status = XHR_STATES.UNSENT;
    this.statusText = ''; // '', 'text', 'arraybuffer', 'blob', 'document', 'json'

    this.responseType = '';
    this.response = null;
    this.responseText = '';
    this.responseXML = '';
    this.UNSENT = XHR_STATES.UNSENT;
    this.OPENED = XHR_STATES.OPENED;
    this.HEADERS_RECEIVED = XHR_STATES.HEADERS_RECEIVED;
    this.LOADING = XHR_STATES.LOADING;
    this.DONE = XHR_STATES.DONE; // 初始化 custom 对象，用于存储自定义属性

    this.custom = {
      events: {},
      requestHeaders: {},
      responseHeaders: {},
      timeout: 0,
      options: {},
      xhr: null,
      template: null,
      async: true
    };
  }

  MockXMLHttpRequest.prototype.open = function (method, url, async, username, password) {
    var _this = this;

    if (async === void 0) {
      async = true;
    }

    objectAssign(this.custom, {
      method: method,
      url: url,
      async: typeof async === 'boolean' ? async : true,
      username: username,
      password: password,
      options: {
        url: url,
        type: method
      }
    });

    this.custom.timeout = function (timeout) {
      if (typeof timeout === 'number') {
        return timeout;
      }

      if (typeof timeout === 'string' && !~timeout.indexOf('-')) {
        return parseInt(timeout, 10);
      }

      if (typeof timeout === 'string' && ~timeout.indexOf('-')) {
        var tmp = timeout.split('-');
        var min = parseInt(tmp[0], 10);
        var max = parseInt(tmp[1], 10);
        return Math.round(Math.random() * (max - min)) + min;
      }

      return 0;
    }(MockXMLHttpRequest.settings.timeout); // 查找与请求参数匹配的数据模板


    var item = find(this.custom.options); // 如果未找到匹配的数据模板，则采用原生 XHR 发送请求。

    if (!item) {
      // 创建原生 XHR 对象，调用原生 open()，监听所有原生事件
      var xhr_1 = createNativeXMLHttpRequest();
      this.custom.xhr = xhr_1; // 初始化所有事件，用于监听原生 XHR 对象的事件

      for (var i = 0; i < XHR_EVENTS.length; i++) {
        xhr_1.addEventListener(XHR_EVENTS[i], function (event) {
          // 同步属性 NativeXMLHttpRequest => MockXMLHttpRequest
          for (var i_1 = 0; i_1 < XHR_RESPONSE_PROPERTIES.length; i_1++) {
            try {
              _this[XHR_RESPONSE_PROPERTIES[i_1]] = xhr_1[XHR_RESPONSE_PROPERTIES[i_1]];
            } catch (e) {}
          } // 触发 MockXMLHttpRequest 上的同名事件


          _this.dispatchEvent(new Event(event.type));
        });
      } // xhr.open()


      if (username) {
        xhr_1.open(method, url, async, username, password);
      } else {
        xhr_1.open(method, url, async);
      } // 同步属性 MockXMLHttpRequest => NativeXMLHttpRequest


      for (var i = 0; i < XHR_REQUEST_PROPERTIES.length; i++) {
        try {
          xhr_1[XHR_REQUEST_PROPERTIES[i]] = this[XHR_REQUEST_PROPERTIES[i]];
        } catch (e) {}
      }

      return;
    } // 找到了匹配的数据模板，开始拦截 XHR 请求


    this.match = true;
    this.custom.template = item;
    this.readyState = XHR_STATES.OPENED;
    this.dispatchEvent(new Event('readystatechange'));
  }; // Combines a header in author request headers.


  MockXMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    // 原生 XHR
    if (!this.match) {
      this.custom.xhr.setRequestHeader(name, value);
      return;
    } // 拦截 XHR


    var requestHeaders = this.custom.requestHeaders;

    if (requestHeaders[name]) {
      requestHeaders[name] += ',' + value;
    } else {
      requestHeaders[name] = value;
    }
  }; // Initiates the request.


  MockXMLHttpRequest.prototype.send = function (data) {
    var _this = this;

    this.custom.options.body = data; // 原生 XHR

    if (!this.match) {
      this.custom.xhr.send(data);
      return;
    } // 拦截 XHR
    // X-Requested-With header


    this.setRequestHeader('X-Requested-With', 'MockXMLHttpRequest'); // loadstart The fetch initiates.

    this.dispatchEvent(new Event('loadstart'));

    var done = function done() {
      _this.readyState = XHR_STATES.HEADERS_RECEIVED;

      _this.dispatchEvent(new Event('readystatechange'));

      _this.readyState = XHR_STATES.LOADING;

      _this.dispatchEvent(new Event('readystatechange'));

      _this.status = 200;
      _this.statusText = 'OK'; // fix #92 #93 by @qddegtya

      _this.response = _this.responseText = JSON.stringify(convert(_this.custom.template, _this.custom.options), null, 4);
      _this.readyState = XHR_STATES.DONE;

      _this.dispatchEvent(new Event('readystatechange'));

      _this.dispatchEvent(new Event('load'));

      _this.dispatchEvent(new Event('loadend'));
    };

    if (this.custom.async) {
      // 异步
      setTimeout(done, this.custom.timeout);
    } else {
      // 同步
      done();
    }
  }; // https://xhr.spec.whatwg.org/#the-abort()-method
  // Cancels any network activity.


  MockXMLHttpRequest.prototype.abort = function () {
    // 原生 XHR
    if (!this.match) {
      this.custom.xhr.abort();
      return;
    } // 拦截 XHR


    this.readyState = XHR_STATES.UNSENT;
    this.dispatchEvent(new window.Event('abort', false, false, this));
    this.dispatchEvent(new window.Event('error', false, false, this));
  }; // https://xhr.spec.whatwg.org/#the-getresponseheader()-method


  MockXMLHttpRequest.prototype.getResponseHeader = function (name) {
    // 原生 XHR
    if (!this.match) {
      return this.custom.xhr.getResponseHeader(name);
    } // 拦截 XHR


    return this.custom.responseHeaders[name.toLowerCase()];
  }; // https://xhr.spec.whatwg.org/#the-getallresponseheaders()-method
  // http://www.utf8-chartable.de/


  MockXMLHttpRequest.prototype.getAllResponseHeaders = function () {
    // 原生 XHR
    if (!this.match) {
      return this.custom.xhr.getAllResponseHeaders();
    } // 拦截 XHR


    var responseHeaders = this.custom.responseHeaders;
    var headers = '';

    for (var h in responseHeaders) {
      if (!responseHeaders.hasOwnProperty(h)) {
        continue;
      }

      headers += h + ': ' + responseHeaders[h] + '\r\n';
    }

    return headers;
  };

  MockXMLHttpRequest.prototype.overrideMimeType = function () {};

  MockXMLHttpRequest.prototype.addEventListener = function (type, handle) {
    var events = this.custom.events;

    if (!events[type]) {
      events[type] = [];
    }

    events[type].push(handle);
  };

  MockXMLHttpRequest.prototype.removeEventListener = function (type, handle) {
    var handles = this.custom.events[type] || [];

    for (var i = 0; i < handles.length; i++) {
      if (handles[i] === handle) {
        handles.splice(i--, 1);
      }
    }
  };

  MockXMLHttpRequest.prototype.dispatchEvent = function (event) {
    var handles = this.custom.events[event.type] || [];

    for (var i = 0; i < handles.length; i++) {
      handles[i].call(this, event);
    }

    var onType = 'on' + event.type;

    if (this[onType]) {
      this[onType](event);
    }
  };

  MockXMLHttpRequest.settings = {
    timeout: '10-100'
  };

  MockXMLHttpRequest.setup = function (settings) {
    objectAssign(MockXMLHttpRequest.settings, settings);
    return MockXMLHttpRequest.settings;
  };

  MockXMLHttpRequest.Mock = {};
  MockXMLHttpRequest.UNSENT = XHR_STATES.UNSENT;
  MockXMLHttpRequest.OPENED = XHR_STATES.OPENED;
  MockXMLHttpRequest.HEADERS_RECEIVED = XHR_STATES.HEADERS_RECEIVED;
  MockXMLHttpRequest.LOADING = XHR_STATES.LOADING;
  MockXMLHttpRequest.DONE = XHR_STATES.DONE;
  return MockXMLHttpRequest;
}(); // Inspired by jQuery


function createNativeXMLHttpRequest() {
  var isLocal = function () {
    var rLocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
    var rUrl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
    var ajaxLocation = location.href;
    var ajaxLocParts = rUrl.exec(ajaxLocation.toLowerCase()) || [];
    return rLocalProtocol.test(ajaxLocParts[1]);
  }();

  return window.ActiveXObject ? !isLocal && createStandardXHR() || createActiveXHR() : createStandardXHR();

  function createStandardXHR() {
    try {
      return new _XMLHttpRequest();
    } catch (e) {}
  }

  function createActiveXHR() {
    try {
      return new _ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {}
  }
} // 查找与请求参数匹配的数据模板：URL，Type


function find(options) {
  var mockedItems = values(MockXMLHttpRequest.Mock.mocked);

  for (var i = 0; i < mockedItems.length; i++) {
    var item = mockedItems[i];
    var urlMatched = matchUrl(item.rurl, options.url);
    var typeMatched = matchType(item.rtype, options.type);

    if (!item.rtype && urlMatched) {
      return item;
    }

    if (urlMatched && typeMatched) {
      return item;
    }
  }

  function matchUrl(expected, actual) {
    if (isString(expected)) {
      if (expected === actual) {
        return true;
      } // expected: /hello/world
      // actual: /hello/world?type=1


      if (actual.indexOf(expected) === 0 && actual[expected.length] === '?') {
        return true;
      }
    }

    if (isRegExp(expected)) {
      return expected.test(actual);
    }

    return false;
  }

  function matchType(expected, actual) {
    if (isString(expected) || isRegExp(expected)) {
      return new RegExp(expected, 'i').test(actual);
    }

    return false;
  }
} // 数据模板 ＝> 响应数据

function convert(item, options) {
  return isFunction(item.template) ? item.template(options) : MockXMLHttpRequest.Mock.mock(item.template);
}

var _nativeFetch = fetch;
var _nativeRequest = Request;

function extendRequest(request, input, init) {
  if (isString(input)) {
    request['_actualUrl'] = input;
  }

  if (init && init.body) {
    request['_actualBody'] = init.body;
  }

  if (input instanceof _nativeRequest && !init) {
    request['_actualUrl'] = input['_actualUrl'];
    request['_actualBody'] = input['_actualBody'];
  }

  return request;
}

var MockRequest;
/**
 * 拦截 window.Request 实例化
 * 原生 Request 对象被实例化后，对 request.url 取值得到的是拼接后的 url:
 *   const request = new Request('/path/to')
 *   console.log(request.url) => 'http://example.com/path/to'
 * 原生 Request 对象被实例化后，对 request.body 取值得到的是 undefined:
 *   const request = new Request('/path/to', { method: 'POST', body: 'foo=1' })
 *   console.log(request.body) => undefined
 */

if (window.Proxy) {
  MockRequest = new Proxy(_nativeRequest, {
    construct: function construct(target, _a) {
      var input = _a[0],
          init = _a[1];
      var request = new target(input, init);
      return extendRequest(request, input, init);
    }
  });
} else {
  MockRequest = function MockRequest(input, init) {
    var request = new _nativeRequest(input, init);
    return extendRequest(request, input, init);
  };

  MockRequest.prototype = _nativeRequest.prototype;
} // 拦截 fetch 方法
// https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch


function MockFetch(input, init) {
  var request;

  if (input instanceof Request && !init) {
    request = input;
  } else {
    request = new Request(input, init);
  } // 优先获取自己扩展的 _actualUrl 和 _actualBody


  var options = {
    url: request['_actualUrl'] || request.url,
    type: request.method,
    body: request['_actualBody'] || request.body || null
  }; // 查找与请求参数匹配的数据模板

  var item = find(options); // 如果未找到匹配的数据模板，则采用原生 fetch 发送请求。

  if (!item) {
    return _nativeFetch(input, init);
  } // 找到了匹配的数据模板，拦截 fetch 请求


  var response = new Response(JSON.stringify(convert(item, options)), {
    status: 200,
    statusText: 'ok',
    headers: request.headers
  });
  return Promise.resolve(response);
}

function rewriteFetchAndRequest() {
  window.Request = MockRequest;
  window.fetch = MockFetch;
}

// For browser
var Mock = {
  Handler: handler$1,
  Random: Random,
  Util: Util,
  XHR: MockXMLHttpRequest,
  RE: RE,
  toJSONSchema: toJSONSchema,
  valid: valid,
  mock: mock,
  heredoc: heredoc,
  setup: function setup(settings) {
    return MockXMLHttpRequest.setup(settings);
  },
  mocked: {},
  version: '0.1.1'
}; // 避免循环依赖

if (MockXMLHttpRequest) {
  MockXMLHttpRequest.Mock = Mock;
} // 根据数据模板生成模拟数据。


function mock(rurl, rtype, template) {
  assert(arguments.length, 'The mock function needs to pass at least one parameter!'); // Mock.mock(template)

  if (arguments.length === 1) {
    return handler$1.gen(rurl);
  } // Mock.mock(url, template)


  if (arguments.length === 2) {
    template = rtype;
    rtype = undefined;
  } // 拦截 XHR


  window.XMLHttpRequest = MockXMLHttpRequest; // 拦截fetch

  if (window.fetch && isFunction(window.fetch)) {
    rewriteFetchAndRequest();
  }

  var key = String(rurl) + String(rtype);
  Mock.mocked[key] = {
    rurl: rurl,
    rtype: rtype,
    template: template
  };
  return Mock;
}

export default Mock;
