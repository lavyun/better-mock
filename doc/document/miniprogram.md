## 介绍

`better-mock` 会针对各个小程序平台，对其 `request` 方法进行拦截，返回自定义的 mock 数据。

## 如何使用

### 可以使用 npm 的情况

安装 `better-mock` 后直接引入 `dist/mock.mp.js` 文件：

```js
const Mock = require('better-mock/dist/mock.mp.js')

Mock.mock('http://example.com/path/to', {
  phone: '@PHONE'
})

wx.request({
  url: 'http://example.com/path/to',
  success (res) {
    console.log(res.data.phone) // 13687529123
  }
})
```

### 不能使用 npm 的情况

如果不能使用 npm，可以下载 release 文件到本地，然后引入。

[https://unpkg.com/better-mock/dist/mock.mp.js](https://unpkg.com/better-mock/dist/mock.mp.js)