import { find, convert } from '../xhr'

const _nativeFetch = fetch

const MockFetch = (input: RequestInfo, init?: RequestInit | undefined): Promise<Response> => {
  let request: Request
  if (input instanceof Request && !init) {
    request = input
  } else {
    request = new Request(input, init)
  }

  const options = {
    url: request.url,
    type: request.method,
    body: request.body || null
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

export default MockFetch
