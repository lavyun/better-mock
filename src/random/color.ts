// 颜色相关
import * as convert from './color-convert'

const colorMap = {
  navy: '#001F3F',
  blue: '#0074D9',
  aqua: '#7FDBFF',
  teal: '#39CCCC',
  olive: '#3D9970',
  green: '#2ECC40',
  lime: '#01FF70',
  yellow: '#FFDC00',
  orange: '#FF851B',
  red: '#FF4136',
  maroon: '#85144B',
  fuchsia: '#F012BE',
  purple: '#B10DC9',
  silver: '#DDDDDD',
  gray: '#AAAAAA',
  black: '#111111',
  white: '#FFFFFF'
}

// 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。
export const color = function (name: string = '') {
  if (name && colorMap[name]) {
    return colorMap[name]
  }
  return hex()
}

// #DAC0DE
export const hex = function (): string {
  const hsv = _goldenRatioColor()
  const rgb = convert.hsv2rgb(hsv)!
  return convert.rgb2hex(rgb[0], rgb[1], rgb[2])
}

// rgb(128,255,255)
export const rgb = function (): string {
  const hsv = _goldenRatioColor()
  const rgb = convert.hsv2rgb(hsv)!
  return 'rgb(' +
    parseInt(rgb[0].toString(), 10) + ', ' +
    parseInt(rgb[1].toString(), 10) + ', ' +
    parseInt(rgb[2].toString(), 10) + ')'
}

// rgba(128,255,255,0.3)
export const rgba = function (): string {
  const hsv = _goldenRatioColor()
  const rgb = convert.hsv2rgb(hsv)!
  return 'rgba(' +
    parseInt(rgb[0].toString(), 10) + ', ' +
    parseInt(rgb[1].toString(), 10) + ', ' +
    parseInt(rgb[2].toString(), 10) + ', ' +
    Math.random().toFixed(2) + ')'
}

// hsl(300,80%,90%)
export const hsl = function (): string {
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
const _goldenRatioColor = function (saturation?, value?) {
  const _goldenRatio = 0.618033988749895
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
