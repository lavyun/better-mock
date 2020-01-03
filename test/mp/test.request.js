const Mock = require('../../dist/mock.mp')
const expect = require('chai').expect
const { describe, it } = global

// override request
Mock.mock('http://example.com', { example: 1 })

const request = (function () {
  if (typeof wx !== 'undefined') {
    return promisify(wx.request)
  }
  
  if (typeof my !== 'undefined') {
    return promisify(my.request)
  }
  
  if (typeof tt !== 'undefined') {
    return promisify(tt.request)
  }
  
  if (typeof swan !== 'undefined') {
    return promisify(swan.request)
  }
})()

function dataAssert(data) {
  expect(data)
    .to.have.property('list')
    .that.be.an('array')
    .with.length.within(1, 10)

  data.list.forEach(function(item, index) {
    if (index > 0) expect(item.id).to.be.equal(data.list[index - 1].id + 1)
  })
}

function promisify(fn) {
  return opts => {
    return new Promise((resolve, reject) => {
      fn(Object.assign(opts || {}, {
        success: resolve,
        fail: err => {
          console.log(err)
          reject(err)
        }
      }))
    })
  }
}

describe('request', () => {
  it('request - success', function () {
    return request({
      url: 'https://cnodejs.org/api/v1/topics',
      method: 'get'
    }).then(res => {
      expect(res.data.success).to.be.ok
      expect(res.data.data).to.be.an('array')
    })
  })

  it('request - fail', function () {
    return request({
      url: Math.random()
    }).catch(err => {
      expect(err.errMsg)
    })
  })

  it('Mock.setup', function () {
    Mock.setup({ timeout: 2000 })
    const url = 'http://example.com/mock_setup'

    Mock.mock(url, {
      'list|1-10': [{
        'id|+1': 1,
        'email': '@EMAIL'
      }]
    })

    const timeStart = Date.now()

    return request({
      url
    }).then(({data}) => {
      expect(Date.now() - timeStart >= 2000).to.ok
      dataAssert(data)
    })
  })

  Mock.setup({ timeout: '10-50' })

  it('Mock.mock( rurl, template )', () => {
    const url = 'http://example.com/rurl_template'
  
    Mock.mock(url, {
      'list|1-10': [
        {
          'id|+1': 1,
          email: '@EMAIL'
        }
      ]
    })

    return request({
      url
    }).then(({ data }) => {
      dataAssert(data)
    })
  })
  
  it('Mock.mock( rurl, function(options) )', () => {
    const url = 'http://example.com/rurl_function'
  
    Mock.mock(url, function(options) {
      expect(options).to.not.equal(undefined)
      expect(options.url).to.be.equal(url)
      expect(options.type).to.be.equal('GET')
      expect(options.body).to.be.equal(null)
      expect(options.headers['test-request-header']).to.be.equal('better-mock')
      return Mock.mock({
        'list|1-10': [
          {
            'id|+1': 1,
            email: '@EMAIL'
          }
        ]
      })
    })

    return request({
      url,
      header: {
        'test-request-header': 'better-mock'
      }
    }).then(({ data }) => {
      dataAssert(data)
    })
  })
  
  it('Mock.mock( rurl, function(options) ) + GET + data', () => {
    const url = 'http://example.com/rurl_function_get_data'
  
    Mock.mock(url, function(options) {
      expect(options).to.not.equal(undefined)
      expect(options.url).to.be.equal(url + '?foo=1')
      expect(options.type).to.be.equal('GET')
      expect(options.body).to.be.equal(null)
      return Mock.mock({
        'list|1-10': [
          {
            'id|+1': 1,
            email: '@EMAIL'
          }
        ]
      })
    })

    const requestUrl = url + '?foo=1'
    return request({
      url: requestUrl
    }).then(({ data }) => {
      dataAssert(data)
    })
  })
  
  it('Mock.mock( rurl, function(options) ) + POST + data', () => {
    const url = 'http://example.com/rurl_function_post_data'
  
    Mock.mock(url, function(options) {
      expect(options).to.not.equal(undefined)
      expect(options.url).to.be.equal(url)
      expect(options.type).to.be.equal('POST')
      expect(JSON.stringify(options.body)).to.be.equal('{"foo":1}')
      return Mock.mock({
        'list|1-10': [
          {
            'id|+1': 1,
            email: '@EMAIL'
          }
        ]
      })
    })

    return request({
      url,
      method: 'POST',
      data: {
        foo: 1
      }
    }).then(({ data }) => {
      dataAssert(data)
    })
  })
  
  it('Mock.mock( rurl, rtype, template ) - GET', () => {
    const url = 'http://example.com/rurl_rtype_temp_get'

    Mock.mock(url, 'get', {
      'list|1-10': [
        {
          'id|+1': 1,
          email: '@EMAIL',
          type: 'get'
        }
      ]
    })

    return request({
      url
    }).then(({ data }) => {
      dataAssert(data)
      data.list.forEach(function(item) {
        expect(item).to.have.property('type').equal('get')
      })
    })
  })

  it('Mock.mock( rurl, rtype, template ) - POST', () => {
    const url = 'http://example.com/rurl_rtype_temp_post'
    Mock.mock(url, 'post', {
      'list|1-10': [
        {
          'id|+1': 1,
          email: '@EMAIL',
          type: 'post'
        }
      ]
    })

    return request({
      url,
      method: 'POST'
    }).then(({ data }) => {
      dataAssert(data)
      data.list.forEach(function(item) {
        expect(item).to.have.property('type').equal('post')
      })
    })
  })
  
  it('Mock.mock( rurl, rtype, function(options) ) - GET', () => {
    const url = 'http://example.com/rurl_rtype_function_get'
  
    Mock.mock(url, /get/, function(options) {
      expect(options).to.not.equal(undefined)
      expect(options.url).to.be.equal(url)
      expect(options.type).to.be.equal('GET')
      expect(options.body).to.be.equal(null)
      return {
        type: 'get'
      }
    })

    return request({
      url
    }).then(({ data }) => {
      expect(data).to.have.property('type', 'get')
    })
  })

  it('Mock.mock( rurl, rtype, function(options) ) - POST|PUT', () => {
    const url = 'http://example.com/rurl_rtype_function_post_put'
    Mock.mock(url, /post|put/, function(options) {
      expect(options).to.not.equal(undefined)
      expect(options.url).to.be.equal(url)
      expect(['POST', 'PUT']).to.include(options.type)
      expect(options.body).to.be.equal(null)
      return {
        type: options.type.toLowerCase()
      }
    })

    return Promise.all([
      request({
        url,
        method: 'POST'
      }),
      request({
        url,
        method: 'PUT'
      })
    ]).then(([res1, res2]) => {
      expect(res1.data).to.have.property('type', 'post')
      expect(res2.data).to.have.property('type', 'put')
    })
  })
  
  it('Mock.mock( rurl, rtype, function(options) ) + data - GET', () => {
    const url = 'http://example.com/rurl_rtype_function_get_data'
  
    Mock.mock(url, /get/, function(options) {
      expect(options).to.not.equal(undefined)
      expect(options.url).to.be.equal(url + '?foo=1')
      expect(options.type).to.be.equal('GET')
      expect(options.body).to.be.equal(null)
      return {
        type: 'get'
      }
    })

    return request({
      url: url + '?foo=1'
    }).then(({ data }) => {
      expect(data).to.have.property('type', 'get')
    })
  })

  it('Mock.mock( rurl, rtype, function(options) ) + data - POST|PUT', () => {
    const url = 'http://example.com/rurl_rtype_function_post_put_data'
  
    Mock.mock(url, /post|put/, function(options) {
      expect(options).to.not.equal(undefined)
      expect(options.url).to.be.equal(url)
      expect(['POST', 'PUT']).to.include(options.type)
      expect(JSON.stringify(options.body)).to.be.equal('{"foo":1}')
      return {
        type: options.type.toLowerCase()
      }
    })

    return Promise.all([
      request({
        url,
        method: 'POST',
        data: { foo: 1 }
      }),
      request({
        url,
        method: 'PUT',
        data: { foo: 1 }
      })
    ]).then(([res1, res2]) => {
      expect(res1.data).to.have.property('type', 'post')
      expect(res2.data).to.have.property('type', 'put')
    })
  })
  
  it('Mock.mock( rurl, rtype, function(options) ) + get + params', () => {
    const url = 'http://example.com/rurl_rtype_function_get_params'
  
    Mock.mock(url, 'get', function(options) {
      expect(options).to.not.equal(undefined)
      expect(options.url).to.be.equal(url + '?foo=1')
      expect(options.type).to.be.equal('GET')
      expect(options.body).to.be.equal(null)
      return {
        type: 'get'
      }
    })

    return request({
      url: url + '?foo=1'
    }).then(({ data }) => {
      expect(data).to.have.property('type', 'get')
    })
  })
  
  it('Mock.mock( rurl, rtype, function(options) ) + method not case sensitive', () => {
    const url = 'http://example.com/rurl_rtype_function_not_case_sensitive'
  
    Mock.mock(url, 'GET', function(options) {
      expect(options).to.not.equal(undefined)
      expect(options.url).to.be.equal(url + '?foo=1')
      expect(options.type).to.be.equal('GET')
      expect(options.body).to.be.equal(null)
      return {
        type: 'get'
      }
    })

    return request({
      url: url + '?foo=1'
    }).then(({ data }) => {
      expect(data).to.have.property('type', 'get')
    })
  })
})

