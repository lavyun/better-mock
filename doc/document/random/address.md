<!-- ### Address -->

## Random.region()

* Random.region()

随机生成一个（中国）大区。

<!-- **使用示例**如下所示： -->

```js
Random.region()
// => "华北"
```

## Random.province()

* Random.province()

随机生成一个（中国）省（或直辖市、自治区、特别行政区）。

<!-- **使用示例**如下所示： -->

```js
Random.province()
// => "黑龙江省"
```

## Random.city( prefix? )

* Random.city()
* Random.city( prefix )

随机生成一个（中国）市。

### prefix

可选。

布尔值。指示是否生成所属的省。

<!-- **使用示例**如下所示： -->

```js
Random.city()
// => "唐山市"
Random.city(true)
// => "福建省 漳州市"
```

## Random.county( prefix? )

* Random.county()
* Random.county( prefix )

随机生成一个（中国）县。

### prefix

可选。

布尔值。指示是否生成所属的省、市。

<!-- **使用示例**如下所示： -->

```js
Random.county()
// => "上杭县"
Random.county(true)
// => "甘肃省 白银市 会宁县"
```

## Random.zip()

* Random.zip()

随机生成一个邮政编码（六位数字）。

<!-- **使用示例**如下所示： -->

```js
Random.zip()
// => "908812"

```
