// image
import { pick } from './helper'
import { isNumber, assert } from '../utils'

// 常见图片尺寸
const imageSize: string[] = [
  '150x100', '300x200', '400x300', '600x450', '800x600',
  '100x150', '200x300', '300x400', '450x600', '600x800',
  '100x100', '200x200', '300x300', '450x450', '600x600'
]

/**
 * 随机生成一个图片，使用：http://iph.href.lu，例如：
 * https://iph.href.lu/600x400?fg=cc00cc&bg=470047&text=hello
 * @param size 图片大小
 * @param background 背景色
 * @param foreground 文字颜色
 * @param format 图片格式
 * @param text 文字
 */
export const image = function (size = '', background = '', foreground = '', format = '', text = ''): string {
  // Random.image( size, background, foreground, text )
  if (arguments.length === 4) {
    text = format
    format = ''
  }
  // Random.image( size, background, text )
  if (arguments.length === 3) {
    text = foreground
    foreground = ''
  }
  // Random.image( size, text )
  if (arguments.length === 2) {
    text = background
    background = ''
  }
  // Random.image()
  size = size || pick(imageSize)

  if (background && ~background.indexOf('#')) {
    background = background.slice(1)
  }

  if (foreground && ~foreground.indexOf('#')) {
    foreground = foreground.slice(1)
  }

  return format 
    ? (
      'https://dummyimage.com/' +
      size +
      (background ? '/' + background : '') +
      (foreground ? '/' + foreground : '') +
      (format ? '.' + format : '') +
      (text ? '?text=' + encodeURIComponent(text) : '')
    )
    : `https://iph.href.lu/${size}?bg=${background}&fg=${foreground}&text=${text}`
}

export const img = image

/**
 * 生成一个随机的base64图片
 * @param size 图片宽高
 * @param text 图片上的文字
 */
export const dataImage = function (size?: string, text?: string): string {
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

  if (process.env.PLATFORM_BROWSER) {
    return createBrowserDataImage(width, height, background, text!)
  } else if (process.env.PLATFORM_NODE) {
    return createNodeDataImage(width, height, background, text!)
  } else {
    // 小程序无法直接生成 base64 图片，返回空字符串
    return ''
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
// 从 faker.js 借鉴
function createNodeDataImage (width: number, height: number, background: string, text: string) {
  const svgString = [
    `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="${width}" height="${height}">`,
    `<rect width="100%" height="100%" fill="${background}" />`,
    text ? `<text x="${width / 2}" y="${height / 2}" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">${text}</text>` : '',
    `</svg>`
  ].join('');
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString);
}
