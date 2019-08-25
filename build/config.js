const path = require('path')
const version = require('../package.json').version
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')

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
    entry: resolve('../ts-dist/mock.js'),
    dest: resolve('../dist/mock.js'),
    format: 'umd',
    banner
  },
  {
    entry: resolve('../ts-dist/mock.js'),
    dest: resolve('../dist/mock.min.js'),
    format: 'umd',
    banner
  },
  {
    entry: resolve('../ts-dist/mock.js'),
    dest: resolve('../dist/mock.esm.js'),
    format: 'es',
    banner
  },
  {
    entry: resolve('../ts-dist/mock.common.js'),
    dest: resolve('../dist/mock.common.js'),
    format: 'cjs',
    banner
  }
]

const genConfig = (name) => {
  const opts = builds[name]
  return {
    input: opts.entry,
    plugins: [
      nodeResolve(),
      replace({
        '__VERSION__': version
      }),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
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
