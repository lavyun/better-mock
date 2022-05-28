// 数据占位符定义（Data Placeholder Definition，DPD）
const Mock = require('../../dist/mock.node')
const Random = Mock.Random
const expect = require('chai').expect
const toArray = require('lodash/toArray')

describe('Random', function () {
  function stringify (json) {
    return JSON.stringify(json /*, null, 4*/)
  }

  function doit (expression, validator, cut) {
    it('', function () {
      const data = eval(expression)
      validator(data)
      const result = stringify(data)
      this.test.title = `${stringify(expression)} => ${cut ? result.substr(0, 100) + '...' : result}`
    })
  }

  describe('Basic', function () {
    doit('Random.boolean()', function (data) {
      expect(data).to.be.a('boolean')
    })
    doit('Random.boolean(1, 2, true)', function (data) {
      expect(data).to.be.a('boolean')
    })

    doit('Random.natural()', function (data) {
      expect(data).to.be.a('number').within(0, 9007199254740992)
    })
    doit('Random.natural(1, 3)', function (data) {
      expect(data).to.be.a('number').within(1, 3)
    })
    doit('Random.natural(1)', function (data) {
      expect(data).to.be.a('number').least(1)
    })

    doit('Random.integer()', function (data) {
      expect(data).to.be.a('number').within(-9007199254740992, 9007199254740992)
    })
    doit('Random.integer(-10, 10)', function (data) {
      expect(data).to.be.a('number').within(-10, 10)
    })

    // 1 整数部分 2 小数部分
    const RE_FLOAT = /(\-?\d+)\.?(\d+)?/

    function validFloat (float, min, max, dmin, dmax) {
      RE_FLOAT.lastIndex = 0
      const parts = RE_FLOAT.exec(float + '')

      expect(+parts[1]).to.be.a('number').within(min, max)

      if (parts[2] != undefined) {
        expect(parts[2]).to.have.length.within(dmin, dmax)
      }
    }

    doit('Random.float()', function (data) {
      validFloat(data, -9007199254740992, 9007199254740992, 0, 17)
    })
    doit('Random.float(0)', function (data) {
      validFloat(data, 0, 9007199254740992, 0, 17)
    })
    doit('Random.float(60, 100)', function (data) {
      validFloat(data, 60, 100, 0, 17)
    })
    doit('Random.float(60, 100, 3)', function (data) {
      validFloat(data, 60, 100, 3, 17)
    })
    doit('Random.float(60, 100, 3, 5)', function (data) {
      validFloat(data, 60, 100, 3, 5)
    })

    const CHARACTER_LOWER = 'abcdefghijklmnopqrstuvwxyz'
    const CHARACTER_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const CHARACTER_NUMBER = '0123456789'
    const CHARACTER_SYMBOL = '!@#$%^&*()[]'
    doit('Random.character()', function (data) {
      expect(data).to.be.a('string').with.length(1)
      expect(
        CHARACTER_LOWER +
        CHARACTER_UPPER +
        CHARACTER_NUMBER +
        CHARACTER_SYMBOL
      ).to.include(data)
    })
    doit('Random.character("lower")', function (data) {
      expect(data).to.be.a('string').with.length(1)
      expect(CHARACTER_LOWER).to.include(data)
    })
    doit('Random.character("upper")', function (data) {
      expect(data).to.be.a('string').with.length(1)
      expect(CHARACTER_UPPER).to.include(data)
    })
    doit('Random.character("number")', function (data) {
      expect(data).to.be.a('string').with.length(1)
      expect(CHARACTER_NUMBER).to.include(data)
    })
    doit('Random.character("symbol")', function (data) {
      expect(data).to.be.a('string').with.length(1)
      expect(CHARACTER_SYMBOL).to.include(data)
    })
    doit('Random.character("aeiou")', function (data) {
      expect(data).to.be.a('string').with.length(1)
      expect('aeiou').to.include(data)
    })

    doit('Random.string()', function (data) {
      expect(data).to.be.a('string').with.length.within(3, 7)
    })
    doit('Random.string(5)', function (data) {
      expect(data).to.be.a('string').with.length(5)
    })
    doit('Random.string("lower", 5)', function (data) {
      expect(data).to.be.a('string').with.length(5)
      for (let i = 0; i < data.length; i++) {
        expect(CHARACTER_LOWER).to.include(data[i])
      }
    })
    doit('Random.string(7, 10)', function (data) {
      expect(data).to.be.a('string').with.length.within(7, 10)
    })
    doit('Random.string("aeiou", 1, 3)', function (data) {
      expect(data).to.be.a('string').with.length.within(1, 3)
      for (let i = 0; i < data.length; i++) {
        expect('aeiou').to.include(data[i])
      }
    })
    doit('Random.range()', function (data) {
      expect(data).to.be.an('array').with.length(0)
    })
    doit('Random.range(10)', function (data) {
      expect(data).to.be.an('array').with.length(10)
    })
    doit('Random.range(3, 7)', function (data) {
      expect(data).to.be.an('array').deep.equal([3, 4, 5, 6])
    })
    doit('Random.range(1, 10, 2)', function (data) {
      expect(data).to.be.an('array').deep.equal([1, 3, 5, 7, 9])
    })
    doit('Random.range(1, 10, 3)', function (data) {
      expect(data).to.be.an('array').deep.equal([1, 4, 7])
    })
  })

  describe('Date', function () {
    const RE_DATE = /\d{4}-\d{2}-\d{2}/
    const RE_TIME = /\d{2}:\d{2}:\d{2}/
    const RE_DATETIME = new RegExp(RE_DATE.source + ' ' + RE_TIME.source)

    doit('Random.date()', function (data) {
      expect(RE_DATE.test(data)).to.be.true
    })

    doit('Random.time()', function (data) {
      expect(RE_TIME.test(data)).to.be.true
    })

    doit('Random.time("yyyy")', function (data) {
      expect(/\d{4}/.test(data)).to.be.true
    })

    doit('Random.datetime()', function (data) {
      expect(RE_DATETIME.test(data)).to.be.true
    })
    doit('Random.datetime("yyyy-MM-dd A HH:mm:ss")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.datetime("yyyy-MM-dd a HH:mm:ss")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.datetime("yy-MM-dd HH:mm:ss")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.datetime("y-MM-dd HH:mm:ss")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.datetime("y-M-d H:m:s")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.datetime("yyyy yy y MM M dd d HH H hh h mm m ss s SS S A a T")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.timestamp()', function (timestamp) {
      expect(timestamp).to.be.a('number')
      expect(/^\d*$/.test(timestamp)).to.be.true
    })

    doit('Random.now()', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.now("year")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.now("month")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.now("day")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.now("hour")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.now("minute")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.now("second")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.now("week")', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.now("yyyy-MM-dd HH:mm:ss SS")', function (data) {
      expect(data).to.be.ok
    })
  })

  describe('Image', function () {
    doit('Random.image()', function (data) {
      expect(data).to.include('https://iph.href.lu')
    })
    doit('Random.image("300x400")', function (data) {
      expect(data).to.include('https://iph.href.lu/300x400?bg=&fg=&text=')
    })
    doit('Random.image("300x400", "HelloWorld")', function (data) {
      expect(data).to.be.equal('https://iph.href.lu/300x400?bg=&fg=&text=HelloWorld')
    })
    doit('Random.image("300x400", "#234567", "HelloWorld")', function (data) {
      expect(data).to.be.equal('https://iph.href.lu/300x400?bg=234567&fg=&text=HelloWorld')
    })
    doit('Random.image("300x400", "#234567", "#FFFFFF", "HelloWorld")', function (data) {
      expect(data).to.be.equal('https://iph.href.lu/300x400?bg=234567&fg=FFFFFF&text=HelloWorld')
    })
    doit('Random.image("300x400", "#234567", "#FFFFFF", "png", "HelloWorld")', function (data) {
      expect(data).to.be.equal('https://dummyimage.com/300x400/234567/FFFFFF.png?text=HelloWorld')
    })
    doit('Random.dataImage()', function (data) {
      expect(data.startsWith('data:image/svg+xml;')).to.be.ok
    }, true)
    doit('Random.dataImage("300x400")', function (data) {
      console.log(data)
      expect(data.startsWith('data:image/svg+xml;')).to.be.ok
    }, true)
    doit('Random.dataImage("200x100", "HelloWorld")', function (data) {
      expect(data.startsWith('data:image/svg+xml;')).to.be.ok
    }, true)
  })

  const RE_COLOR = /^#[0-9a-fA-F]{6}$/
  const RE_COLOR_RGB = /^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/
  const RE_COLOR_RGBA = /^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, 0\.\d{1,2}\)$/
  const RE_COLOR_HSL = /^hsl\(\d{1,3}, \d{1,3}, \d{1,3}\)$/
  describe('Color', function () {
    doit('Random.color()', function (data) {
      expect(RE_COLOR.test(data)).to.true
    })
    doit('Random.color("green")', function (data) {
      expect(RE_COLOR.test(data)).to.true
      expect(data).to.equal('#2ECC40')
    })
    doit('Random.hex()', function (data) {
      expect(RE_COLOR.test(data)).to.true
    })
    doit('Random.rgb()', function (data) {
      expect(RE_COLOR_RGB.test(data)).to.true
    })
    doit('Random.rgba()', function (data) {
      expect(RE_COLOR_RGBA.test(data)).to.true
    })
    doit('Random.hsl()', function (data) {
      expect(RE_COLOR_HSL.test(data)).to.true
    })
  })

  const HANZI_RE = /^[\u4E00-\u9FA5]+$/
  describe('Text', function () {
    doit('Random.paragraph()', function (data) {
      expect(data.split('.').length - 1).to.within(3, 7)
    })
    doit('Random.paragraph(2)', function (data) {
      expect(data.split('.').length - 1).to.equal(2)
    })
    doit('Random.paragraph(1, 3)', function (data) {
      expect(data.split('.').length - 1).to.within(1, 3)
    })

    doit('Random.cparagraph()', function (data) {
      expect(/^([\u4E00-\u9FA5]{12,18}。){3,7}$/.test(data)).to.true
    })
    doit('Random.cparagraph(2)', function (data) {
      expect(/^([\u4E00-\u9FA5]{12,18}。){2,7}$/.test(data)).to.true
    })
    doit('Random.cparagraph(1, 3)', function (data) {
      expect(/^([\u4E00-\u9FA5]{12,18}。){1,3}$/.test(data)).to.true
    })

    doit('Random.sentence()', function (data) {
      expect(data[0]).to.equal(data.toUpperCase()[0])
      expect(data.split(' ').length).to.within(12, 18)
    })
    doit('Random.sentence(4)', function (data) {
      expect(data[0]).to.equal(data.toUpperCase()[0])
      expect(data.split(' ').length).to.equal(4)
    })
    doit('Random.sentence(3, 5)', function (data) {
      expect(data[0]).to.equal(data.toUpperCase()[0])
      expect(data.split(' ').length).to.within(3, 5)
    })

    doit('Random.csentence()', function (data) {
      expect(/^[\u4E00-\u9FA5]{12,18}。$/.test(data)).to.true
    })
    doit('Random.csentence(4)', function (data) {
      expect(/^[\u4E00-\u9FA5]{4,18}。$/.test(data)).to.true
    })
    doit('Random.csentence(3, 5)', function (data) {
      expect(/^[\u4E00-\u9FA5]{3,5}。$/.test(data)).to.true
    })

    doit('Random.word()', function (data) {
      expect(data).to.have.length.within(3, 10)
    })
    doit('Random.word(4)', function (data) {
      expect(data).to.have.length(4)
    })
    doit('Random.word(3, 5)', function (data) {
      expect(data).to.have.length.within(3, 5)
    })

    doit('Random.cword()', function (data) {
      expect(data.length).to.equal(1)
      expect(HANZI_RE.test(data)).to.true
    })
    doit('Random.cword(4)', function (data) {
      expect(data.length).to.equal(4)
      expect(HANZI_RE.test(data)).to.true
    })
    doit('Random.cword("临兵斗者皆阵列在前")', function (data) {
      expect(data.length).to.equal(1)
      expect(HANZI_RE.test(data)).to.true
      expect('临兵斗者皆阵列在前'.includes(data)).to.true
    })

    doit('Random.cword("临兵斗者皆阵列在前", 5)', function (data) {
      expect(data.length).to.equal(5)
      expect(HANZI_RE.test(data)).to.true
      for (let i = 0; i < data.length; i++) {
        expect('临兵斗者皆阵列在前'.includes(data[i])).to.true
      }
    })
    doit('Random.cword(3, 5)', function (data) {
      expect(data).to.have.length.within(3, 5)
      expect(HANZI_RE.test(data)).to.true
    })
    doit('Random.cword("临兵斗者皆阵列在前", 3, 5)', function (data) {
      expect(data).to.have.length.within(3, 5)
      expect(HANZI_RE.test(data)).to.true
      for (let i = 0; i < data.length; i++) {
        expect('临兵斗者皆阵列在前'.includes(data[i])).to.true
      }
    })

    /** 随机 emoji 生成测试*/
    const EMOJI_RE = /((\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55])+/
    doit('Random.emoji()', function (data) {
      expect(toArray(data).length).to.equal(1)
      expect(EMOJI_RE.test(data)).to.true
    })
    doit('Random.emoji(5)', function (data) {
      expect(toArray(data).length).to.equal(5)
      expect(EMOJI_RE.test(data)).to.true
    })

    doit('Random.emoji(2, 5)', function (data) {
      expect(toArray(data).length).to.within(2, 5)
      expect(EMOJI_RE.test(data)).to.true
    })
    doit('Random.emoji("😀😁😂😃😄", 3, 5)', function (data) {
      const array = toArray(data)
      expect(array.length).to.within(3, 5)
      expect(EMOJI_RE.test(data)).to.true
      for (let i = 0; i < array.length; i++) {
        expect('😀😁😂😃😄'.includes(array[i])).to.true
      }
    })
    doit('Random.emoji("😀123😁abc😃", 4, 5)', function (data) {
      const array = toArray(data)
      expect(array.length).to.within(4, 5)
      for (let i = 0; i < array.length; i++) {
        expect('😀123😁😂abc😃😄'.includes(array[i])).to.true
      }
    })

    doit('Random.title()', function (data) {
      const words = data.split(' ')
      words.forEach(function (word) {
        expect(word[0]).to.equal(word[0].toUpperCase())
      })
      expect(words).to.have.length.within(3, 7)
    })
    doit('Random.title(4)', function (data) {
      const words = data.split(' ')
      words.forEach(function (word) {
        expect(word[0]).to.equal(word[0].toUpperCase())
      })
      expect(words).to.have.length(4)
    })
    doit('Random.title(3, 5)', function (data) {
      const words = data.split(' ')
      words.forEach(function (word) {
        expect(word[0]).to.equal(word[0].toUpperCase())
      })
      expect(words).to.have.length.within(3, 5)
    })

    doit('Random.ctitle()', function (data) {
      expect(/^[\u4E00-\u9FA5]{3,7}$/.test(data)).to.true
    })
    doit('Random.ctitle(2)', function (data) {
      expect(/^[\u4E00-\u9FA5]{2,7}$/.test(data)).to.true
    })
    doit('Random.ctitle(1, 3)', function (data) {
      expect(/^[\u4E00-\u9FA5]{1,3}$/.test(data)).to.true
    })
  })

  describe('Name', function () {
    doit('Random.first()', function (data) {
      expect(data[0]).to.equal(data[0].toUpperCase())
    })
    doit('Random.last()', function (data) {
      expect(data[0]).to.equal(data[0].toUpperCase())
    })
    doit('Random.name()', function (data) {
      const words = data.split(' ')
      expect(words).to.have.length(2)
      expect(words[0][0]).to.equal(words[0][0].toUpperCase())
      expect(words[1][0]).to.equal(words[1][0].toUpperCase())
    })
    doit('Random.name(true)', function (data) {
      const words = data.split(' ')
      expect(words).to.have.length(3)
      expect(words[0][0]).to.equal(words[0][0].toUpperCase())
      expect(words[1][0]).to.equal(words[1][0].toUpperCase())
      expect(words[2][0]).to.equal(words[2][0].toUpperCase())
    })

    doit('Random.cfirst()', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.clast()', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.cname()', function (data) {
      expect(data).to.be.ok
    })
  })

  const RE_URL = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/
  const RE_IP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
  describe('Web', function () {
    doit('Random.url()', function (data) {
      expect(RE_URL.test(data)).to.be.true
    })
    doit('Random.url("wss", "im.example.com")', function (data) {
      expect(RE_URL.test(data)).to.be.true
    })
    doit('Random.domain()', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.domain("com")', function (data) {
      expect(data).to.include('.com')
    })
    doit('Random.tld()', function (data) {
      expect(data).to.be.ok
    })

    doit('Random.email()', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.email("nuysoft.com")', function (data) {
      expect(data).to.include('@nuysoft.com')
    })
    doit('Random.ip()', function (data) {
      expect(RE_IP.test(data)).to.be.true
    })
  })
  describe('Address', function () {
    doit('Random.region()', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.province()', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.city()', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.city(true)', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.county()', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.county(true)', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.zip()', function (data) {
      expect(data).to.be.ok
    })
    doit('Random.zip(8)', function (data) {
      expect(data.length).to.equal(8)
    })
  })
  describe('Helpers', function () {
    doit('Random.capitalize()', function (data) {
      expect(data).to.equal('Undefined')
    })
    doit('Random.capitalize("hello")', function (data) {
      expect(data).to.equal('Hello')
    })

    doit('Random.upper()', function (data) {
      expect(data).to.equal('UNDEFINED')
    })
    doit('Random.upper("hello")', function (data) {
      expect(data).to.equal('HELLO')
    })

    doit('Random.lower()', function (data) {
      expect(data).to.equal('undefined')
    })
    doit('Random.lower("HELLO")', function (data) {
      expect(data).to.equal('hello')
    })

    doit('Random.pick()', function (data) {
      expect(data).to.be.undefined
    })
    doit('Random.pick("a", "e", "i", "o", "u")', function (data) {
      expect(['a', 'e', 'i', 'o', 'u']).to.include(data)
    })
    doit('Random.pick(["a", "e", "i", "o", "u"])', function (data) {
      expect(['a', 'e', 'i', 'o', 'u']).to.include(data)
    })
    doit('Random.pick(["a", "e", "i", "o", "u"], 3)', function (data) {
      expect(data).to.be.an('array').with.length(3)
    })
    doit('Random.pick(["a", "e", "i", "o", "u"], 1, 5)', function (data) {
      expect(data).to.be.an('array').with.length.within(1, 5)
    })

    doit('Random.shuffle()', function (data) {
      expect(data).to.deep.equal([])
    })
    doit('Random.shuffle(["a", "e", "i", "o", "u"])', function (data) {
      expect(data.join('')).to.not.equal('aeiou')
      expect(data.sort().join('')).to.equal('aeiou')
    })
    doit('Random.shuffle(["a", "e", "i", "o", "u"], 3)', function (data) {
      expect(data).to.be.an('array').with.length(3)
    })
    doit('Random.shuffle(["a", "e", "i", "o", "u"], 1, 5)', function (data) {
      expect(data).to.be.an('array').with.length.within(1, 5)
    })
  })

  const RE_GUID = /[a-fA-F0-9]{8}\-[a-fA-F0-9]{4}\-[a-fA-F0-9]{4}\-[a-fA-F0-9]{4}\-[a-fA-F0-9]{12}/
  describe('Miscellaneous', function () {
    doit('Random.guid()', function (data) {
      expect(data).to.be.a('string').with.length(36)
      expect(RE_GUID.test(data)).to.be.true
    })
    doit('Random.id()', function (data) {
      expect(data).to.be.a('string').with.length(18)
    })
    doit('Random.version()', function (data) {
      expect(data).to.be.a('string')
      expect(data.split('.')).to.be.a('array').with.length(3)
    })
    doit('Random.version(4)', function (data) {
      expect(data).to.be.a('string')
      expect(data.split('.')).to.be.a('array').with.length(4)
    })
    doit('Random.phone()', function (data) {
      expect(data).to.be.a('string')
      const PHONE_RE = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
      expect(PHONE_RE.test(data)).to.be.ok
    })
  })

  describe('Extend', function () {
    Random.extend({
      test: function () {
        return this.pick(['a', 'e', 'i'])
      },
      test1: function (arr) {
        return this.pick(arr)
      }
    })
    doit('Random.test()', function (data) {
      expect(['a', 'e', 'i']).to.includes(data)
    })
    doit('Mock.mock("@TEST")', function (data) {
      expect(['a', 'e', 'i']).to.includes(data)
    })
    doit(`Random.test1(['a', 'e', 'i'])`, function (data) {
      expect(['a', 'e', 'i']).to.includes(data)
    })
    doit(`Mock.mock('@TEST(["a", "e", "i"])')`, function (data) {
      expect(['a', 'e', 'i']).to.includes(data)
    })
  })
})
