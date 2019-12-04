<p style="text-align: center">
  <img src="https://lavyun.github.io/better-mock/images/logo-hor.png">
</p>

[![Build Status](https://travis-ci.org/lavyun/better-mock.svg?branch=master)](https://travis-ci.org/lavyun/better-mock)
[![Coverage Status](https://coveralls.io/repos/github/lavyun/better-mock/badge.svg?branch=master)](https://coveralls.io/github/lavyun/better-mock?branch=master)
![npm](https://img.shields.io/npm/v/better-mock)
![NPM](https://img.shields.io/npm/l/better-mock)
![npm](https://img.shields.io/npm/dw/better-mock)
![type-coverage](https://img.shields.io/badge/dynamic/json?color=brightgreen&label=type-coverage&suffix=%&query=%24.typeCoverage.atLeast&url=https%3A%2F%2Fraw.githubusercontent.com%2Flavyun%2Fbetter-mock%2Fmaster%2Fpackage.json)

## 介绍

**Better-Mock** Fork 自 [Mock.js](https://github.com/nuysoft/Mock)，使用方法和 Mock.js 一致，用于 javascript mock 数据生成，它可以拦截 `XHR` 和 `fetch` 请求，并返回自定义的数据类型。

[文档介绍](http://lavyun.github.io/better-mock)

[更新日志](https://lavyun.github.io/better-mock/changelog/)

## 为什么有 Better-Mock ?

Mock.js 是一个很好的库，国内使用者众多，虽然该库几乎已经停止维护了，但是还是有很多使用者在提 issue 和 PR，这些问题都得不到有效的解决。而且在当前时代下，Mock.js 的构建工具、代码质量都显得很陈旧，所以 `better-mock` 将会在 Mock.js 的基础上进行迭代，持续修复 Mock.js 的众多issue，支持更多的新特性。

## 特点

* 100% 兼容 [Mock.js](https://github.com/nuysoft/Mock)。
* 使用 `typescript` 进行重构，更好的代码提示。
* 更加现代化的构建打包方案。
* 更加完善的单元测试。
* 支持对 `fetch` 的拦截。
* more...

## 安装

```shell
npm install better-mock
```

## 使用

使用 `better-mock` 代替 `mockjs`。

```js
const Mock = require('better-mock')
Mock.mock({
  'list|1-10': [{
    'id|+1': 1
  }]
})
```

## License
Mock.js is available under the terms of the [MIT License](./LICENSE).