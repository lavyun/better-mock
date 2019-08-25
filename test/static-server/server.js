const path = require('path')
const express = require('express')

const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/files', express.static(path.resolve(__dirname, './files')))

app.listen('5656', function () {
  console.log('static server running...')
})

// wait 5 seconds for test case execute
setTimeout(function () {
  process.exit(1)
}, 5000)
