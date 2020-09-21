// Mock.Random
import * as basic from './basic'
import * as date from './date'
import * as image from './image'
import * as color from './color'
import * as text from './text'
import * as name from './name'
import * as web from './web'
import * as address from './address'
import * as helper from './helper'
import * as misc from './misc'
import { isObject } from '../utils'

const random = {
  extend: extendFunc,
  ...basic,
  ...date,
  ...image,
  ...color,
  ...text,
  ...name,
  ...web,
  ...address,
  ...helper,
  ...misc
}

function extendFunc (source: object) {
  if (isObject(source)) {
    for (const key in source) {
      random[key] = source[key]
    }
  }
}

export default random
