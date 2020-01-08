
export type PlatformName = 'wx' | 'my' | 'tt' | 'swan'

export type MpRequest = { __MOCK__?: boolean } & ((options: MpRequestOptions) => any)

export interface MpRequestOptions {
  url: string;
  data: object;
  method: string;
  header?: object;
  headers?: object;
  dataType: string;
  responseType: string;
  success: (res: WxSuccessCallback | MySuccessCallback) => any;
  fail: (err: any) => any;
  complete: (res: WxSuccessCallback | MySuccessCallback) => any;
}

export interface MpGlobal {
  request: MpRequest;
  httpRequest?: MpRequest;
  [prop: string]: any;
}

// 微信成功时回调函数参数列表
export interface WxSuccessCallback {
  data: object;
  statusCode: number;
  header: object;
}

// 支付宝成功时回调函数参数列表
export interface MySuccessCallback {
  data: object;
  status: number;
  headers: object;
}