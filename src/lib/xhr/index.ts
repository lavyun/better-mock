// ## MockXMLHttpRequest
//
// 期望的功能：
// 1. 完整地覆盖原生 XHR 的行为
// 2. 完整地模拟原生 XHR 的行为
// 3. 在发起请求时，自动检测是否需要拦截
// 4. 如果不必拦截，则执行原生 XHR 的行为
// 5. 如果需要拦截，则执行虚拟 XHR 的行为
// 6. 兼容 XMLHttpRequest 和 ActiveXObject
//     new window.XMLHttpRequest()
//     new window.ActiveXObject("Microsoft.XMLHTTP")
//
// 关键方法的逻辑：
// * new   此时尚无法确定是否需要拦截，所以创建原生 XHR 对象是必须的。
// * open  此时可以取到 URL，可以决定是否进行拦截。
// * send  此时已经确定了请求方式。
//
// 规范：
// http://xhr.spec.whatwg.org/
// http://www.w3.org/TR/XMLHttpRequest2/
//
// 参考实现：
// https://github.com/philikon/MockHttpRequest/blob/master/lib/mock.js
// https://github.com/trek/FakeXMLHttpRequest/blob/master/fake_xml_http_request.js
// https://github.com/ilinsky/xmlhttprequest/blob/master/XMLHttpRequest.js
// https://github.com/firebug/firebug-lite/blob/master/content/lite/xhr.js
// https://github.com/thx/RAP/blob/master/lab/rap.plugin.xinglie.js
//
// **需不需要全面重写 XMLHttpRequest？**
//     http://xhr.spec.whatwg.org/#interface-xmlhttprequest
//     关键属性 readyState、status、statusText、response、responseText、responseXML 是 readonly，所以，试图通过修改这些状态，来模拟响应是不可行的。
//     因此，唯一的办法是模拟整个 XMLHttpRequest，就像 jQuery 对事件模型的封装。
//
// // Event handlers
// onloadstart         loadstart
// onprogress          progress
// onabort             abort
// onerror             error
// onload              load
// ontimeout           timeout
// onloadend           loadend
// onreadystatechange  readystatechange

import * as util from '../util'

// 备份原生 XMLHttpRequest
const _XMLHttpRequest = XMLHttpRequest
const _ActiveXObject = window.ActiveXObject

// PhantomJS
// TypeError: '[object EventConstructor]' is not a constructor (evaluating 'new Event("readystatechange")')
// https://github.com/bluerail/twitter-bootstrap-rails-confirm/issues/18
// https://github.com/ariya/phantomjs/issues/11289
try {
  new Event('custom')
} catch (exception) {
  window.Event = function(type, bubbles, cancelable, detail) {
    const event = document.createEvent('CustomEvent') // MUST be 'CustomEvent'
    event.initCustomEvent(type, bubbles, cancelable, detail)
    return event
  }
}

const XHR_STATES = {
  // The object has been constructed.
  UNSENT: 0, // The open() method has been successfully invoked.
  OPENED: 1, // All redirects (if any) have been followed and all HTTP headers of the response have been received.
  HEADERS_RECEIVED: 2, // The response's body is being received.
  LOADING: 3, // The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects).
  DONE: 4
}

const XHR_EVENTS = ['readystatechange', 'loadstart', 'progress', 'abort', 'error', 'load', 'timeout', 'loadend']
const XHR_REQUEST_PROPERTIES = ['timeout', 'withCredentials']
const XHR_RESPONSE_PROPERTIES = [
  'readyState',
  'responseURL',
  'status',
  'statusText',
  'responseType',
  'response',
  'responseText',
  'responseXML'
]

// https://github.com/trek/FakeXMLHttpRequest/blob/master/fake_xml_http_request.js#L32
const HTTP_STATUS_CODES = {
  100: 'Continue',
  101: 'Switching Protocols',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choice',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported'
}

class MockXMLHttpRequest {
  custom: any

  // 标记当前对象为 MockXMLHttpRequest
  mock: boolean = true

  // 是否拦截 Ajax 请求
  match: boolean = false

  timeout: number = 0

  readyState: number = 0

  withCredentials: boolean = false

  // https://xhr.spec.whatwg.org/#the-send()-method
  upload: any = {}

  responseURL: string = ''

  status: number = XHR_STATES.UNSENT

  statusText: string = ''

  // '', 'text', 'arraybuffer', 'blob', 'document', 'json'
  responseType: string = ''

  response: any = null

  responseText: string = ''

  responseXML: any = null

  UNSENT: number = XHR_STATES.UNSENT
  OPENED: number = XHR_STATES.OPENED
  HEADERS_RECEIVED: number = XHR_STATES.HEADERS_RECEIVED
  LOADING: number = XHR_STATES.LOADING
  DONE: number = XHR_STATES.DONE
  
  constructor() {
    // 初始化 custom 对象，用于存储自定义属性
    this.custom = {
      events: {},
      requestHeaders: {},
      responseHeaders: {}
    }
  }

  open (method, url, async, username, password) {
    var that = this

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

    this.custom.timeout = (function(timeout) {
      if (typeof timeout === 'number') {
        return timeout
      }
      if (typeof timeout === 'string' && !~timeout.indexOf('-')) {
        return parseInt(timeout, 10)
      }
      if (typeof timeout === 'string' && ~timeout.indexOf('-')) {
        const tmp = timeout.split('-')
        const min = parseInt(tmp[0], 10)
        const max = parseInt(tmp[1], 10)
        return Math.round(Math.random() * (max - min)) + min
      }
    })(MockXMLHttpRequest._settings.timeout)

    // 查找与请求参数匹配的数据模板
    var item = find(this.custom.options)

    function handle(event) {
      // 同步属性 NativeXMLHttpRequest => MockXMLHttpRequest
      for (var i = 0; i < XHR_RESPONSE_PROPERTIES.length; i++) {
        try {
          that[XHR_RESPONSE_PROPERTIES[i]] = xhr[XHR_RESPONSE_PROPERTIES[i]]
        } catch (e) {}
      }
      // 触发 MockXMLHttpRequest 上的同名事件
      that.dispatchEvent(new Event(event.type /*, false, false, that*/))
    }

    // 如果未找到匹配的数据模板，则采用原生 XHR 发送请求。
    if (!item) {
      // 创建原生 XHR 对象，调用原生 open()，监听所有原生事件
      var xhr = createNativeXMLHttpRequest()
      this.custom.xhr = xhr

      // 初始化所有事件，用于监听原生 XHR 对象的事件
      for (var i = 0; i < XHR_EVENTS.length; i++) {
        xhr.addEventListener(XHR_EVENTS[i], handle)
      }

      // xhr.open()
      if (username) {
        xhr.open(method, url, async, username, password)
      } else {
        xhr.open(method, url, async)
      }

      // 同步属性 MockXMLHttpRequest => NativeXMLHttpRequest
      for (let j = 0; j < XHR_REQUEST_PROPERTIES.length; j++) {
        try {
          xhr[XHR_REQUEST_PROPERTIES[j]] = that[XHR_REQUEST_PROPERTIES[j]]
        } catch (e) {}
      }

      return
    }

    // 找到了匹配的数据模板，开始拦截 XHR 请求
    this.match = true
    this.custom.template = item
    this.readyState = XHR_STATES.OPENED
    this.dispatchEvent(new Event('readystatechange' /*, false, false, this*/))
  }

  // Combines a header in author request headers.
  setRequestHeader (name, value) {
    // 原生 XHR
    if (!this.match) {
      this.custom.xhr.setRequestHeader(name, value)
      return
    }

    // 拦截 XHR
    var requestHeaders = this.custom.requestHeaders
    if (requestHeaders[name]) {
      requestHeaders[name] += ',' + value
    } else {
      requestHeaders[name] = value
    }
  }

  // Initiates the request.
  send (data) {
    var that = this
    this.custom.options.body = data

    // 原生 XHR
    if (!this.match) {
      this.custom.xhr.send(data)
      return
    }

    // 拦截 XHR

    // X-Requested-With header
    this.setRequestHeader('X-Requested-With', 'MockXMLHttpRequest')

    // loadstart The fetch initiates.
    this.dispatchEvent(new Event('loadstart' /*, false, false, this*/))

    if (this.custom.async) setTimeout(done, this.custom.timeout)
    // 异步
    else done() // 同步

    function done() {
      that.readyState = XHR_STATES.HEADERS_RECEIVED
      that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/))
      that.readyState = XHR_STATES.LOADING
      that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/))

      that.status = 200
      that.statusText = HTTP_STATUS_CODES[200]

      // fix #92 #93 by @qddegtya
      that.response = that.responseText = JSON.stringify(convert(that.custom.template, that.custom.options), null, 4)

      that.readyState = XHR_STATES.DONE
      that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/))
      that.dispatchEvent(new Event('load' /*, false, false, that*/))
      that.dispatchEvent(new Event('loadend' /*, false, false, that*/))
    }
  }
  // https://xhr.spec.whatwg.org/#the-abort()-method
  // Cancels any network activity.
  abort () {
    // 原生 XHR
    if (!this.match) {
      this.custom.xhr.abort()
      return
    }

    // 拦截 XHR
    this.readyState = XHR_STATES.UNSENT
    this.dispatchEvent(new window.Event('abort', false, false, this))
    this.dispatchEvent(new window.Event('error', false, false, this))
  }

  // https://xhr.spec.whatwg.org/#the-getresponseheader()-method
  getResponseHeader (name) {
    // 原生 XHR
    if (!this.match) {
      return this.custom.xhr.getResponseHeader(name)
    }

    // 拦截 XHR
    return this.custom.responseHeaders[name.toLowerCase()]
  }
  
  // https://xhr.spec.whatwg.org/#the-getallresponseheaders()-method
  // http://www.utf8-chartable.de/
  getAllResponseHeaders () {
    // 原生 XHR
    if (!this.match) {
      return this.custom.xhr.getAllResponseHeaders()
    }

    // 拦截 XHR
    var responseHeaders = this.custom.responseHeaders
    var headers = ''
    for (var h in responseHeaders) {
      if (!responseHeaders.hasOwnProperty(h)) continue
      headers += h + ': ' + responseHeaders[h] + '\r\n'
    }
    return headers
  }

  overrideMimeType (/*mime*/) {}

  addEventListener (type, handle) {
    var events = this.custom.events
    if (!events[type]) events[type] = []
    events[type].push(handle)
  }

  removeEventListener (type, handle) {
    var handles = this.custom.events[type] || []
    for (var i = 0; i < handles.length; i++) {
      if (handles[i] === handle) {
        handles.splice(i--, 1)
      }
    }
  }

  dispatchEvent (event) {
    var handles = this.custom.events[event.type] || []
    for (var i = 0; i < handles.length; i++) {
      handles[i].call(this, event)
    }

    var ontype = 'on' + event.type
    if (this[ontype]) this[ontype](event)
  }

  static _settings: any = {
    timeout: '10-100'
  }

  static setup = function(settings) {
    Object.assign(MockXMLHttpRequest._settings, settings)
    return MockXMLHttpRequest._settings
  }

  static Mock: any = {}

  static UNSENT: number = XHR_STATES.UNSENT
  static OPENED: number = XHR_STATES.OPENED
  static HEADERS_RECEIVED: number = XHR_STATES.HEADERS_RECEIVED
  static LOADING: number = XHR_STATES.LOADING
  static DONE: number = XHR_STATES.DONE
}

// Inspired by jQuery
function createNativeXMLHttpRequest() {
  var isLocal = (function() {
    var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
    var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/
    var ajaxLocation = location.href
    var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
    return rlocalProtocol.test(ajaxLocParts[1])
  })()

  return window.ActiveXObject ? (!isLocal && createStandardXHR()) || createActiveXHR() : createStandardXHR()

  function createStandardXHR() {
    try {
      return new _XMLHttpRequest()
    } catch (e) {}
  }

  function createActiveXHR() {
    try {
      return new _ActiveXObject('Microsoft.XMLHTTP')
    } catch (e) {}
  }
}

// 查找与请求参数匹配的数据模板：URL，Type
function find(options) {
  for (var sUrlType in MockXMLHttpRequest.Mock._mocked) {
    var item = MockXMLHttpRequest.Mock._mocked[sUrlType]
    if (
      (!item.rurl || match(item.rurl, options.url)) &&
      (!item.rtype || match(item.rtype, options.type.toLowerCase()))
    ) {
      // console.log('[mock]', options.url, '>', item.rurl)
      return item
    }
  }

  function match(expected, actual) {
    if (util.type(expected) === 'string') {
      return expected === actual
    }
    if (util.type(expected) === 'regexp') {
      return expected.test(actual)
    }
  }
}

// 数据模板 ＝> 响应数据
function convert(item, options) {
  return util.isFunction(item.template) ? item.template(options) : MockXMLHttpRequest.Mock.mock(item.template)
}

export default MockXMLHttpRequest

declare global {
  interface Window {
    ActiveXObject: any
    Event: any
    XMLHttpRequest: XMLHttpRequest
  }
}
