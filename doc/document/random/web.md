<!-- ### Web -->

## Random.url( protocol?, host? )

* Random.url()
* Random.url( protocol, host )

随机生成一个 URL。

<!-- **参数的含义和默认值**如下所示： -->

### protocol

指定 URL 协议。例如 `http`。

### host

指定 URL 域名和端口号。例如 `nuysoft.com`。

<!-- **使用示例**如下所示： -->

```js
Random.url()
// => "mid://axmg.bg/bhyq"
Random.url('http')
// => "http://splap.yu/qxzkyoubp"
Random.url('http', 'nuysoft.com')
// => "http://nuysoft.com/ewacecjhe"
```

## Random.protocol()

* Random.protocol()

随机生成一个 URL 协议。返回以下值之一：`'http'`、`'ftp'`、`'gopher'`、`'mailto'`、`'mid'`、`'cid'`、`'news'`、`'nntp'`、`'prospero'`、`'telnet'`、`'rlogin'`、`'tn3270'`、`'wais'`。

<!-- **使用示例**如下所示： -->

```js
Random.protocol()
// => "ftp"
```

## Random.domain()

* Random.domain()

随机生成一个域名。

<!-- **使用示例**如下所示： -->

```js
Random.domain()
// => "kozfnb.org"
```

## Random.tld()

* Random.tld()

随机生成一个顶级域名（Top Level Domain）。

<!-- **使用示例**如下所示： -->

```js
Random.tld()
// => "net"
```

## Random.email( domain? )

* Random.email()
* Random.email( domain )

随机生成一个邮件地址。

<!-- **参数的含义和默认值**如下所示： -->

### domain

指定邮件地址的域名。例如 `nuysoft.com`。

<!-- **使用示例**如下所示： -->

```
Random.email()
// => "x.davis@jackson.edu"
Random.email('nuysoft.com')
// => "h.pqpneix@nuysoft.com"
```

## Random.ip()

* Random.ip()

随机生成一个 IP 地址。

<!-- **使用示例**如下所示： -->

```js
Random.ip()
// => "34.206.109.169"
```
