import { isObject } from '../utils'

const number = Number

const boolean = Boolean

const string = String

const transfer = {
  number,
  boolean,
  string,
  extend
}

function extend (source: object) {
  if (isObject(source)) {
    for (const key in source) {
      transfer[key] = source[key]
    }
  }
}

export default transfer