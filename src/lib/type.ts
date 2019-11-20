export interface MockedItem {
  rurl: string | RegExp | undefined,
  rtype: string | RegExp | undefined,
  template: object | Function | undefined
}

export interface Mocked {
  [key: string]: MockedItem
}

export interface XHRCustomOptions {
  url: string
  type: string
  body: string
}

export interface XHRCustom {
  events: {
    [event: string]: Function[]
  }
  requestHeaders: {
    [name: string]: string
  }
  responseHeaders: {
    [name: string]: string
  }
  timeout: number
  options: Partial<XHRCustomOptions>,
  xhr: XMLHttpRequest | null
  template: MockedItem | null
  async: boolean
}

export interface Settings {
  timeout: string
}
