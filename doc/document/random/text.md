## Random.paragraph

* Random.paragraph()
* Random.paragraph( len )
* Random.paragraph( min, max )

随机生成一段文本。

### len <Badge text="可选"/>

指示文本中句子的个数。默认值为 3 到 7 之间的随机数。

### min <Badge text="可选"/>

指示文本中句子的最小个数。默认值为 3。

### max <Badge text="可选"/>

指示文本中句子的最大个数。默认值为 7。


```js
Random.paragraph()
// => "Yohbjjz psxwibxd jijiccj kvemj eidnus disnrst rcconm bcjrof tpzhdo ncxc yjws jnmdmty. Dkmiwza ibudbufrnh ndmcpz tomdyh oqoonsn jhoy rueieihtt vsrjpudcm sotfqsfyv mjeat shnqmslfo oirnzu cru qmpt ggvgxwv jbu kjde. Kzegfq kigj dtzdd ngtytgm comwwoox fgtee ywdrnbam utu nyvlyiv tubouw lezpkmyq fkoa jlygdgf pgv gyerges wbykcxhwe bcpmt beqtkq. Mfxcqyh vhvpovktvl hrmsgfxnt jmnhyndk qohnlmgc sicmlnsq nwku dxtbmwrta omikpmajv qda qrn cwoyfaykxa xqnbv bwbnyov hbrskzt. Pdfqwzpb hypvtknt bovxx noramu xhzam kfb ympmebhqxw gbtaszonqo zmsdgcku mjkjc widrymjzj nytudruhfr uudsitbst cgmwewxpi bye. Eyseox wyef ikdnws weoyof dqecfwokkv svyjdyulk glusauosnu achmrakky kdcfp kujrqcq xojqbxrp mpfv vmw tahxtnw fhe lcitj."
    
Random.paragraph(2)
// => "Dlpec hnwvovvnq slfehkf zimy qpxqgy vwrbi mok wozddpol umkek nffjcmk gnqhhvm ztqkvjm kvukg dqubvqn xqbmoda. Vdkceijr fhhyemx hgkruvxuvr kuez wmkfv lusfksuj oewvvf cyw tfpo jswpseupm ypybap kwbofwg uuwn rvoxti ydpeeerf."
    
Random.paragraph(1, 3)
// => "Qdgfqm puhxle twi lbeqjqfi bcxeeecu pqeqr srsx tjlnew oqtqx zhxhkvq pnjns eblxhzzta hifj csvndh ylechtyu."
```

## Random.cparagraph

* Random.cparagraph()
* Random.cparagraph( len )
* Random.cparagraph( min, max )

随机生成一段中文文本。

参数的含义和默认值同 **Random.paragraph**

```js
Random.cparagraph()
// => "给日数时化周作少情者美制论。到先争劳今已美变江以好较正新深。族国般建难出就金感基酸转。任部四那响成族利标铁导术一或已于。省元切世权往着路积会其区素白思断。加把他位间存定国工取除许热规先法方。"
    
Random.cparagraph(2)
// => "去话起时为无子议气根复即传月广。题林里油步不约认山形两标命导社干。"
    
Random.cparagraph(1, 3)
// => "候无部社心性有构员其深例矿取民为。须被亲需报每完认支这明复几下在铁需连。省备可离展五斗器就石正队除解动。"
```

## Random.sentence

* Random.sentence()
* Random.sentence( len )
* Random.sentence( min, max )

随机生成一个句子，第一个单词的首字母大写。

### len <Badge text="可选"/>

指示句子中单词的个数。默认值为 12 到 18 之间的随机数。

### min <Badge text="可选"/>

指示句子中单词的最小个数。默认值为 12。

### max <Badge text="可选"/>

指示句子中单词的最大个数。默认值为 18。

```js
Random.sentence()
// => "Jovasojt qopupwh plciewh dryir zsqsvlkga yeam."
Random.sentence(5)
// => "Fwlymyyw htccsrgdk rgemfpyt cffydvvpc ycgvno."
Random.sentence(3, 5)
// => "Mgl qhrprwkhb etvwfbixm jbqmg."
```

## Random.csentence

* Random.csentence()
* Random.csentence( len )
* Random.csentence( min, max )

随机生成一段中文文本。

参数的含义和默认值同 **Random.sentence**

```js
Random.csentence()
// => "第任人九同段形位第律认得。"
    
Random.csentence(2)
// => "维总。"
    
Random.csentence(1, 3)
// => "厂存。"
```

## Random.word

* Random.word()
* Random.word( len )
* Random.word( min, max )

随机生成一个单词。

### len <Badge text="可选"/>

指示单词中字符的个数。默认值为 3 到 10 之间的随机数。

### min <Badge text="可选"/>

指示单词中字符的最小个数。默认值为 3。

### max <Badge text="可选"/>

指示单词中字符的最大个数。默认值为 10。

```js
Random.word()
// => "fxpocl"
Random.word(5)
// => "xfqjb"
Random.word(3, 5)
// => "kemh"
```

## Random.cword

* Random.cword()
* Random.cword( pool )
* Random.cword( length )
* Random.cword( pool, length )
* Random.cword( min, max )
* Random.cword( pool, min, max )

随机生成一个汉字。

### pool <Badge text="可选"/>

汉字字符串。表示汉字字符池，将从中选择一个汉字字符返回。

### min <Badge text="可选"/>

随机汉字字符串的最小长度。默认值为 1。

### max <Badge text="可选"/>

随机汉字字符串的最大长度。默认值为 1。

```js
Random.cword()
// => "干"
Random.cword('零一二三四五六七八九十')
// => "六"
Random.cword(3)
// => "别金提"
Random.cword('零一二三四五六七八九十', 3)
// => ""七七七""
Random.cword(5, 7)
// => "设过证全争听"
Random.cword('零一二三四五六七八九十', 5, 7)
// => "九七七零四"
```

## Random.emoji

* Random.emoji()
* Random.emoji( pool )
* Random.emoji( length )
* Random.emoji( pool, length )
* Random.emoji( min, max )
* Random.emoji( pool, min, max )

随机生成一个或多个 emoji 表情字符。

### pool <Badge text="可选"/>

可以是任意字符串，如常用字符、特殊字符、emoji等，将从中选择一个或多个字符返回。

### min <Badge text="可选"/>

随机 emoji 字符串的最小长度。默认值为 1。

### max <Badge text="可选"/>

随机 emoji 字符串的最大长度。默认值为 1。

```js
Random.emoji()
// => "😷"
Random.emoji('😀😁😂😃😄')
// => "😁"
Random.emoji(3)
// => "😂😃😄"
Random.emoji('😀😁😂😃😄', 2)
// => ""😃😀""
Random.emoji(3, 6)
// => "🐥🐄🍪🌘😷🙊"
Random.emoji('123🌘😷🙊★♠♫', 3, 6)
// => "★2🌘😷"
```

## Random.title

* Random.title()
* Random.title( len )
* Random.title( min, max )

随机生成一句标题，其中每个单词的首字母大写。

### len <Badge text="可选"/>

指示单词中字符的个数。默认值为 3 到 7 之间的随机数。

### min <Badge text="可选"/>

指示单词中字符的最小个数。默认值为 3。

### max <Badge text="可选"/>

指示单词中字符的最大个数。默认值为 7。

```js
Random.title()
// => "Rduqzr Muwlmmlg Siekwvo Ktn Nkl Orn"
Random.title(5)
// => "Ahknzf Btpehy Xmpc Gonehbnsm Mecfec"
Random.title(3, 5)
// => "Hvjexiondr Pyickubll Owlorjvzys Xfnfwbfk"
```

## Random.ctitle

* Random.ctitle()
* Random.ctitle( len )
* Random.ctitle( min, max )

随机生成一句中文标题。

参数的含义和默认值同 **Random.title**

### len <Badge text="可选"/>

指示单词中字符的个数。默认值为 3 到 7 之间的随机数。

### min <Badge text="可选"/>

指示单词中字符的最小个数。默认值为 3。

### max <Badge text="可选"/>

指示单词中字符的最大个数。默认值为 7。

```js
Random.ctitle()
// => "证构动必作"
Random.ctitle(5)
// => "应青次影育"
Random.ctitle(3, 5)
// => "出料阶相"
```
