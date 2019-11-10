const log = function (obj) {
  console.log(Object.prototype.toString.call(obj) === '[object Object]' ? JSON.stringify(obj, null, 2) : obj)
}

const Mock = require('../dist/mock.common')

const result = Mock.mock({
  id: '@UUID',
  children: [{
    parentId: '@../../id'
  }],
  child: {
    parentId: '@../id'
  }
})

log(result)