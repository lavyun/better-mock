## setup

### Mock.setup( settings )

配置拦截 Ajax 请求时的行为。支持的配置项有：`timeout`。

#### timeout

指定被拦截的 Ajax 请求的响应时间，单位是毫秒。值可以是正整数，例如 `400`，表示 400 毫秒 后才会返回响应内容；也可以是横杠 `'-'` 风格的字符串，例如 `'200-600'`，表示响应时间介于 200 和 600 毫秒之间。默认值是`'10-100'`。

```js
Mock.setup({
  timeout: 400
})
Mock.setup({
  timeout: '200-600'
})
```

::: tip
目前，接口 `Mock.setup( settings )` 仅用于配置 Ajax 请求，将来可能用于配置 Mock 的其他行为。
:::