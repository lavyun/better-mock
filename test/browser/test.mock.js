// 数据占位符定义（Data Placeholder Definition，DPD）
const Mock = require('../../dist/mock.browser')
const expect = require('chai').expect

describe('Mock.mock', function () {
  describe('Mock.mock()', () => {
    it('Mock.mock() should throw an error', () => {
      expect(() => Mock.mock()).to.throw()
    })
  })
  describe('Mock.mock( String )', function () {
    it('@EMAIL', function () {
      var data = Mock.mock(this.test.title)
      expect(data).to.not.equal(this.test.title)
      this.test.title += ' => ' + data
    })
  })
  describe('Mock.mock( {} )', function () {
    it('', function () {
      var tpl = {
        'list|1-10': [{
          'id|+1': 1,
          'email': '@EMAIL'
        }]
      }
      var data = Mock.mock(tpl)
      this.test.title = JSON.stringify(tpl /*, null, 4*/) + ' => ' + JSON.stringify(data /*, null, 4*/)
      expect(data).to.have.property('list').that.be.an('array').with.length.within(1, 10)
      data.list.forEach(function (item, index) {
        if (index > 0) expect(item.id).to.equal(data.list[index - 1].id + 1)
      })
    })
  })
  describe('Mock.mock( function() )', function () {
    it('', function () {
      var fn = function () {
        return Mock.mock({
          'list|1-10': [{
            'id|+1': 1,
            'email': '@EMAIL'
          }]
        })
      }
      var data = Mock.mock(fn)
      this.test.title = fn.toString() + ' => ' + JSON.stringify(data /*, null, 4*/)
      expect(data).to.have.property('list').that.be.an('array').with.length.within(1, 10)
      data.list.forEach(function (item, index) {
        if (index > 0) expect(item.id).to.equal(data.list[index - 1].id + 1)
      })
    })
  })
})
