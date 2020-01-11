## Random.capitalize

* Random.capitalize(word)

把字符串的第一个字母转换为大写。

```js
Random.capitalize('hello')
// => "Hello"
```

## Random.upper

* Random.upper( str )

把字符串转换为大写。

```js
Random.upper('hello')
// => "HELLO"
```

## Random.lower

* Random.lower( str )

把字符串转换为小写。

```js
Random.lower('HELLO')
// => "hello"
```

## Random.pick

* Random.pick( arr )

从数组中随机选取一个元素，并返回。

```js
Random.pick(['a', 'e', 'i', 'o', 'u'])
// => "o"
```

## Random.shuffle

* Random.shuffle( arr )
* Random.shuffle( arr, length )
* Random.shuffle( arr, min, max )

打乱数组中元素的顺序，并返回。

### length <Badge text="可选"/>

返回后的数组长度。

### min <Badge text="可选"/>

返回后的数组最小长度。

### max <Badge text="可选"/>

返回后的数组最大长度。

```js
Random.shuffle(['a', 'e', 'i', 'o', 'u'])
// => ["o", "u", "e", "i", "a"]

Random.shuffle(['a', 'e', 'i', 'o', 'u'], 3)
// => ["o", "u", "i"

Random.shuffle(['a', 'e', 'i', 'o', 'u'], 2, 4)
// => ["o", "u"]
```
