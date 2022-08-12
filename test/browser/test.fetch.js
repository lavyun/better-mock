const Mock = require('../../dist/mock.browser')
const expect = require('chai').expect
const $ = require('jquery')

function dataAssert(data) {
  expect(data)
    .to.have.property('list')
    .that.be.an('array')
    .with.length.within(1, 10)

  data.list.forEach(function(item, index) {
    if (index > 0) expect(item.id).to.be.equal(data.list[index - 1].id + 1)
  })
}

describe('Fetch', function() {
  function stringify(json) {
    return JSON.stringify(json)
  }

  describe('fetch()', () => {
    it('error', async () => {
      const url = Math.random()
      try {
        await fetch(url).then(res => res.text())
      } catch (err) {
        expect(err.message).to.be.equal('Failed to fetch')
      }
    })

    // it('success', async () => {
    //   await fetch('https://cnodejs.org/api/v1/topics')
    //     .then(res => res.json())
    //     .then(res => {
    //       expect(res.success).to.be.ok
    //       expect(res.data).to.be.an('array')
    //     })
    // })

    it('input is a request, init is undefined', async () => {
      Mock.mock('http://example.com', 'get', {
        'list|1-10': [
          {
            'id|+1': 1,
            email: '@EMAIL'
          }
        ]
      })
      const request = new Request('http://example.com', { method: 'POST', body: 'foo=1' })
      try {
        const data = await fetch(request).then(res => res.json())
        dataAssert(data)
      } catch (err) {
        console.error(err)
      }
    })
  })

  describe('Mock.setup', function () {
    it('', async function () {
      Mock.setup({ timeout: '1000' })
      const url = 'http://example.com/mock_setup'

      Mock.mock(url, {
        'list|1-10': [{
          'id|+1': 1,
          'email': '@EMAIL'
        }]
      })

      const timeStart = Date.now()

      const data = await fetch(url).then(res => res.json())

      expect(Date.now() - timeStart >= 1000).to.ok
      dataAssert(data)
    })

    after(() => {
      Mock.setup({ timeout: '10-50' })
    })
  })

  describe('Mock.mock( rurl, template )', () => {
    it('remote url', async function() {
      const url = 'http://example.com/rurl_template'

      Mock.mock(url, {
        'list|1-10': [
          {
            'id|+1': 1,
            email: '@EMAIL'
          }
        ]
      })

      try {
        const data = await fetch(url).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        dataAssert(data)
      } catch (err) {
        console.error(err)
      }
    })
  })

  describe('Mock.mock( rurl, function(options) )', () => {
    it('', async function() {
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

      try {
        const headers = new Headers()
        headers.append('test-request-header', 'better-mock')
        const data = await fetch(url, { headers }).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        dataAssert(data)
      } catch (err) {
        console.error(err)
      }
    })
  })

  describe('Mock.mock( rurl, function(options) ) + GET + data', () => {
    it('', async function() {
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

      try {
        const requestUrl = url + '?' + $.param({ foo: 1 })
        const data = await fetch(requestUrl).then(res => res.json())
        this.test.title += requestUrl + ' => ' + stringify(data)
        dataAssert(data)
      } catch (err) {
        console.log(err)
      }
    })
  })

  describe('Mock.mock( rurl, function(options) ) + POST + data', () => {
    it('', async function() {
      const url = 'http://example.com/rurl_function_post_data'

      Mock.mock(url, function(options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url)
        expect(options.type).to.be.equal('POST')
        expect(options.body).to.be.equal('{"foo":1}')
        return Mock.mock({
          'list|1-10': [
            {
              'id|+1': 1,
              email: '@EMAIL'
            }
          ]
        })
      })

      try {
        const data = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ foo: 1 })
        }).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        dataAssert(data)
      } catch (err) {
        console.error(err)
      }
    })
  })

  describe('Mock.mock( rurl, rtype, template )', () => {
    it('get ', async function() {
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

      try {
        const data = await fetch(url).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data) + ' '
        dataAssert(data)
        data.list.forEach(function(item) {
          expect(item).to.have.property('type').equal('get')
        })
      } catch (err) {
        console.log(err)
      }
    })

    it('post ', async function() {
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

      try {
        const data = await fetch(url, {
          method: 'POST'
        }).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data) + ' '
        dataAssert(data)
        data.list.forEach(function(item) {
          expect(item).to.have.property('type').equal('post')
        })
      } catch (err) {
        console.error(err)
      }
    })
  })

  describe('Mock.mock( rurl, rtype, function(options) )', () => {
    it('get ', async function() {
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

      try {
        const data = await fetch(url).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'get')
      } catch (err) {
        console.error(err)
      }
    })

    it('post|put ', async function() {
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

      try {
        const data = await fetch(url, {
          method: 'POST'
        }).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'post')
      } catch (err) {
        console.error(err)
      }

      try {
        const data = await fetch(url, {
          method: 'PUT'
        }).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'put')
      } catch (err) {
        console.error(err)
      }
    })
  })

  describe('Mock.mock( rurl, rtype, function(options) ) + data', () => {
    it('get ', async function() {
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

      try {
        const data = await fetch(url + '?' + $.param({ foo: 1 })).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'get')
      } catch (err) {
        console.error(err)
      }
    })

    it('post|put ', async function() {
      const url = 'http://example.com/rurl_rtype_function_post_put_data'

      Mock.mock(url, /post|put/, function(options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url)
        expect(['POST', 'PUT']).to.include(options.type)
        expect(options.body).to.be.equal('{"foo":1}')
        return {
          type: options.type.toLowerCase()
        }
      })

      try {
        const data = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ foo: 1 })
        }).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'post')
      } catch (err) {
        console.error(err)
      }

      try {
        const data = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify({ foo: 1 })
        }).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'put')
      } catch (err) {
        console.error(err)
      }
    })
  })

  describe('Mock.mock( rurl, rtype, function(options) ) + get + params', () => {
    it('get ', async function() {
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

      try {
        const data = await fetch(url + '?' + $.param({ foo: 1 })).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'get')
      } catch (err) {
        console.error(err)
      }
    })
  })

  describe('Mock.mock( rurl, rtype, function(options) ) + method not case sensitive', () => {
    it('', async function() {
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

      try {
        const data = await fetch(url + '?' + $.param({ foo: 1 })).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'get')
      } catch (err) {
        console.error(err)
      }
    })
  })

  describe('Mock.mock( rurl, rtype, function(options) ) + callback is a async function', () => {
    it('', async function() {
      const url = 'http://example.com/callback_is_a_async_function'

      Mock.mock(url, 'GET', function(options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url + '?foo=1')
        expect(options.type).to.be.equal('GET')
        expect(options.body).to.be.equal(null)

        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              type: 'get'
            })
          }, 1000)
        })
        
      })

      try {
        const data = await fetch(url + '?' + $.param({ foo: 1 })).then(res => res.json())
        this.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'get')
      } catch (err) {
        console.error(err)
      }
    })
  })
})

describe('window.Request', () => {
  before (() => {
    // rewrite Request
    Mock.mock('http://example.com', 'get', {
      'list|1-10': [
        {
          'id|+1': 1,
          email: '@EMAIL'
        }
      ]
    })
  })

  it('get actualUrl property', () => {
    const request1 = new Request('http://example.com')
    const request2 = new Request('/path/to')
    const request3 = new Request('path/to')
    expect(request1._actualUrl).to.be.an('string').equal('http://example.com')
    expect(request2._actualUrl).to.be.an('string').equal('/path/to')
    expect(request3._actualUrl).to.be.an('string').equal('path/to')
  })

  it('get actualBody property', () => {
    const request = new Request('http://example.com', { method: 'POST', body: 'foo=1' })
    expect(request._actualBody).to.be.an('string').equal('foo=1')
  })

  it('clone from request', () => {
    const request1 = new Request('http://example.com', { method: 'POST', body: 'foo=1' })
    const request2 = new Request(request1)
    expect(request2._actualUrl).to.be.an('string').equal('http://example.com')
    expect(request2._actualBody).to.be.an('string').equal('foo=1')
  })
})
