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
<script type="text/javascript" src="./bower_components/better-mock/dist/mock.js"></script>
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
