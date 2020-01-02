const path = require('path')
const version = require('../package.json').version
const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const typescript = require('rollup-plugin-typescript2')

const resolve = p => {
  return path.resolve(__dirname,  p)
}

const platform = process.argv[2]

const PLATFORM_TYPES = {
  BROWSER: 'BROWSER',
  NODE: 'NODE',
  MP: 'MP'
}

const createBanner = (fileName) => {
  return `/*!
  * better-mock v${version} (${fileName})
  * (c) 2019-${new Date().getFullYear()} lavyun@163.com
  * Released under the MIT License.
  */
`
}

// 浏览器 build
const browserBuilds = [
  {
    platform: PLATFORM_TYPES.BROWSER,
    entry: resolve('../src/platform/browser/index.ts'),
    dest: resolve('../dist/mock.browser.js'),
    format: 'umd',
    banner: createBanner('mock.browser.js')
  },
  {
    platform: PLATFORM_TYPES.BROWSER,
    entry: resolve('../src/platform/browser/index.ts'),
    dest: resolve('../dist/mock.browser.min.js'),
    format: 'umd',
    banner: createBanner('mock.browser.min.js')
  },
  {
    platform: PLATFORM_TYPES.BROWSER,
    entry: resolve('../src/platform/browser/index.ts'),
    dest: resolve('../dist/mock.browser.esm.js'),
    format: 'es',
    banner: createBanner('mock.browser.esm.js')
  }
]

// node build
const nodeBuilds = [
  {
    platform: PLATFORM_TYPES.NODE,
    entry: resolve('../src/platform/node/index.ts'),
    dest: resolve('../dist/mock.node.js'),
    format: 'cjs',
    banner: createBanner('mock.node.js')
  }
]

// 小程序 build
const mpBuilds = [
  {
    platform: PLATFORM_TYPES.MP,
    entry: resolve('../src/platform/mp/index.ts'),
    dest: resolve('../dist/mock.mp.js'),
    format: 'umd',
    banner: createBanner('mock.mp.js')
  },
  {
    platform: PLATFORM_TYPES.MP,
    entry: resolve('../src/platform/mp/index.ts'),
    dest: resolve('../dist/mock.mp.esm.js'),
    format: 'es',
    banner: createBanner('mock.mp.esm.js')
  }
]

const platformMap = {
  browser: browserBuilds,
  node: nodeBuilds,
  mp: mpBuilds
}

const builds = platform 
  ? platformMap[platform] || browserBuilds
  : [
    ...browserBuilds,
    ...nodeBuilds,
    ...mpBuilds
  ]

const genConfig = (opts) => {
  return {
    input: opts.entry,
    plugins: [
      typescript(),
      nodeResolve(),
      replace({
        '__VERSION__': version,
        'process.env.PLATFORM_BROWSER': opts.platform === PLATFORM_TYPES.BROWSER,
        'process.env.PLATFORM_NODE': opts.platform === PLATFORM_TYPES.NODE,
        'process.env.PLATFORM_MP': opts.platform === PLATFORM_TYPES.MP,
      }),
      json()
    ],
    output: {
      name: 'Mock',
      file: opts.dest,
      format: opts.format,
      banner: opts.banner
    },
    onwarn: function (error) {
      if (error.code === 'THIS_IS_UNDEFINED') {
        return
      }
    }
  }
}

const getAllBuilds = () => builds.map(genConfig)

exports.getAllBuilds = getAllBuilds
