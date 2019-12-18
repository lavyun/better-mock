import mocked from '../../core/mocked'
import { PlatformName, MpGlobal, WxSuccessCallback, MySuccessCallback, MpRequestOptions } from './types'
import { XHRCustomOptions } from '../../types'
import { isFunction } from '../../utils'

// 获取小程序平台标识
function getPlatform (): {
  name: PlatformName,
  global: MpGlobal
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

  return { global, name }
}

const platform = getPlatform()
const platformName = platform.name
const platformRequest = platform.global.request

function MockRequest (opts: MpRequestOptions) {
  const options: XHRCustomOptions = {
    url: opts.url,
    type: opts.method,
    body: opts.data as any || null,
    headers: opts.header || opts.headers || {}
  }

  // 查找与请求参数匹配的数据模板
  const item = mocked.find(opts.url, opts.method)

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

  if (isFunction(opts.success)) {
    opts.success(successOptions)
  }

  if (isFunction(opts.complete)) {
    opts.complete(successOptions)
  }
}

// 覆盖原生的 request 方法
function overrideRequest () {
  platform.global.request = MockRequest
}

export {
  overrideRequest
}

declare global {
  let wx: any
  let my: any
  let tt: any
  let swan: any
}
