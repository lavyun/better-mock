# 更新日志

## v0.0.3

发布日期：2019-11-17

### Features

* 增加 d.ts 声明文件。
* 新增 Random.phone 方法，生成一个随机的手机号。

### Optimize

* 优化 Random.dataImage 方法，移除对 node-canvas 的依赖，改为获取远端图片的 buffer，在转为base64。

### Fix

* 修复无法拦截带参数的 GET，[Mock.js#109](https://github.com/nuysoft/Mock/issues/109)，
* 修复 Mock.mock 方法中, rtype 无需区分大小写。即：`get`、`GET` 都可以被成功匹配到。

## v0.0.2

发布日期：2019-11-13

### Features

* 新增 Random.timestamp 方法 [Mock.js#372](https://github.com/nuysoft/Mock/issues/372)，随机生成一个时间戳。
* 使用 [china-location](https://github.com/JasonBoy/china-location) 库作为省市区数据源。
* 新增 Random.version 方法，随机生成一个版本号。
