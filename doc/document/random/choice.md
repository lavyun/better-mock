## Random.choices

* Random.choices( pool )
* Random.choices( pool, length )
* Random.choices( pool, min, max )

随机从字符串或数组中生成包含一个或多个元素的数组。

### pool <Badge text="必填"/>

只能是字符串或数组，将从中选择一个或多个元素，并以数组返回。

### min <Badge text="可选"/>

随机数组的最小长度。默认值为 1。

### max <Badge text="可选"/>

随机数组的最大长度。默认值为 1。

```js
Random.choices([1, 2, 3])
// => [2]
Random.choices(['name', 'age', 'sex'], 2)
// => ["sex", "name"]
Random.choices('abcdef', 3)
// => ["e", "b", "b"]
Random.choices('123🌘😷🙊★♠♫', 2, 4)
// => ["2", "🌘", "😷"]
```

## Random.choice

* Random.choice( pool )
* Random.choice( pool, length )
* Random.choice( pool, min, max )

与 `Random.choices` 类似，随机从字符串或数组中生成包含一个或多个元素的 **字符串** 。

### pool <Badge text="必填"/>

只能是字符串或数组，将从中选择一个或多个元素，并组成字符串返回。

### min <Badge text="可选"/>

随机字符串的最小长度。默认值为 1。

### max <Badge text="可选"/>

随机字符串的最大长度。默认值为 1。

```js
Random.choice([1, 2, 3])
// => "3"
Random.choice(['一', '二', '三'], 2)
// => "二一"
Random.choice('abcdef', 3)
// => "ecb"
Random.choice('123🌘😷🙊★♠♫', 2, 4)
// => "2🌘😷"
```
