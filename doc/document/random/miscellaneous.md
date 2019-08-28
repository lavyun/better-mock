<!-- ### Miscellaneous -->

## Random.guid()

* Random.guid()

随机生成一个 GUID。

<!-- **使用示例**如下所示： -->

```js
Random.guid()
// => "662C63B4-FD43-66F4-3328-C54E3FF0D56E"
```

> `Random.guid()` 的实现参考了 [UUID 规范](http://www.ietf.org/rfc/rfc4122.txt)。

## Random.id()

* Random.id()

随机生成一个 18 位身份证。

<!-- **使用示例**如下所示： -->

```js
Random.id()
// => "420000200710091854"
```

## Random.increment( step? )

* Random.increment()
* Random.increment( step )

生成一个全局的自增整数。

<!-- 参数的含义和默认值如下所示： -->

### step

可选。

整数自增的步长。默认值为 1。

<!-- 使用示例如下所示： -->

```js
Random.increment()
// => 1
Random.increment(100)
// => 101
Random.increment(1000)
// => 1101
```