<!-- ### Color -->

## Random.color()

* Random.color()

随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。

<!-- **使用示例**如下所示： -->

```js
Random.color()
// => "#3538B2"
```

## Random.hex()

* Random.hex()

随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。

<!-- **使用示例**如下所示： -->

```js
Random.hex()
// => "#3538B2"
```

## Random.rgb()

* Random.rgb()

随机生成一个有吸引力的颜色，格式为 'rgb(r, g, b)'。

<!-- **使用示例**如下所示： -->

```js
Random.rgb()
// => "rgb(242, 198, 121)"
```

## Random.rgba()

* Random.rgba()

随机生成一个有吸引力的颜色，格式为 'rgba(r, g, b, a)'。

<!-- **使用示例**如下所示： -->

```js
Random.rgba()
// => "rgba(242, 198, 121, 0.13)"
```

## Random.hsl()

* Random.hsl()

随机生成一个有吸引力的颜色，格式为 'hsl(h, s, l)'。

<!-- **使用示例**如下所示： -->

```js
Random.hsl()
// => "hsl(345, 82, 71)"
```

<!-- 下面是一些随机生成的颜色：

<button id="genColor" type="button" class="btn btn-default">重新生成一批</button>

<div id="color100" class="color_100"></div>
<style type="text/css">
    .circle {
        display: inline-block;
        width: 5em;
        height: 5em;
        border-radius: 50%;
        margin: 0 1em 1em 0;
        line-height: 5em;
        vertical-align: middle;
        text-align: center;
        color: #FFF;
    }
</style>
<script>
    $(function(){
        $('#genColor').on('click', function(event){
            var container = $('#color100').empty()
            var color
            for (var i = 0; i < 35; i++) {
                color = Random.color()
                $('<span class="circle"></span>')
                    .css('background-color', color)
                    .appendTo(container)
            }      
        }).trigger('click')
    })
</script>
 -->