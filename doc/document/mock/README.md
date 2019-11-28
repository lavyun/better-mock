## mock

根据数据模板生成模拟数据，共有 5 种参数格式。

### Mock.mock( template )

根据数据模板生成模拟数据。

[JSFiddle](http://jsfiddle.net/nuysoft/Y3rg6/7/)

### Mock.mock( rurl, template )

记录数据模板。当拦截到匹配 `rurl` 的 Ajax 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

[JSFiddle](http://jsfiddle.net/nuysoft/BeENf/6/)

### Mock.mock( rurl, function( options ) )

记录用于生成响应数据的函数。当拦截到匹配 `rurl` 的 Ajax 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

[JSFiddle](http://jsfiddle.net/nuysoft/2s5t5/15/)

### Mock.mock( rurl, rtype, template )
    
记录数据模板。当拦截到匹配 `rurl` 和 `rtype` 的 Ajax 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

[JSFiddle](http://jsfiddle.net/nuysoft/Eq68p/3/)

### Mock.mock( rurl, rtype, function( options ) )

记录用于生成响应数据的函数。当拦截到匹配 `rurl` 和 `rtype` 的 Ajax 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

[JSFiddle](http://jsfiddle.net/nuysoft/6dpV5/5/)

### 参数的含义和默认值如下所示:

#### rurl `可选`

表示需要拦截的 URL，可以是 URL 字符串、URL 通配符 或者 URL 正则。例如 `/\/domain\/list\.json/`、`'/domain/list/:id'`、`'/domain/list/*'`、`'/domain/list.json'`。

#### rtype `可选`

表示需要拦截的 Ajax 请求类型。例如 `GET`、`POST`、`PUT`、`DELETE` 等。

#### template `可选`

表示数据模板，可以是对象或字符串。例如 `{ 'data|1-10':[{}] }`、`'@EMAIL'`。

#### function(options) `可选`
 
表示用于生成响应数据的函数。

##### options

指向本次请求的 Ajax 选项集，含有 `url`、`type` 和 `body` 三个属性，参见 [XMLHttpRequest 规范](https://xhr.spec.whatwg.org/)。
