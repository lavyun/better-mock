import mocked from '../../core/mocked'
import setting from '../../core/setting'
import { PlatformName, MpGlobal, WxSuccessCallback, MySuccessCallback, MpRequestOptions } from './types'
import { XHRCustomOptions } from '../../types'
import { isFunction, assert } from '../../utils'

// 获取小程序平台标识
function getMpPlatform (): {
  name: PlatformName;
  global: MpGlobal;
} {
  let global
  let name
  if (typeof wx !== 'undefined') {
    global = wx
    name = 'wx'
  } else if (typeof my !== 'undefined') {
    global = my
    name = 'my'
  } else if (typeof tt !== 'undefined') {
    global = tt
    name = 'tt'
  } else if (typeof swan !== 'undefined') {
    global = swan
    name = 'swan'
  }

  assert(global && name, 'Invalid mini-program platform, just work in "wx", "my", "tt" or "swan"!')

  return { global, name }
}

const platform = getMpPlatform()
const platformName = platform.name
const platformRequest = platform.global.request

function MockRequest (opts: MpRequestOptions) {
  const options: XHRCustomOptions = {
    url: opts.url,
    type: opts.method || 'GET',
    body: opts.data as any || null,
    headers: opts.header || opts.headers || {}
  }

  // 查找与请求参数匹配的数据模板
  const item = mocked.find(options.url, options.type)

  // 如果未找到匹配的数据模板，则采用原生 request 发送请求。
  if (!item) {
    return platformRequest(opts)
  }

  // 找到了匹配的数据模板，拦截 fetch 请求
  const responseData = mocked.convert(item, options)

  let successOptions: WxSuccessCallback | MySuccessCallback

  if (platformName === 'my') {
    successOptions = {
      status: 200,
      data: responseData,
      headers: {}
    } as MySuccessCallback
  } else {
    successOptions = {
      statusCode: 200,
      data: responseData,
      header: {}
    } as WxSuccessCallback
  }

  if (isFunction(opts.success) || isFunction(opts.complete)) {
    setTimeout(() => {
      isFunction(opts.success) && opts.success(successOptions)
      isFunction(opts.complete) && opts.complete(successOptions)
    }, setting.parseTimeout())
    
  }
}

// 覆盖原生的 request 方法
function overrideRequest () {
  if (!platform.global.request.__MOCK__) {
    // 小程序 API 做了 setter 限制，不能直接复制
    Object.defineProperty(platform.global, 'request', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: MockRequest
    })
    platform.global.request.__MOCK__ = true
  }
}

export {
  overrideRequest,
  getMpPlatform
}

declare global {
  let wx: any
  let my: any
  let tt: any
  let swan: any
}
