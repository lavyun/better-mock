// image
import { pick } from './helper'
import { isNumber, assert } from '../util'
import Jimp from 'jimp'

// 常见图片尺寸
const imageSize: string[] = [
  '150x100', '300x200', '400x300', '600x450', '800X600',
  '100x150', '200x300', '300x400', '450x600', '600x800',
  '100x100', '200x200', '300x300', '450x450', '600x600'
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
  size = size || pick(imageSize)

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
    (text ? '&text=' + encodeURIComponent(text) : '')
  )
}

export const img = image

/**
 * 生成一个随机的base64图片
 * @param size 图片宽高
 * @param text 图片上的文字
 */
export const dataImage = function(size?: string, text?: string): string {
  size = size || pick(imageSize)
  text = text || size
  const background: string = pick([
    '#171515', '#e47911', '#183693', '#720e9e', '#c4302b', '#dd4814',
    '#00acee', '#0071c5', '#3d9ae8', '#ec6231', '#003580', '#e51937'
  ])
  const sizes = size!.split('x')
  const width = parseInt(sizes[0], 10)
  const height = parseInt(sizes[1], 10)

  assert(isNumber(width) && isNumber(height), 'Invalid size, expected INTxINT, e.g. 300x400')

  if (process.env.BROWSER) {
    return createBrowserDataImage(width, height, background, text!)
  } else {
    return createNodeDataImage(width, height, background, text!)
  }
}

// browser 端生成 base64 图片
function createBrowserDataImage (width: number, height: number, background: string, text: string) {
  const canvas = document.createElement('canvas')
  const ctx = canvas && canvas.getContext && canvas.getContext('2d')
  if (!canvas || !ctx) {
    return ''
  }

  canvas.width = width
  canvas.height = height
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = background
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 14px sans-serif'
  ctx.fillText(text!, width / 2, height / 2, width)
  return canvas.toDataURL('image/png')
}

// node 端生成 base64 图片
function createNodeDataImage (width: number, height: number, background: string, text: string) {
  const Jimp: Jimp = require('jimp')
  const sync = require('promise-synchronizer')

  // 计算字体的合适大小
  const jimpFontSizePool = [128, 64, 32, 16]
  const expectFontSize = Math.min(width, height) / 3
  const expectFontSizePool = jimpFontSizePool.filter(size => expectFontSize - size >= 0)
  const fontSize = expectFontSizePool[0] || 16
  const fontPath = Jimp[`FONT_SANS_${fontSize}_WHITE`]

  const generateImage = new Promise((resolve, reject) => {
    new Jimp(width, height, background, (err, image) => {
      if (err) {
        reject(err)
      } else {
        Jimp.loadFont(fontPath).then(font => {
          // 文字的真实宽高
          const measureWidth = Jimp.measureText(font, text)
          const measureHeight = Jimp.measureTextHeight(font, text, width)
          // 文字在画布上的目标 x, y
          const targetX = width <= measureWidth ? 0 : (width - measureWidth) / 2
          const targetY = height <= measureHeight ? 0 : (height - measureHeight) / 2
          
          image.print(font, targetX, targetY, text)
          image.getBufferAsync(Jimp.MIME_PNG).then(buffer => {
            resolve('data:image/png;base64,' + buffer.toString('base64'))
          })
        })
      }
    })
  })

  try {
    return sync(generateImage)
  } catch (err) {
    throw err
  }
}
