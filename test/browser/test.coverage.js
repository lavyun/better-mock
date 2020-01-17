const originDesign = Object.assign
Object.assign = undefined

const Mock = require('../../dist/mock.browser')
const Random = Mock.Random
const expect = require('chai').expect

describe('Coverage', () => {
  it('object.assign is not defined', () => {
    const data = Random.boolean()
    expect(data).to.be.an('boolean')
    Object.assign = originDesign
  })

  it('Util.keys', () => {
    const obj = { name: 1 }
    const obj1 = { age: 2 }
    Object.setPrototypeOf(obj, obj1)
    const keys = Mock.Util.keys(obj)
    expect(keys.length).to.equal(1)
  })

  it('Util.values', () => {
    const obj = { name: 1 }
    const obj1 = { age: 2 }
    Object.setPrototypeOf(obj, obj1)
    const keys = Mock.Util.values(obj)
    expect(keys.length).to.equal(1)
  })

  it('Util.heredoc', () => {
    const data = Mock.Util.heredoc(function () {
      /*
        This is a comment.
        This is second line.
       */
    })
    expect(data).to.equal(`This is a comment.
        This is second line.`)
  })

  it('Util.noop', () => {
    const data = Mock.Util.noop()
    expect(data).to.equal(undefined)
  })

  it('Util.createCustomEvent', () => {
    const originCustomEvent = window.CustomEvent
    window.CustomEvent = null
    expect(() => {
      new CustomEvent('test-event')
    }).to.throw(TypeError)
    const event = Mock.Util.createCustomEvent('test-event')
    expect(event).to.instanceof(originCustomEvent)
    window.CustomEvent = originCustomEvent
  })

  it('Random.boolean', () => {
    const data = Random.boolean('hello', 'world', true)
    expect(data).to.be.an('boolean')

    const data1 = Random.boolean(null, null, true)
    expect(data1).to.be.an('boolean')
  })

  it('Random.dataImage', () => {
    const originGetContext = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = () => null
    const data = Random.dataImage()
    expect(data).to.equal('')
    HTMLCanvasElement.prototype.getContext = originGetContext
  })

  it('Handler.placeholder', () => {
    const originEval = window.eval
    window.eval = null
    const data = Mock.mock("@boolean(['hello'],)")
    expect(data).to.be.oneOf([true, false])
    window.eval = originEval
  })

  it('Handler.placeholder - Random.xx is not function', () => {
    Random.testFn = 1
    const data = Mock.mock('@testFn')
    expect(data).to.equal('')
  })

  it('Mock.setting.parseTimeout', () => {
    Mock.setup({ timeout: {} })
    Mock.mock('http://Mock.setting.parseTimeout', {})
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'http://Mock.setting.parseTimeout')
    expect(xhr.custom.timeout).to.equal(0)
    Mock.setup({ timeout: '10-50' })
  })
})

