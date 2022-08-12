import { isString } from '../../utils'
import { XHRCustomOptions, StringObject } from '../../types'
import mocked from '../../core/mocked'
import setting from '../../core/setting'

const _nativeFetch = fetch
const _nativeRequest = Request

function extendRequest (request: Request, input: RequestInfo, init?: RequestInit | undefined): Request {
  if (isString(input)) {
    request['_actualUrl'] = input
  }
  if (init && init.body) {
    request['_actualBody'] = init.body
  }
  if (input instanceof _nativeRequest && !init) {
    request['_actualUrl'] = input['_actualUrl']
    request['_actualBody'] = input['_actualBody']
  }
  return request
}

type RequestCtor = typeof window.Request

let MockRequest: (RequestCtor | Function) & { __MOCK__?: boolean }
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
    construct (target, [input, init]: [RequestInfo, RequestInit | undefined]): Request {
      const request = new target(input, init)
      return extendRequest(request, input, init)
    }
  })
} /* istanbul ignore next */ else {
  MockRequest = function MockRequest (input: RequestInfo, init?: RequestInit | undefined): Request {
    const request = new _nativeRequest(input, init)
    return extendRequest(request, input, init)
  }
  MockRequest.prototype = _nativeRequest.prototype
}

// 拦截 fetch 方法
// https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch
async function MockFetch (input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
  let request: Request
  if (input instanceof Request && !init) {
    request = input
  } else {
    request = new Request(input, init)
  }

  // 收集请求头
  const headers: StringObject = {}
  request.headers.forEach((value, key) => {
    headers[key] = value
  })

  // 优先获取自己扩展的 _actualUrl 和 _actualBody
  const options: XHRCustomOptions = {
    url: request['_actualUrl'] || request.url,
    type: request.method,
    body: request['_actualBody'] || request.body || null,
    headers: headers
  }

  // 查找与请求参数匹配的数据模板
  const item = mocked.find(options.url, options.type)

  // 如果未找到匹配的数据模板，则采用原生 fetch 发送请求。
  if (!item) {
    return _nativeFetch(input, init)
  }

  // 找到了匹配的数据模板，拦截 fetch 请求
  const result = await mocked.convert(item, options)
  const body = JSON.stringify(result)
  const response = new Response(body, {
    status: 200,
    statusText: 'ok',
    headers: request.headers
  })

  // 异步返回数据
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response)
    }, setting.parseTimeout())
  })
}

function overrideFetchAndRequest () {
  if (window.fetch && !MockRequest.__MOCK__) {
    MockRequest.__MOCK__ = true
    window.Request = MockRequest as RequestCtor
    window.fetch = MockFetch
  }
}

export {
  overrideFetchAndRequest
}
