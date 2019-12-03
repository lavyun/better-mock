export interface StringObject {
  [key: string]: string
} 

export interface MockedItem {
  rurl: string | RegExp | undefined,
  rtype: string | RegExp | undefined,
  template: object | Function | undefined
}

export interface Mocked {
  [key: string]: MockedItem
}

export interface XHRCustomOptions {
  url: string,
  type: string,
  body: XHRBody,
  headers: StringObject
}

export type XHRBody = Document | BodyInit | null

export interface XHRCustom {
  events: {
    [event: string]: Function[]
  },
  requestHeaders: StringObject,
  responseHeaders: StringObject,
  timeout: number,
  options: Partial<XHRCustomOptions>,
  xhr: XMLHttpRequest | null,
  template: MockedItem | null,
  async: boolean
}

export interface Settings {
  timeout: string
}

export interface SchemaResult {
  name: string | number | undefined,
  template: object | string | (string | object)[],
  type: string,
  rule: object,
  path: string[],
  items: Partial<SchemaResult>[],
  properties: Partial<SchemaResult>[]
}
