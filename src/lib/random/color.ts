// ## Color
//
// http://llllll.li/randomColor/
//     A color generator for JavaScript.
//     randomColor generates attractive colors by default. More specifically, randomColor produces bright colors with a reasonably high saturation. This makes randomColor particularly useful for data visualizations and generative art.
//
// http://randomcolour.com/
//     var bg_colour = Math.floor(Math.random() * 16777215).toString(16);
//     bg_colour = "#" + ("000000" + bg_colour).slice(-6);
//     document.bgColor = bg_colour;
//
// http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
//     Creating random colors is actually more difficult than it seems. The randomness itself is easy, but aesthetically pleasing randomness is more difficult.
//     https://github.com/devongovett/color-generator
//
// http://www.paulirish.com/2009/random-hex-color-code-snippets/
//     Random Hex Color Code Generator in JavaScript
//
// http://chancejs.com/#color
//     chance.color()
//     // => '#79c157'
//     chance.color({format: 'hex'})
//     // => '#d67118'
//     chance.color({format: 'shorthex'})
//     // => '#60f'
//     chance.color({format: 'rgb'})
//     // => 'rgb(110,52,164)'
//
// http://tool.c7sky.com/webcolor
//     网页设计常用色彩搭配表
//
// https://github.com/One-com/one-color
//     An OO-based JavaScript color parser/computation toolkit with support for RGB, HSV, HSL, CMYK, and alpha channels.
//     API 很赞
//
// https://github.com/harthur/color
//     JavaScript color conversion and manipulation library
//
// https://github.com/leaverou/css-colors
//     Share & convert CSS colors
// http://leaverou.github.io/css-colors/#slategray
//     Type a CSS color keyword, #hex, hsl(), rgba(), whatever:
//
// 色调 hue
//     http://baike.baidu.com/view/23368.htm
//     色调指的是一幅画中画面色彩的总体倾向，是大的色彩效果。
// 饱和度 saturation
//     http://baike.baidu.com/view/189644.htm
//     饱和度是指色彩的鲜艳程度，也称色彩的纯度。饱和度取决于该色中含色成分和消色成分（灰色）的比例。含色成分越大，饱和度越大；消色成分越大，饱和度越小。
// 亮度 brightness
//     http://baike.baidu.com/view/34773.htm
//     亮度是指发光体（反光体）表面发光（反光）强弱的物理量。
// 照度 luminosity
//     物体被照亮的程度,采用单位面积所接受的光通量来表示,表示单位为勒[克斯](Lux,lx) ,即 1m / m2 。
//
// http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
//     var letters = '0123456789ABCDEF'.split('')
//     var color = '#'
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)]
//     }
//     return color
//
//     // 随机生成一个无脑的颜色，格式为 '#RRGGBB'。
//     // _brainlessColor()
//     var color = Math.floor(
//         Math.random() *
//         (16 * 16 * 16 * 16 * 16 * 16 - 1)
//     ).toString(16)
//     color = "#" + ("000000" + color).slice(-6)
//     return color.toUpperCase()
import * as convert from './color_convert'
import dict from './color_dict'

// 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。
export const color = function(name) {
  if (name || dict[name]) return dict[name].nicer
  return hex()
}

// #DAC0DE
export const hex = function() {
  const hsv = _goldenRatioColor()
  const rgb = convert.hsv2rgb(hsv)!
  return convert.rgb2hex(rgb[0], rgb[1], rgb[2])
}

// rgb(128,255,255)
export const rgb = function() {
  const hsv = _goldenRatioColor()
  const rgb = convert.hsv2rgb(hsv)!
  return 'rgb(' +
    parseInt(rgb[0].toString(), 10) + ', ' +
    parseInt(rgb[1].toString(), 10) + ', ' +
    parseInt(rgb[2].toString(), 10) + ')'
}

// rgba(128,255,255,0.3)
export const rgba = function() {
  const hsv = _goldenRatioColor()
  const rgb = convert.hsv2rgb(hsv)!
  return 'rgba(' +
    parseInt(rgb[0].toString(), 10) + ', ' +
    parseInt(rgb[1].toString(), 10) + ', ' +
    parseInt(rgb[2].toString(), 10) + ', ' +
    Math.random().toFixed(2) + ')'
}

// hsl(300,80%,90%)
export const hsl = function() {
  const hsv = _goldenRatioColor()
  const hsl = convert.hsv2hsl(hsv)
  return 'hsl(' +
    parseInt(hsl[0], 10) + ', ' +
    parseInt(hsl[1], 10) + ', ' +
    parseInt(hsl[2], 10) + ')'
}

// http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
// https://github.com/devongovett/color-generator/blob/master/index.js
// 随机生成一个有吸引力的颜色。
let _hue: number = 0
const _goldenRatioColor = function(saturation?, value?) {
  let _goldenRatio = 0.618033988749895
  _hue = _hue || Math.random()
  _hue += _goldenRatio
  _hue %= 1
  
  if (typeof saturation !== "number") saturation = 0.5;
  if (typeof value !== "number") value = 0.95;
  
  return [
    _hue * 360,
    saturation * 100,
    value * 100
  ]
}
