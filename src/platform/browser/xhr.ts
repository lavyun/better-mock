import { createCustomEvent } from '../../utils'
import { XHRCustom, XHRBody } from '../../types'
import mocked from '../../core/mocked'
import setting from '../../core/setting'

// 备份原生 XMLHttpRequest
const _XMLHttpRequest = XMLHttpRequest

enum XHR_STATES {
  // The object has been constructed.
  UNSENT = 0,
  // The open() method has been successfully invoked.
  OPENED = 1,
  // All redirects (if any) have been followed and all HTTP headers of the response have been received.
  HEADERS_RECEIVED = 2,
  // The response's body is being received.
  LOADING = 3,
  // The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects).
  DONE = 4,
}

const XHR_EVENTS = ['readystatechange', 'loadstart', 'progress', 'abort', 'error', 'load', 'timeout', 'loadend']
const XHR_REQUEST_PROPERTIES = ['timeout', 'withCredentials', 'responseType']
const XHR_RESPONSE_PROPERTIES = [
  'readyState',
  'responseURL',
  'status',
  'statusText',
  'response',
  'responseText',
  'responseXML'
]

class MockXMLHttpRequest {
  custom: XHRCustom

  // 标记当前对象为 MockXMLHttpRequest
  mock: boolean = true

  // 是否拦截 Ajax 请求
  match: boolean = false

  timeout: number = 0

  readyState: number = XHR_STATES.UNSENT

  withCredentials: boolean = false

  // https://xhr.spec.whatwg.org/#the-send()-method
  upload: XMLHttpRequestUpload

  responseURL: string = ''

  status: number = XHR_STATES.UNSENT

  statusText: string = ''

  // '', 'text', 'arraybuffer', 'blob', 'document', 'json'
  responseType: string = ''

  response: any = null

  responseText: string = ''

  responseXML: string = ''

  UNSENT: number = XHR_STATES.UNSENT
  OPENED: number = XHR_STATES.OPENED
  HEADERS_RECEIVED: number = XHR_STATES.HEADERS_RECEIVED
  LOADING: number = XHR_STATES.LOADING
  DONE: number = XHR_STATES.DONE
  
  constructor () {
    // 初始化 custom 对象，用于存储自定义属性
    this.custom = {
      events: {},
      requestHeaders: {},
      responseHeaders: {},
      timeout: 0,
      options: {},
      xhr: createNativeXHR()!,
      template: null,
      async: true
    }
    this.upload = this.custom.xhr.upload
  }

  open (method: string, url: string, async: boolean = true, username?: string, password?: string) {
    Object.assign(this.custom, {
      method: method,
      url: url,
      async: typeof async === 'boolean' ? async : true,
      username: username,
      password: password,
      options: {
        url: url,
        type: method
      }
    })

    this.custom.timeout = setting.parseTimeout()

    // 查找与请求参数匹配的数据模板
    const options = this.custom.options
    const item = mocked.find(options.url!, options.type!)

    // 如果未找到匹配的数据模板，则采用原生 XHR 发送请求。
    if (!item) {
      const xhr = this.custom.xhr

      // 初始化所有事件，用于监听原生 XHR 对象的事件
      for (let i = 0; i < XHR_EVENTS.length; i++) {
        xhr.addEventListener(XHR_EVENTS[i], (event) => {
          // 同步属性 NativeXMLHttpRequest => MockXMLHttpRequest
          XHR_RESPONSE_PROPERTIES.forEach(prop => {
            try {
              this[prop] = xhr[prop]
            } catch (e) {}
          })
          // 触发 MockXMLHttpRequest 上的同名事件
          this.dispatchEvent(event)
        })
      }

      // xhr.open()
      if (username) {
        xhr.open(method, url, async, username, password)
      } else {
        xhr.open(method, url, async)
      }

      return
    }

    // 找到了匹配的数据模板，开始拦截 XHR 请求
    this.match = true
    this.custom.template = item
    this.readyState = XHR_STATES.OPENED
    this.dispatchEvent(createCustomEvent('readystatechange'))
  }

  // Combines a header in author request headers.
  setRequestHeader (name: string, value: string): void {
    // 原生 XHR
    if (!this.match) {
      this.custom.xhr!.setRequestHeader(name, value)
      return
    }

    // 拦截 XHR
    const requestHeaders = this.custom.requestHeaders
    if (requestHeaders[name]) {
      requestHeaders[name] += ',' + value
    } else {
      requestHeaders[name] = value
    }
  }

  // Initiates the request.
  send (data: XHRBody): void {
    this.custom.options.body = data
    this.custom.options.headers = this.custom.requestHeaders

    // 原生 XHR
    if (!this.match) {
      // 同步属性 MockXMLHttpRequest => NativeXMLHttpRequest
      XHR_REQUEST_PROPERTIES.forEach(prop => {
        try {
          this.custom.xhr[prop] = this[prop]
        } catch (e) {}
      })
      this.custom.xhr!.send(data)
      return
    }

    // 拦截 XHR
    // X-Requested-With header
    this.setRequestHeader('X-Requested-With', 'MockXMLHttpRequest')

    // loadstart The fetch initiates.
    this.dispatchEvent(createCustomEvent('loadstart'))
  
    const done = async () => {
      this.readyState = XHR_STATES.HEADERS_RECEIVED
      this.dispatchEvent(createCustomEvent('readystatechange'))
      this.readyState = XHR_STATES.LOADING
      this.dispatchEvent(createCustomEvent('readystatechange'))

      this.status = 200
      this.statusText = 'OK'

      // fix #92 #93 by @qddegtya
      const mockResponse = await mocked.convert(this.custom.template!, this.custom.options)
      this.response = this.responseText = JSON.stringify(mockResponse)

      this.readyState = XHR_STATES.DONE
      this.dispatchEvent(createCustomEvent('readystatechange'))
      this.dispatchEvent(createCustomEvent('load'))
      this.dispatchEvent(createCustomEvent('loadend'))
    }

    if (this.custom.async) {
      // 异步
      setTimeout(done, this.custom.timeout)
    } else {
      // 同步
      done()
    }
  }
  // https://xhr.spec.whatwg.org/#the-abort()-method
  // Cancels any network activity.
  abort (): void {
    // 原生 XHR
    if (!this.match) {
      this.custom.xhr!.abort()
      return
    }

    // 拦截 XHR
    this.readyState = XHR_STATES.UNSENT
    this.dispatchEvent(createCustomEvent('abort', false, false, this))
    this.dispatchEvent(createCustomEvent('error', false, false, this))
  }

  // https://xhr.spec.whatwg.org/#the-getresponseheader()-method
  getResponseHeader (name: string): string | null {
    // 原生 XHR
    if (!this.match) {
      return this.custom.xhr!.getResponseHeader(name)
    }

    // 拦截 XHR
    return this.custom.responseHeaders[name.toLowerCase()]
  }
  
  // https://xhr.spec.whatwg.org/#the-getallresponseheaders()-method
  // http://www.utf8-chartable.de/
  getAllResponseHeaders (): string {
    // 原生 XHR
    if (!this.match) {
      return this.custom.xhr!.getAllResponseHeaders()
    }

    // 拦截 XHR
    const responseHeaders = this.custom.responseHeaders
    let headers = ''
    for (const h in responseHeaders) {
      if (!responseHeaders.hasOwnProperty(h)) {
        continue
      }
      headers += h + ': ' + responseHeaders[h] + '\r\n'
    }
    return headers
  }

  overrideMimeType () {}

  addEventListener (type: string, handle: Function): void {
    const events = this.custom.events
    if (!events[type]) {
      events[type] = []
    }
    events[type].push(handle)
  }

  removeEventListener (type: string, handle: Function): void {
    const handles = this.custom.events[type] || []
    for (let i = 0; i < handles.length; i++) {
      if (handles[i] === handle) {
        handles.splice(i--, 1)
      }
    }
  }

  dispatchEvent (event: Event): void {
    const handles = this.custom.events[event.type] || []
    for (let i = 0; i < handles.length; i++) {
      handles[i].call(this, event)
    }

    const onType = 'on' + event.type
    if (this[onType]) {
      this[onType](event)
    }
  }

  static UNSENT: number = XHR_STATES.UNSENT
  static OPENED: number = XHR_STATES.OPENED
  static HEADERS_RECEIVED: number = XHR_STATES.HEADERS_RECEIVED
  static LOADING: number = XHR_STATES.LOADING
  static DONE: number = XHR_STATES.DONE

  static __MOCK__: boolean = false
}

// Inspired by jQuery
function createNativeXHR () {
  const localProtocolRE = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
  const isLocal = localProtocolRE.test(location.protocol)

  return window.ActiveXObject 
    ? (!isLocal && createStandardXHR()) || createActiveXHR()
    : createStandardXHR()

  function createStandardXHR () {
    try {
      return new _XMLHttpRequest()
    } catch (e) {}
  }

  function createActiveXHR () {
    try {
      return new window.ActiveXObject('Microsoft.XMLHTTP')
    } catch (e) {}
  }
}

function overrideXHR () {
  if (!MockXMLHttpRequest.__MOCK__) {
    MockXMLHttpRequest.__MOCK__ = true
    window.XMLHttpRequest = MockXMLHttpRequest as any
  }
}

export {
  MockXMLHttpRequest,
  overrideXHR
}

declare global {
  interface Window {
    ActiveXObject: { new(type: string): XMLHttpRequest };
    XMLHttpRequest: XMLHttpRequest;
  }
}
