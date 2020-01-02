const Mock = require('../../dist/mock.browser')
const expect = require('chai').expect
const $ = require('jquery')

describe('XHR', function () {
  function stringify (json) {
    return JSON.stringify(json /*, null, 4*/)
  }

  function ajaxFailedHandler (jqXHR, textStatus, errorThrown) {
    console.log({jqXHR, textStatus, errorThrown})
    throw new Error('mock error')
  }

  describe('jQuery.ajax()', function () {
    it('', function (done) {
      var that = this
      var url = Math.random()
      $.ajax({
        url: url,
        dataType: 'json'
      }).done(function (/*data, textStatus, jqXHR*/) {
        // 不会进入
      }).fail(function (jqXHR /*, textStatus, errorThrown*/) {
        // 浏览器 || PhantomJS
        expect([404, 0]).to.include(jqXHR.status)
        that.test.title += url + ' => ' + jqXHR.status
      }).always(function () {
        done()
      })
    })
  })
  describe('jQuery.ajax() XHR Fields', function () {
    it('', function (done) {
      var that = this
      var url = Math.random()
      var xhr
      $.ajax({
        xhr: function () {
          xhr = $.ajaxSettings.xhr()
          return xhr
        },
        url: url,
        dataType: 'json',
        xhrFields: {
          timeout: 123,
          withCredentials: true
        }
      }).done(function (/*data, textStatus, jqXHR*/) {
        // 不会进入
      }).fail(function (jqXHR /*, textStatus, errorThrown*/) {
        // 浏览器 || PhantomJS
        expect([404, 0]).to.include(jqXHR.status)
        that.test.title += url + ' => ' + jqXHR.status
        expect(xhr.timeout).to.be.equal(123)
        expect(xhr.withCredentials).to.be.equal(true)
      }).always(function () {
        done()
      })
    })
  })

  describe('Mock.mock( rurl, template )', function () {
    it('', function (done) {
      var that = this
      var url = 'rurl_template.json'

      Mock.mock(/rurl_template.json/, {
        'list|1-10': [{
          'id|+1': 1,
          'email': '@EMAIL'
        }]
      })

      Mock.setup({
        // timeout: 100,
        timeout: '10-50'
      })
      $.ajax({
        url: url,
        dataType: 'json'
      }).done(function (data /*, textStatus, jqXHR*/) {
        that.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('list').that.be.an('array').with.length.within(1, 10)
        data.list.forEach(function (item, index) {
          if (index > 0) expect(item.id).to.be.equal(data.list[index - 1].id + 1)
        })
      }).fail(ajaxFailedHandler).always(function () {
        done()
      })
    })
  })

  describe('Mock.mock( rurl, template ) + route_pattern', function () {
    before(() => {
      Mock.mock('/rurl_template/route/pattern/:id', {
        'list|1-10': [{
          'id|+1': 1,
          'email': '@EMAIL'
        }]
      })
    })

    it('route_pattern => not found', async () => {
      try {
        await $.ajax({ 
          url: '/rurl_template/route/pattern', 
          dataType: 'json' 
        })
      } catch (jqXHR) {
        expect([404, 0]).to.include(jqXHR.status)
      }
    })

    it('route_pattern => ok', async () => {
      const data = await $.ajax({ 
        url: '/rurl_template/route/pattern/1', 
        dataType: 'json' 
      })

      expect(data.list.length).to.be.within(1, 10)
      data.list.forEach(function (item, index) {
        if (index > 0) expect(item.id).to.be.equal(data.list[index - 1].id + 1)
      })
    })
  })

  describe('Mock.mock( rurl, template ) + route_pattern_regexp', function () {
    before(() => {
      Mock.mock('/rurl_template/route/pattern/regexp/:id.(mp4|mov)', {
        'list|1-10': [{
          'id|+1': 1,
          'email': '@EMAIL'
        }]
      })
    })

    it('route_pattern_regexp => not found', async () => {
      try {
        await $.ajax({ 
          url: '/rurl_template/route/pattern/regexp/1', 
          dataType: 'json' 
        })
      } catch (jqXHR) {
        expect([404, 0]).to.include(jqXHR.status)
      }
    })

    it('route_pattern_regexp => ok', async function () {
      const data = await $.ajax({ 
        url: '/rurl_template/route/pattern/regexp/1.mp4', 
        dataType: 'json' 
      })
      expect(data.list.length).to.be.within(1, 10)
      data.list.forEach(function (item, index) {
        if (index > 0) expect(item.id).to.be.equal(data.list[index - 1].id + 1)
      })
    })
  })

  describe('Mock.mock( rurl, template ) + route_pattern_wild', function () {
    before(() => {
      Mock.mock('/rurl_template/route/wild/pattern/*', {
        'list|1-10': [{
          'id|+1': 1,
          'email': '@EMAIL'
        }]
      })
    })

    it('route_pattern_wild => not found', async () => {
      try {
        await $.ajax({ 
          url: '/rurl_template/route/wild/pattern', 
          dataType: 'json' 
        })
      } catch (jqXHR) {
        expect([404, 0]).to.include(jqXHR.status)
      }
    })

    it('route_pattern_wild => ok', async function () {
      const data = await $.ajax({ 
        url: '/rurl_template/route/wild/pattern/1/2/3', 
        dataType: 'json' 
      })
      expect(data.list.length).to.be.within(1, 10)
      data.list.forEach(function (item, index) {
        if (index > 0) expect(item.id).to.be.equal(data.list[index - 1].id + 1)
      })
    })
  })

  describe('Mock.mock( rurl, function(options) )', function () {
    it('', function (done) {
      var that = this
      var url = 'rurl_function.json'

      Mock.mock(/rurl_function\.json/, function (options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url)
        expect(options.type).to.be.equal('GET')
        expect(options.body).to.be.equal(null)
        expect(options.headers['test-request-header']).to.be.equal('better-mock')
        return Mock.mock({
          'list|1-10': [{
            'id|+1': 1,
            'email': '@EMAIL'
          }]
        })
      })

      $.ajax({
        url: url,
        dataType: 'json',
        headers: {
          'test-request-header': 'better-mock'
        }
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('list').that.be.an('array').with.length.within(1, 10)
        data.list.forEach(function (item, index) {
          if (index > 0) expect(item.id).to.be.equal(data.list[index - 1].id + 1)
        })
      }).fail(ajaxFailedHandler).always(function () {
        done()
      })
    })
  })

  describe('Mock.mock( rurl, function(options) ) + GET + data', function () {
    it('', function (done) {
      var that = this
      var url = 'rurl_function.json'

      Mock.mock(/rurl_function\.json/, function (options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url + '?foo=1')
        expect(options.type).to.be.equal('GET')
        expect(options.body).to.be.equal(null)
        return Mock.mock({
          'list|1-10': [{
            'id|+1': 1,
            'email': '@EMAIL'
          }]
        })
      })

      $.ajax({
        url: url,
        dataType: 'json',
        data: {
          foo: 1
        }
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('list')
          .that.be.an('array').with.length.within(1, 10)
        data.list.forEach(function (item, index) {
          if (index > 0) expect(item.id).to.be.equal(data.list[index - 1].id + 1)
        })
      }).fail(ajaxFailedHandler).always(function () {
        done()
      })
    })
  })

  describe('Mock.mock( rurl, function(options) ) + POST + data', function () {
    it('', function (done) {
      var that = this
      var url = 'rurl_function.json'

      Mock.mock(/rurl_function\.json/, function (options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url)
        expect(options.type).to.be.equal('POST')
        expect(options.body).to.be.equal('foo=1')
        return Mock.mock({
          'list|1-10': [{
            'id|+1': 1,
            'email': '@EMAIL'
          }]
        })
      })

      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: {
          foo: 1
        }
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += url + ' => ' + stringify(data)
        expect(data).to.have.property('list')
          .that.be.an('array').with.length.within(1, 10)
        data.list.forEach(function (item, index) {
          if (index > 0) expect(item.id).to.be.equal(data.list[index - 1].id + 1)
        })
      }).fail(ajaxFailedHandler).always(function () {
        done()
      })
    })
  })

  describe('Mock.mock( rurl, rtype, template )', function () {
    it('', function (done) {
      var that = this
      var url = 'rurl_rtype_template.json'
      var count = 0

      Mock.mock(/rurl_rtype_template\.json/, 'get', {
        'list|1-10': [{
          'id|+1': 1,
          'email': '@EMAIL',
          type: 'get'
        }]
      })
      Mock.mock(/rurl_rtype_template\.json/, 'post', {
        'list|1-10': [{
          'id|+1': 1,
          'email': '@EMAIL',
          type: 'post'
        }]
      })

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json'
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += 'GET ' + url + ' => ' + stringify(data) + ' '
        expect(data).to.have.property('list')
          .that.be.an('array').with.length.within(1, 10)
        data.list.forEach(function (item, index) {
          if (index > 0) expect(item.id).to.be.equal(data.list[index - 1].id + 1)
          expect(item).to.have.property('type').equal('get')
        })
      }).done(success).always(complete)

      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json'
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += 'POST ' + url + ' => ' + stringify(data) + ' '
        expect(data).to.have.property('list')
          .that.be.an('array').with.length.within(1, 10)
        data.list.forEach(function (item, index) {
          if (index > 0) expect(item.id).to.be.equal(data.list[index - 1].id + 1)
          expect(item).to.have.property('type').equal('post')
        })
      }).done(success).always(complete)

      function success (/*data*/) {
        count++
      }

      function complete () {
        if (count === 2) done()
      }

    })
  })

  describe('Mock.mock( rurl, rtype, function(options) )', function () {
    it('', function (done) {
      var that = this
      var url = 'rurl_rtype_function.json'
      var count = 0

      Mock.mock(/rurl_rtype_function\.json/, /get/, function (options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url)
        expect(options.type).to.be.equal('GET')
        expect(options.body).to.be.equal(null)
        return {
          type: 'get'
        }
      })
      Mock.mock(/rurl_rtype_function\.json/, /post|put/, function (options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url)
        expect(['POST', 'PUT']).to.include(options.type)
        expect(options.body).to.be.equal(null)
        return {
          type: options.type.toLowerCase()
        }
      })

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json'
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += 'GET ' + url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'get')
      }).done(success).always(complete)

      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json'
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += 'POST ' + url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'post')
      }).done(success).always(complete)

      $.ajax({
        url: url,
        type: 'put',
        dataType: 'json'
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += 'PUT ' + url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'put')
      }).done(success).always(complete)

      function success (/*data*/) {
        count++
      }

      function complete () {
        if (count === 3) done()
      }

    })
  })
  describe('Mock.mock( rurl, rtype, function(options) ) + data', function () {
    it('', function (done) {
      var that = this
      var url = 'rurl_rtype_function.json'
      var count = 0

      Mock.mock(/rurl_rtype_function\.json/, /get/, function (options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url + '?foo=1')
        expect(options.type).to.be.equal('GET')
        expect(options.body).to.be.equal(null)
        return {
          type: 'get'
        }
      })
      Mock.mock(/rurl_rtype_function\.json/, /post|put/, function (options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url)
        expect(['POST', 'PUT']).to.include(options.type)
        expect(options.body).to.be.equal('foo=1')
        return {
          type: options.type.toLowerCase()
        }
      })

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {
          foo: 1
        }
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += 'GET ' + url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'get')
      }).done(success).always(complete)

      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: {
          foo: 1
        }
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += 'POST ' + url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'post')
      }).done(success).always(complete)

      $.ajax({
        url: url,
        type: 'put',
        dataType: 'json',
        data: {
          foo: 1
        }
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += 'PUT ' + url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'put')
      }).done(success).always(complete)

      function success (/*data*/) {
        count++
      }

      function complete () {
        if (count === 3) done()
      }

    })
  })

  describe('Mock.mock( rurl, rtype, function(options) ) + get params', function () {
    it('', function (done) {
      var that = this
      var url = 'rurl_rtype_function.json'

      Mock.mock('rurl_rtype_function.json', 'get', function (options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url + '?foo=1')
        expect(options.type).to.be.equal('GET')
        expect(options.body).to.be.equal(null)
        return {
          type: 'get'
        }
      })

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {
          foo: 1
        }
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += 'GET ' + url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'get')
      }).fail(ajaxFailedHandler).always(function () {
        done()
      })
    })
  })

  describe('Mock.mock( rurl, rtype, function(options) ) + method not case sensitive', function () {
    it('', function (done) {
      var that = this
      var url = 'rurl_rtype_function.json'

      Mock.mock('rurl_rtype_function.json', 'GET', function (options) {
        expect(options).to.not.equal(undefined)
        expect(options.url).to.be.equal(url + '?foo=1')
        expect(options.type).to.be.equal('GET')
        expect(options.body).to.be.equal(null)
        return {
          type: 'get'
        }
      })

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {
          foo: 1
        }
      }).done(function (data /*, status, jqXHR*/) {
        that.test.title += 'GET ' + url + ' => ' + stringify(data)
        expect(data).to.have.property('type', 'get')
      }).fail(ajaxFailedHandler).always(function () {
        done()
      })
    })
  })
  
  describe('MockXMLHttpRequest', () => {
    describe ('getResponseHeader', () => {
      it ('match', () => {
        const xhr = new Mock.XHR()
        xhr.custom.responseHeaders['hello'] = 'better-mock'
        xhr.match = true
        const resHeader = xhr.getResponseHeader('hello')
        expect(resHeader).to.equal('better-mock')
      })

      it ('no-match', () => {
        const xhr = new Mock.XHR()
        xhr.custom.responseHeaders['hello'] = 'better-mock'
        const resHeader = xhr.getResponseHeader('hello')
        expect(resHeader).to.equal(null)
      })
    })

    describe ('getAllResponseHeaders', () => {
      it ('match', () => {
        const xhr = new Mock.XHR()
        xhr.custom.responseHeaders['hello'] = 'better-mock'
        xhr.custom.responseHeaders['world'] = 'better-mock'
        xhr.match = true
        const resHeaders = xhr.getAllResponseHeaders()
        expect(resHeaders).to.equal('hello: better-mock\r\nworld: better-mock\r\n')
      })

      it ('no-match', () => {
        const xhr = new Mock.XHR()
        xhr.custom.responseHeaders['hello'] = 'better-mock'
        const resHeaders = xhr.getAllResponseHeaders('hello')
        expect(resHeaders).to.equal('')
      })
    })

    describe('EventListener', () => {
      const handler = (ev) => {
        expect(ev.type).to.equal('ready')
      }
      const xhr = new Mock.XHR()
      it ('addEventListener', () => {
        expect(Object.keys(xhr.custom.events).length).to.equal(0)
        xhr.addEventListener('ready', handler)
        expect(Object.keys(xhr.custom.events).length).to.equal(1)
        expect(xhr.custom.events.ready.length).to.equal(1)
      })

      it('dispatchEvent', () => {
        xhr.dispatchEvent({ type: 'ready' })
      })

      it ('removeEventListener', () => {
        xhr.removeEventListener('ready', handler)
        expect(Object.keys(xhr.custom.events).length).to.equal(1)
        expect(xhr.custom.events.ready.length).to.equal(0)
      })
    })

    describe('abort', () => {
      it('match', () => {
        const xhr = new Mock.XHR()
        xhr.match = true
        xhr.addEventListener('abort', (ev) => {
          expect(ev.type).to.equal('abort')
        })
        xhr.addEventListener('error', (ev) => {
          expect(ev.type).to.equal('error')
        })
        xhr.abort()
        expect(xhr.readyState).to.equal(Mock.XHR.UNSENT)
      })

      it('no-match', () => {
        const xhr = new Mock.XHR()
        xhr.abort()
        expect(xhr.custom.xhr.readyState).to.equal(Mock.XHR.UNSENT)
      })
    })
  })
})
