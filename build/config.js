const path = require('path')
const version = require('../package.json').version
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')

const resolve = p => {
  return path.resolve(__dirname,  p)
}

const banner =
  '/*!\n' +
  ' * better-mock v' + version + '\n' +
  ' * (c) 2019-' + new Date().getFullYear() + ' lavyun@163.com' +
  ' * Released under the MIT License.\n' +
  ' */'

const builds = [
  {
    entry: resolve('../ts-dist/mock.browser.js'),
    dest: resolve('../dist/mock.browser.js'),
    format: 'umd',
    banner,
    target: {
      ie: '9'
    }
  },
  {
    entry: resolve('../ts-dist/mock.browser.js'),
    dest: resolve('../dist/mock.browser.min.js'),
    format: 'umd',
    banner,
    target: {
      ie: '9'
    }
  },
  {
    entry: resolve('../ts-dist/mock.browser.js'),
    dest: resolve('../dist/mock.browser.esm.js'),
    format: 'es',
    banner,
    target: {
      ie: '9'
    }
  },
  {
    entry: resolve('../ts-dist/mock.node.js'),
    dest: resolve('../dist/mock.node.js'),
    format: 'cjs',
    banner,
    target: {
      node: '6'
    }
  }
]

const genConfig = (name) => {
  const opts = builds[name]
  return {
    input: opts.entry,
    plugins: [
      nodeResolve(),
      replace({
        '__VERSION__': version,
        'process.env.BROWSER': opts.format !== 'cjs'
      }),
      json(),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        babelrc: false,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: opts.targets
            }
          ]
        ]
      })
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
