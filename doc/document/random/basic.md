## Random.boolean

- Random.boolean()
- Random.boolean( min, max, current )

返回一个随机的布尔值。

### min <Badge text="可选"/>

指示参数 current 出现的概率。概率计算公式为 `min / (min + max)`。该参数的默认值为 1，即有 50% 的概率返回参数 current。

### max <Badge text="可选"/>

指示参数 current 的相反值 `!current` 出现的概率。概率计算公式为 `max / (min + max)`。该参数的默认值为 `1`，即有 50% 的概率返回参数 `!current`。

### current <Badge text="可选"/>

可选值为布尔值 `true` 或 `false`。如果未传入任何参数，则返回 `true` 和 `false` 的概率各为 50%。该参数没有默认值。在该方法的内部，依据原生方法 Math.random() 返回的（浮点）数来计算和返回布尔值，例如在最简单的情况下，返回值是表达式 `Math.random() >= 0.5` 的执行结果。

```js
Random.boolean()
// => true
Random.boolean(1, 9, true)
// => false
Random.bool()
// => false
Random.bool(1, 9, false)
// => true
```

## Random.natural

- Random.natural()
- Random.natural( min )
- Random.natural( min, max )

返回一个随机的自然数（大于等于 0 的整数）。

### min <Badge text="可选"/>

指示随机自然数的最小值。默认值为 0。

### max <Badge text="可选"/>

指示随机自然数的最大值。默认值为 9007199254740992。

```js
Random.natural()
// => 1002794054057984
Random.natural(10000)
// => 71529071126209
Random.natural(60, 100)
// => 77
```

## Random.integer

- Random.integer()
- Random.integer( min )
- Random.integer( min, max )

返回一个随机的整数。

### min <Badge text="可选"/>

指示随机整数的最小值。默认值为 -9007199254740992。

### max <Badge text="可选"/>

指示随机整数的最大值。默认值为 9007199254740992。

```js
Random.integer()
// => -3815311811805184
Random.integer(10000)
// => 4303764511003750
Random.integer(60, 100)
// => 96
```

## Random.float

- Random.float()
- Random.float( min )
- Random.float( min, max )
- Random.float( min, max, dmin )
- Random.float( min, max, dmin, dmax )

返回一个随机的浮点数。

### min <Badge text="可选"/>

整数部分的最小值。默认值为 -9007199254740992。

### max <Badge text="可选"/>

整数部分的最大值。默认值为 9007199254740992。

### dmin <Badge text="可选"/>

小数部分位数的最小值。默认值为 0。

### dmax <Badge text="可选"/>

小数部分位数的最大值。默认值为 17。

```js
Random.float()
// => -1766114241544192.8
Random.float(0)
// => 556530504040448.25
Random.float(60, 100)
// => 82.56779679549358
Random.float(60, 100, 3)
// => 61.718533677927894
Random.float(60, 100, 3, 5)
// => 70.6849
```

## Random.character

- Random.character()
- Random.character('lower' | 'upper' | 'number' | 'symbol' )
- Random.character( pool )

返回一个随机字符。

### pool <Badge text="可选"/>

字符串。表示字符池，将从中选择一个字符返回。

如果传入了 `'lower'` 或 `'upper'`、`'number'`、`'symbol'`，表示从内置的字符池从选取：

```js
{
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()[]"
}
```

如果未传入该参数，则从 `lower + upper + number + symbol` 中随机选取一个字符返回。

```js
Random.character()
// => "P"
Random.character('lower')
// => "y"
Random.character('upper')
// => "X"
Random.character('number')
// => "1"
Random.character('symbol')
// => "&"
```

## Random.string

- Random.string()
- Random.string( length )
- Random.string( pool, length )
- Random.string( min, max )
- Random.string( pool, min, max )

返回一个随机字符串。

### pool <Badge text="可选"/>

字符串。表示字符池，将从中选择一个字符返回。

如果传入 `'lower'` 或 `'upper'`、`'number'`、`'symbol'`，表示从内置的字符池从选取：

```js
{
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!@#$%^&*()[]"
}
```

如果未传入该参数，则从 `lower + upper + number + symbol` 中随机选取一个字符返回。

### min <Badge text="可选"/>

随机字符串的最小长度。默认值为 3。

### max <Badge text="可选"/>

随机字符串的最大长度。默认值为 7。

```js
Random.string()
// => "pJjDUe"
Random.string(5)
// => "GaadY"
Random.string('lower', 5)
// => "jseqj"
Random.string(7, 10)
// => "UuGQgSYk"
Random.string('aeiou', 1, 3)
// => "ea"
Random.string('壹贰叁肆伍陆柒捌玖拾', 3, 5)
// => "肆捌伍叁"
```

## Random.range

- Random.range( stop )
- Random.range( start, stop )
- Random.range( start, stop, step )

返回一个整型数组。

### start `必选`

数组中整数的起始值。

### stop <Badge text="可选"/>

数组中整数的结束值（不包含在返回值中）。

### step <Badge text="可选"/>

数组中整数之间的步长。默认值为 1。

```js
Random.range(10)
// => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Random.range(3, 7)
// => [3, 4, 5, 6]
Random.range(1, 10, 2)
// => [1, 3, 5, 7, 9]
Random.range(1, 10, 3)
// => [1, 4, 7]
```
