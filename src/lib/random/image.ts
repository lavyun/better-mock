// image
import * as helper from './helper'
import * as utils from '../util'

// 常见的广告宽高
const _adSize: string[] = [
  '300x250', '250x250', '240x400', '336x280', '180x150', '720x300', 
  '468x60', '234x60', '88x31', '120x90', '120x60', '120x240', 
  '125x125', '728x90', '160x600', '120x600', '300x600'
]

/**
 * 随机生成一个图片，使用：https://dummyimage.com/，例如：
 * https://dummyimage.com/600x400/cc00cc/470047.png&text=hello
 * @param size 图片大小
 * @param background 背景色
 * @param foreground 文字颜色
 * @param format 图片格式
 * @param text 文字
 */
export const image = function(size?: string, background?: string, foreground?: string, format?: string, text?: string): string {
  // Random.image( size, background, foreground, text )
  if (arguments.length === 4) {
    text = format
    format = undefined
  }
  // Random.image( size, background, text )
  if (arguments.length === 3) {
    text = foreground
    foreground = undefined
  }
  // Random.image( size, text )
  if (arguments.length === 2) {
    text = background
    background = undefined
  }
  // Random.image()
  size = size || helper.pick(_adSize)

  if (background && ~background.indexOf('#')) {
    background = background.slice(1)
  }

  if (foreground && ~foreground.indexOf('#')) {
    foreground = foreground.slice(1)
  }

  return (
    'https://dummyimage.com/' +
    size +
    (background ? '/' + background : '') +
    (foreground ? '/' + foreground : '') +
    (format ? '.' + format : '') +
    (text ? '&text=' + text : '')
  )
}

export const img = image

/**
 * 生成一个随机的base64图片
 * @param size 图片宽高
 * @param text 图片上的文字
 */
export const dataImage = function(size?: string, text?: string): string {
  size = size || helper.pick(_adSize)
  text = text || size
  const background: string = helper.pick([
    '#171515', '#e47911', '#183693', '#720e9e', '#c4302b', '#dd4814',
    '#00acee', '#0071c5', '#3d9ae8', '#ec6231', '#003580', '#e51937'
  ])
  const foreground = '#FFFFFF'
  // browser
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas')
    const ctx = canvas && canvas.getContext && canvas.getContext('2d')
    if (!canvas || !ctx) {
      return ''
    }

    const sizeArr = size!.split('x')
    const width = parseInt(sizeArr[0], 10)
    const height = parseInt(sizeArr[1], 10)

    canvas.width = width
    canvas.height = height
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = background
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = foreground
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText(text!, width / 2, height / 2, width)
    return canvas.toDataURL('image/png')
  } else {
    try {
      const request = require('sync-request')
      const res = request('GET', image(size, background, foreground, text), {
        cache: 'memory',
        timeout: 8000
      })
      const buffer = res.getBody()
      return 'data:image/png;base64,' + buffer.toString('base64')
    } catch(err) {
      if (err.toString().includes('timed out')) {
        utils.logInfo('generate image timeout')
      } else {
        utils.logInfo(err)
      }
      return ''
    }
  }
}
