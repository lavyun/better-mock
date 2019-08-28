<!-- ## Mock.Random -->

Mock.Random 是一个工具类，用于生成各种随机数据。

**Mock.Random 的方法在数据模板中称为『占位符』，书写格式为 `@占位符(参数 [, 参数])` 。**

```js
var Random = Mock.Random
Random.email()
// => "n.clark@miller.io"
Mock.mock('@email')
// => "y.lee@lewis.org"
Mock.mock( { email: '@email' } )
// => { email: "v.lewis@hall.gov" }
```

**注意**

<!-- 1. 在上面的例子中看到，直接调用 `Random.email()` 时方法名 `email()` 是小写的，而数据模板中的 `@EMAIL` 却是大写。这是建议的编码风格，以便在阅读时从视觉上提高占位符的识别度，快速识别占位符和普通字符（并非强制的编写方式，在数据模板中使用小写的 `@email` 也可以达到同样的效果）。 -->

<!-- 在浏览器中，为了减少需要拼写的字符，Mock.js 把 Mock.Random 暴露给了 window 对象，使之成为全局变量，从而可以直接访问 Random。因此上面例子中的 `var Random = Mock.Random` 可以省略。在后面的例子中，也将做同样的处理。 -->

<!-- > 在 Node.js 中，仍然需要通过 `Mock.Random` 访问。 -->

### 方法

Mock.Random 提供的完整方法（占位符）如下：

| Type          | Method
| ------------- | -----------------------------------------------------------------------------
| Basic         | boolean, natural, integer, float, character, string, range, date, time, datetime, now
| Image         | image, dataImage
| Color         | color
| Text          | paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle
| Name          | first, last, name, cfirst, clast, cname
| Web           | url, domain, email, ip, tld
| Address       | area, region
| Helper        | capitalize, upper, lower, pick, shuffle
| Miscellaneous | guid, id

<script id="fixPlaceholderLink" type="text/javascript">
    $('#fixPlaceholderLink').prev('table')
        .find('td:nth-child(1)').each(function(index, td) {
            $(td).contents().wrapAll(
                $('<a>').attr('href', '#' + $(td).text())
            )
        })
        .end()
        .find('td:nth-child(2)').each(function(index, td) {
            var methods = $(td).text().split(' ')
            var links = $()
            $(methods).each(function(mindex, m) {
                links.push(
                    $('<a>').attr('href', '#' + m).text(m)[0]
                )
                if (mindex < methods.length - 1) {
                    links.push(
                        $('<span>').text(', ')[0]
                    )
                }
            })
            $(td).empty().append(links)
        })
        .end()
</script>

### 扩展

Mock.Random 中的方法与数据模板的 `@占位符` 一一对应，在需要时还可以为 Mock.Random 扩展方法，然后在数据模板中通过 `@扩展方法` 引用。例如：

```js
Random.extend({
    constellation: function(date) {
        var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations)
    }
})
Random.constellation()
// => "水瓶座"
Mock.mock('@CONSTELLATION')
// => "天蝎座"
Mock.mock({
    constellation: '@CONSTELLATION'
})
// => { constellation: "射手座" }
```

<!-- 下面是 Mock.Random 内置支持的方法说明。 -->

<!-- > 你可以打开控制台，随意地试验这些方法。 -->
