# 介绍

## better-mock 是什么

`better-mock` fork 了 [Mock.js](https://github.com/nuysoft/Mock)，在代码实现、构建脚本、单元测试上都选择了更加现代化的技术方案进行重构，所以使用者无需更改代码，可以 `100%` 兼容Mock.js。

## 为什么会有这个库

虽然 `Mock.js` 已经很长时间已经没有维护了，但是还是会一些使用者在提 `issue`，提 `PR`，所以 `better-mock` 的规划是：重构`Mock.js`，在不改变 `Mock.js` API 的基础上进行长期迭代，并且解决一些 `Mock.js` 的 `issue` 和 `PR`。

## 一些说明

`better-mock` 的定位是**开发**环境下和 **Node.js** 中的数据 mock，不会着重考虑浏览器兼容性，所以在重构 Mock.js 的过程中，移除了一些浏览器兼容性代码，但是得益于 `babel`，构建后的代码会兼容 `IE9+`。

## 安装

```shell
npm install better-mock
```

## 使用

### 使用 Webpack

```js
import Mock from 'better-mock'
const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1
    }
  ]
})
console.log(data)
```

### 使用 Node.js

```js
const Mock = require('better-mock')
const data = Mock.mock({
  'list|1-10': [
    {
      'id|+1': 1
    }
  ]
})
console.log(data)
```

### 在浏览器中直接引用

```html
<script type="text/javascript" src="https://unpkg.com/better-mock/dist/mock.browser.js"></script>
```

### RequireJS (AMD)

```js
require.config({
  paths: {
    mock: 'path/to/better-mock'
  }
})

require(['mock'], function(Mock) {
  var data = Mock.mock({
    'list|1-10': [
      {
        'id|+1': 1
      }
    ]
  })
  // 输出结果
  document.body.innerHTML += '<pre>' + JSON.stringify(data, null, 4) + '</pre>'
})
```

### Random CLI

```shell
# 全局安装
$ npm install better-mock -g

# 执行
$ random url
# => http://rmcpx.org/funzwc

# 帮助
random -h
```

