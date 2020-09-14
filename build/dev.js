const fs = require('fs')
const rollup = require('rollup')
const spinner = require('ora')()

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

const builds = require('./config').getAllBuilds()

const watcher = rollup.watch(builds[0])

watcher.on('event', event => {
  if (event.code === 'BUNDLE_START') {
    spinner.start('Building!')
  }
  if (event.code === 'BUNDLE_END') {
    spinner.succeed('Build complete!')
  }
})
