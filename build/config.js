const path = require('path')
const version = require('../package.json').version
const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const typescript = require('rollup-plugin-typescript2')

const resolve = p => {
  return path.resolve(__dirname,  p)
}

const createBanner = (fileName) => {
  return `/*!
  * better-mock v${version} (${fileName})
  * (c) 2019-${new Date().getFullYear()} lavyun@163.com
  * Released under the MIT License.
  */
`
}

const builds = [
  {
    entry: resolve('../src/platform/browser/index.ts'),
    dest: resolve('../dist/mock.browser.js'),
    format: 'umd',
    banner: createBanner('mock.browser.js')
  },
  {
    entry: resolve('../src/platform/browser/index.ts'),
    dest: resolve('../dist/mock.browser.min.js'),
    format: 'umd',
    banner: createBanner('mock.browser.min.js')
  },
  {
    entry: resolve('../src/platform/browser/index.ts'),
    dest: resolve('../dist/mock.browser.esm.js'),
    format: 'es',
    banner: createBanner('mock.browser.esm.js')
  },
  {
    entry: resolve('../src/platform/node/index.ts'),
    dest: resolve('../dist/mock.node.js'),
    format: 'cjs',
    banner: createBanner('mock.node.js')
  }
]

const genConfig = (name) => {
  const opts = builds[name]
  return {
    name: opts.name,
    input: opts.entry,
    plugins: [
      typescript(),
      nodeResolve(),
      replace({
        '__VERSION__': version,
        'process.env.BROWSER': opts.format !== 'cjs'
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

const getAllBuilds = () => Object.keys(builds).map(genConfig)

exports.getAllBuilds = getAllBuilds
