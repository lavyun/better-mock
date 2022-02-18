## mock

根据数据模板生成模拟数据，共有 5 种参数格式。

### Mock.mock( template )

根据数据模板生成模拟数据。

```js
Mock.mock({
  'list|1-10': [{
    'id|+1': 1,
    'email': '@EMAIL'
  }]
})
```

<code-link>
  <pre>
  const ret = Mock.mock({
    'list|1-10': [{
      'id|+1': 1,
      'email': '@EMAIL'
    }]
  })
  console.log(ret)
  </pre>
</code-link>

### Mock.mock( url, template )

记录数据模板。当拦截到匹配 `url` 的 Ajax 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

```js
Mock.mock('/mock_url', {
  'list|1-10': [{
    'id|+1': 1,
    'email': '@EMAIL'
  }]
})
```

<code-link>
  <pre>
  Mock.mock('/mock_url', {
    'list|1-10': [{
      'id|+1': 1,
      'email': '@EMAIL'
    }]
  })
  axios.get('/mock_url').then(res => {
    console.log(res.data)
  })
  </pre>
</code-link>

### Mock.mock( url, function( options ) )

记录用于生成响应数据的函数。当拦截到匹配 `url` 的 Ajax 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

```js
Mock.mock('/mock_url', function (options) {
  return options
})
```

<code-link>
  <pre>
  Mock.mock('/mock_url', function (options) {
    return options
  })
  axios.get('/mock_url').then(res => {
    console.log(res.data)
  })
  </pre>
</code-link>

### Mock.mock( url, type, template )
    
记录数据模板。当拦截到匹配 `url` 和 `type` 的 Ajax 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

```js
Mock.mock('/mock_url', 'post', {
  'list|1-10': [{
    'id|+1': 1,
    'email': '@EMAIL'
  }]
})
```

<code-link>
  <pre>
  Mock.mock('/mock_url', 'post', {
    'list|1-10': [{
      'id|+1': 1,
      'email': '@EMAIL'
    }]
  })
  axios.post('/mock_url').then(res => {
    console.log(res.data)
  })
  </pre>
</code-link>


### Mock.mock( url, type, function( options ) )

记录用于生成响应数据的函数。当拦截到匹配 `url` 和 `type` 的 Ajax 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

```js
Mock.mock('/mock_url', 'post', function (options) {
  return options
})
```

<code-link>
  <pre>
  Mock.mock('/mock_url', 'post', function (options) {
    return options
  })
  axios.post('/mock_url').then(res => {
    console.log(res.data)
  })
  </pre>
</code-link>


函数可以返回一个 promise，用于异步生成数据。

```js
Mock.mock('/mock_url', 'post', function (options) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        value: Math.random()
      })
    }, 1000)
  })
})
```

<code-link>
  <pre>
  Mock.mock('/mock_url', 'post', function (options) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          value: Math.random()
        })
      }, 1000)
    })
  })
  axios.post('/mock_url').then(res => {
    console.log(res.data)
  })
  </pre>
</code-link>

### 参数的含义和默认值如下所示:

#### url <Badge text="可选"/>

表示需要拦截的 URL，可以是 URL 字符串、URL 通配符 或者 URL 正则。例如 `/\/domain\/list\.json/`、`'/domain/list/:id'`、`'/domain/list/*'`、`'/domain/list.json'`。

#### type <Badge text="可选"/>

表示需要拦截的 Ajax 请求类型。例如 `GET`、`POST`、`PUT`、`DELETE` 等，支持小写。

#### template <Badge text="可选"/>

表示数据模板，可以是对象或字符串。例如 `{ 'data|1-10':[{}] }`、`'@EMAIL'`。

#### function(options) <Badge text="可选"/>
 
表示用于生成响应数据的函数。

##### options

指向本次请求的 Ajax 选项集，含有 `url`、`type`、`body`、`headers` 四个属性。
