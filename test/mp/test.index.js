// 打包后直接在 mp 环境引入
let count = 0
let success = 0
const promiseList = []

function describe(title, cb) {
  console.log(title + '\n')
  cb()
}

function it(title, cb) {
  count++
  let status
  const context = {
    test: {
      title,
    }
  }
  try {
    const thenable = cb.call(context)
    title = context.test.title || title
    if (thenable) {
      let ready
      let readyPromise = new Promise(r => { ready = r })
      promiseList.push(readyPromise)
      thenable.then(() => {
        status = true
        success++
      }).catch(() => {
        status = false
      }).then(() => {
        console.log(`${status ? '✅' : '❌'}${title}`)
        ready()
      })
    } else {
      status = true
      success++
      console.log(`✅${title}`)
    }
  } catch (err) {
    console.error(err)
    status = false
    console.log(`❌${title}`)
  }
}

global.describe = describe
global.it = it

require('./test.random')
require('./test.dpd')
require('./test.dtd')
require('./test.mock')
require('./test.schema')
require('./test.valid')
require('./test.request')

Promise.all(promiseList).then(() => {
  console.log(`${success} passing, ${count - success} error`)
})
