const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  title: 'Better-Mock',
  description: 'Mock.js plus',
  base: '/better-mock/',
  themeConfig: {
    nav: [
      { text: '文档', link: '/document/' },
      { text: '练习', link: '/playground/' },
      { text: '更新日志', link: '/changelog/' },
      { text: 'Github', link: 'http://github.com/lavyun/better-mock' },
    ],
    sidebar: {
      '/document/': [
        ['/document/', '介绍'],
        ['/document/syntax-specification', '语法规范'],
        ['/document/mock/', 'Mock.mock()'],
        ['/document/setup/', 'Mock.setup()'],
        {
          title: 'Mock.Random',
          children: [
            ['/document/random/basic', 'basic'],
            ['/document/random/date', 'date'],
            ['/document/random/image', 'image'],
            ['/document/random/color', 'color'],
            ['/document/random/text', 'text'],
            ['/document/random/name', 'name'],
            ['/document/random/web', 'web'],
            ['/document/random/address', 'address'],
            ['/document/random/helper', 'helper'],
            ['/document/random/miscellaneous', 'miscellaneous']
          ]
        },
        ['/document/valid/', 'Mock.valid()'],
        ['/document/toJSONSchema/', 'Mock.toJSONSchema()'],
        ['/document/miniprogram', '在小程序中使用']
      ],
      '/changelog/': [
        ''
      ]
    }
  },
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      config.plugins.push(new MonacoWebpackPlugin({
        languages: ["typescript", "javascript", "css"],
      }))
    }
  }
}
