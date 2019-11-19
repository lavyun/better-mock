import { find, convert } from '../xhr'
import { isString } from '../util'

const _nativeFetch = fetch
const _nativeRequest = Request

function extendRequest(request: Request, input: RequestInfo, init?: RequestInit | undefined): Request {
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

let MockRequest

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
} else {
  MockRequest = function MockRequest (input: RequestInfo, init?: RequestInit | undefined): Request {
    const request = new _nativeRequest(input, init)
    return extendRequest(request, input, init)
  }
  MockRequest.prototype = _nativeRequest.prototype
}

// 拦截 fetch 方法
// https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch
function MockFetch (input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
  let request: Request
  if (input instanceof Request && !init) {
    request = input
  } else {
    request = new Request(input, init)
  }

  // 优先获取自己扩展的 _actualUrl 和 _actualBody
  const options = {
    url: request['_actualUrl'] || request.url,
    type: request.method,
    body: request['_actualBody'] || request.body || null
  }

  // 查找与请求参数匹配的数据模板
  const item = find(options)

  // 如果未找到匹配的数据模板，则采用原生 fetch 发送请求。
  if (!item) {
    return _nativeFetch(input, init)
  }

  // 找到了匹配的数据模板，拦截 fetch 请求
  const response = new Response(JSON.stringify(convert(item, options)), {
    status: 200,
    statusText: 'ok',
    headers: request.headers
  })

  return Promise.resolve(response)
}

function rewriteFetchAndRequest () {
  (window.Request as any) = MockRequest
  window.fetch = MockFetch
}

export default rewriteFetchAndRequest
