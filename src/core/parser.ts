// 解析数据模板（属性名部分）。
// Parser.parse( name ):
//   {
// 		parameters: [ name, inc, range, decimal ],
// 		range: [ min-max, min , max ],
// 		min: min,
// 		max: max,
// 		count : count,
// 		decimal: [dmin-dmax, dmin, dmax],
// 		dmin: dmin,
// 		dmax: dmax,
// 		dcount: dcount
//   }
import constant from '../utils/constant'
import random from '../random'

export const parse = function (name: string | undefined | number) {
  name = name === undefined ? '' : (name + '')
  
  const parameters = name.match(constant.RE_KEY)

  // name|min-max, name|count
  const range = parameters && parameters[3] && parameters[3].match(constant.RE_RANGE)
  const min = range && range[1] && parseInt(range[1], 10)
  const max = range && range[2] && parseInt(range[2], 10)
  // 如果是 min-max, 返回 min-max 之间的一个数
  // 如果是 count, 返回 count
  const count = range 
    ? range[2]
      ? random.integer(Number(min), Number(max))
      : parseInt(range[1], 10)
    : undefined

  const decimal = parameters && parameters[4] && parameters[4].match(constant.RE_RANGE)
  const dmin = decimal && decimal[1] && parseInt(decimal[1], 10)
  const dmax = decimal && decimal[2] && parseInt(decimal[2], 10)
  // int || dmin-dmax
  const dcount = decimal 
    ? decimal[2] 
      ? random.integer(Number(dmin), Number(dmax))
      : parseInt(decimal[1], 10)
    : undefined

  const result = {
    // 1 name, 2 inc, 3 range, 4 decimal
    parameters,
    // 1 min, 2 max
    range,
    min,
    max,
    count,
    decimal,
    dmin,
    dmax,
    dcount
  }

  for (const r in result) {
    if (result[r] != undefined) {
      return result
    }
  }
  
  return {} as typeof result
}
