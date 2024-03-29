## Random.image

* Random.image()
* Random.image( size )
* Random.image( size, text )
* Random.image( size, background, text )
* Random.image( size, background, foreground, text )
* Random.image( size, background, foreground, format, text )

生成一个随机的图片地址。

:::tip
**Random.image()** 用于生成高度自定义的图片地址，一般情况下，应该使用更简单的 **Random.dataImage()**
:::

### size <Badge text="可选"/>

指示图片的宽高，格式为 `'宽x高'`。默认从下面的数组中随机读取一个：

```js
[
  '150x100', '300x200', '400x300', '600x450', '800X600',
  '100x150', '200x300', '300x400', '450x600', '600x800',
  '100x100', '200x200', '300x300', '450x450', '600x600'
]
```

### background <Badge text="可选"/>

指示图片的背景色。。

### foreground <Badge text="可选"/>

指示图片的前景色（文字）。。

### format <Badge text="可选"/>

指示图片的格式。可选值包括：`'png'`、`'gif'`、`'jpg'`。

### text <Badge text="可选"/>

指示图片上的文字。默认值为参数 size。

```js
Random.image()
// => "https://iph.href.lu/450x600?bg=&fg=&text="
Random.image('300x400')
// => "https://iph.href.lu/300x400?bg=&fg=&text="
Random.image('300x400', 'HelloWorld')
// => "https://iph.href.lu/300x400?bg=&fg=&text=HelloWorld"
Random.image('300x400', '#234567', 'HelloWorld')
// => "https://iph.href.lu/300x400?bg=234567&fg=&text=HelloWorld"
Random.image('300x400', '#234567', '#FFFFFF', 'HelloWorld')
// => "https://iph.href.lu/300x400?bg=234567&fg=FFFFFF&text=HelloWorld"
Random.image('300x400', '#234567', '#FFFFFF', 'png', 'HelloWorld')
// => "http://dummyimage.com/300x400/234567/FFFFFF.png&text=HelloWorld"
```

## Random.dataImage

* Random.dataImage()
* Random.dataImage( size )
* Random.dataImage( size, text )

生成一段随机的 Base64 图片编码。

::: warning
- 该方法参考了 [faker.js](https://github.com/faker-js/faker/blob/main/src/modules/image/index.ts#L336) faker.jsfaker.js的实现，在 Node 端生成的是 svg 格式的 base64 图片。
- 该方法在小程序端无法使用。
:::

### size <Badge text="可选"/>

指示图片的宽高，格式为 `'宽x高'`。默认从下面的数组中随机读取一个：

```js
[
  '150x100', '300x200', '400x300', '600x450', '800X600',
  '100x150', '200x300', '300x400', '450x600', '600x800',
  '100x100', '200x200', '300x300', '450x450', '600x600'
]
```

### text <Badge text="可选"/>

指示图片上的文字。默认值为参数 size。

图片的背景色是随机的，取值范围参考自 <http://brandcolors.net/>。

```js
Random.dataImage()
// => "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAYAAACPgGwlAAAFJElEQVR4Xu2dS0hUURzG/1Yqlj2otJe10AqCoiJaFFTUpgcUhLaKCIogKCEiCl0U1SIIF1EIQlFEtCmkpbWSHlAQYRYUlI9Ie6nYmI9hfIx1LpzL3PGO/aeuM/r/f7PRufe7d873/ea75xw3ZjTumDtMeKlKIAPQVfF2zAK6PuaArpA5oAO6xgQUesacDugKE1BoGU0HdIUJKLSMpgO6wgQUWkbTAV1hAgoto+mArjABhZbRdEBXmIBCy2g6oCtMQKFlNB3QFSag0DKaDugKE1BoGU0HdIUJKLSMpgO6wgQUWkbTAV1hAgoto+mArjABhZbRdEBXmIBCy2g6oCtMQKFlNB3QFSag0DKaDugKE1BoGU0HdIUJKLSMpgO6wgQUWkbTAV1hAgoto+mArjABhZbRdEBXmIBCy2g6oCtMQKFlNB3QFSag0DKaDugKE1BoGU0HdIUJKLQ8bpo+fft+ylxYSJ23LvpisOfNST/N7ENniYa9/0xy4GsTdT+6+09Yx9t4/slEgovSDt2EO3P3YcoqWuUMsWln3oihFlTWUlbhSvf4UKid2iqOUfhVrXussKZ9xHXh10/oW1lxUnmNt/EkNXimOK3QTTtn7Sv1DDUees66rTT/3B0a/NFCvc9raOqf9+YL0PfiIX0/f8ADPdrXTZEPde6xyMd66rx5wXlvnwThN8/cL4ttc7S3i0L3rjqaVI2HyWdMZGmFbhwtvv7cgZm7ZS9NyS/wbboBb1ttwQy2tdLng2s90OOPxSa24FI15azZTAOtDdRyZAOZe84ru0GTps2g0P1r7pcjVeMZE5rMm6Yduh3nktt1CaHHesk/XUW5W4sp8v4lfTm5ywN9eCBCQz/baOBLE0Ua3rgg4z/DPCUmz5xD2SvWU6IpIBXjYTIKXDahoNtHvUmho/KMZ5HmN6f31FZT2+Wjbmix12dkZtNoTwYO9P8dT+A0mTecMNBNwPmnKmnyrDyKhxnv1U4B0d5f9KmkyHPaPinMwfYrJxKu7v8GPajxMDkFKpsQ0JMJ2KZjmm8e9817CjxNt/O4Odjf+JZaj2/zDXQ06EGNJ1CSSdws7dDNAsvsr7OXr3UWVeG6x87wv5WXOD9jAzZbtf7md669nscP3KbOLa2gaE+Xc27axl2UWbB0xLxvFmnmuJnTzU/7e+wuIJXjSYJToNK0Q/ebi41Du3Xz20bZBGJX3fH3Mav0jqpyd9Xvt3o3W0Ezt492H/tZQY8nUIpJ3izt0J39s8/L7q9N03NWb/LVhOuferZyWYuX0WDnD2evHv+XOPs5sdc4+/RFRX+eECFnn25eqRpPkpwClacdeqBucDNWAoDOikmWCNBl8WS5AXRWTLJEgC6LJ8sNoLNikiUCdFk8WW4AnRWTLBGgy+LJcgPorJhkiQBdFk+WG0BnxSRLBOiyeLLcADorJlkiQJfFk+UG0FkxyRIBuiyeLDeAzopJlgjQZfFkuQF0VkyyRIAuiyfLDaCzYpIlAnRZPFluAJ0VkywRoMviyXID6KyYZIkAXRZPlhtAZ8UkSwTosniy3AA6KyZZIkCXxZPlBtBZMckSAbosniw3gM6KSZYI0GXxZLkBdFZMskSALosnyw2gs2KSJQJ0WTxZbgCdFZMsEaDL4slyA+ismGSJAF0WT5YbQGfFJEsE6LJ4stwAOismWSJAl8WT5QbQWTHJEgG6LJ4sN4DOikmWCNBl8WS5AXRWTLJEgC6LJ8sNoLNikiUCdFk8WW4AnRWTLNFvXskYA3TG3JwAAAAASUVORK5CYII="

Random.dataImage('200x100')
// => "data:image/png;base64,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"

Random.dataImage('200x100', 'Hello Better-Mock!')
// => "data:image/png;base64,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"
```
