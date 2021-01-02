// 处理数据模板。
// handler.gen( template, name?, context? )
import constant from '../utils/constant'
import * as utils from '../utils'
import { parse } from './parser'
import random from '../random'
import transfer from '../transfer'
import RE from './regexp'

const handler = {
  // template        属性值（即数据模板）
  // name            属性名
  // context         数据上下文，生成后的数据
  // templateContext 模板上下文，
  //
  // Handle.gen(template, name, options)
  // context
  //     currentContext, templateCurrentContext,
  //     path, templatePath
  //     root, templateRoot
  gen: function (template, name?: string | number, context?: Partial<GenerateContext>) {
    name = name === undefined ? '' : name.toString()
    context = context || {}
    context = {
      // 当前访问路径，只有属性名，不包括生成规则
      path: context.path || [constant.GUID],
      templatePath: context.templatePath || [constant.GUID++], // 最终属性值的上下文
      currentContext: context.currentContext, // 属性值模板的上下文
      templateCurrentContext: context.templateCurrentContext || template, // 最终值的根
      root: context.root || context.currentContext, // 模板的根
      templateRoot: context.templateRoot || context.templateCurrentContext || template
    }
    
    const rule = parse(name)
    const type = utils.type(template)
    let data
    
    if (handler[type]) {
      data = handler[type]({
        type, // 属性值类型
        template, // 属性值模板
        name, // 属性名
        rule,
        context,
        parsedName: name ? name.replace(constant.RE_KEY, '$1') : name,
      })
      
      if (!context.root) {
        context.root = data
      }
      return data
    }
    
    return template
  },
  
  array: function (options: GenerateOptions) {
    let result: any[] = []
    
    // 'name|1': []
    // 'name|count': []
    // 'name|min-max': []
    if (options.template.length === 0) return result
    
    // 'arr': [{ 'email': '@EMAIL' }, { 'email': '@EMAIL' }]
    if (!options.rule.parameters) {
      for (let i = 0; i < options.template.length; i++) {
        options.context.path.push(i)
        options.context.templatePath.push(i)
        result.push(handler.gen(options.template[i], i, {
          path: options.context.path,
          templatePath: options.context.templatePath,
          currentContext: result,
          templateCurrentContext: options.template,
          root: options.context.root || result,
          templateRoot: options.context.templateRoot || options.template
        }))
        options.context.path.pop()
        options.context.templatePath.pop()
      }
    } else {
      // 'method|1': ['GET', 'POST', 'HEAD', 'DELETE']
      if (options.rule.min === 1 && options.rule.max === undefined) {
        // fix Mock.js#17
        options.context.path.push(options.name)
        options.context.templatePath.push(options.name)
        result = random.pick(handler.gen(options.template, undefined, {
          path: options.context.path,
          templatePath: options.context.templatePath,
          currentContext: result,
          templateCurrentContext: options.template,
          root: options.context.root || result,
          templateRoot: options.context.templateRoot || options.template
        }))
        options.context.path.pop()
        options.context.templatePath.pop()
      } else {
        // 'data|+1': [{}, {}]
        if (options.rule.parameters[2]) {
          options.template.__order_index = options.template.__order_index || 0
          
          options.context.path.push(options.name)
          options.context.templatePath.push(options.name)
          result = handler.gen(options.template, undefined, {
            path: options.context.path,
            templatePath: options.context.templatePath,
            currentContext: result,
            templateCurrentContext: options.template,
            root: options.context.root || result,
            templateRoot: options.context.templateRoot || options.template
          })[options.template.__order_index % options.template.length]
          
          options.template.__order_index += +options.rule.parameters[2]
          
          options.context.path.pop()
          options.context.templatePath.pop()
        } else if (options.rule.count) {
          // 'data|1-10': [{}]
          for (let i = 0; i < options.rule.count; i++) {
            // 'data|1-10': [{}, {}]
            for (let ii = 0; ii < options.template.length; ii++) {
              options.context.path.push(result.length)
              options.context.templatePath.push(ii)
              result.push(handler.gen(options.template[ii], result.length, {
                path: options.context.path,
                templatePath: options.context.templatePath,
                currentContext: result,
                templateCurrentContext: options.template,
                root: options.context.root || result,
                templateRoot: options.context.templateRoot || options.template
              }))
              options.context.path.pop()
              options.context.templatePath.pop()
            }
          }
        }
      }
    }
    return result
  },
  
  object: function (options: GenerateOptions) {
    const result = {}
    // 'obj|min-max': {}
    if (options.rule.min != undefined) {
      let keys = utils.keys(options.template)
      keys = random.shuffle(keys)
      keys = keys.slice(0, options.rule.count)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        let parsedKey = key.replace(constant.RE_KEY, '$1')
        const transferTypeCtor = handler.getTransferTypeCtor(key)
        if (transferTypeCtor) {
          parsedKey = parsedKey.replace(constant.RE_TRANSFER_TYPE, '')
        }
        options.context.path.push(parsedKey)
        options.context.templatePath.push(key)
        const generatedValue = handler.gen(options.template[key], key, {
          path: options.context.path,
          templatePath: options.context.templatePath,
          currentContext: result,
          templateCurrentContext: options.template,
          root: options.context.root || result,
          templateRoot: options.context.templateRoot || options.template
        })
        result[parsedKey] = transferTypeCtor(generatedValue)
        options.context.path.pop()
        options.context.templatePath.pop()
      }
    } else {
      // 'obj': {}
      let keys: string[] = []
      const fnKeys: string[] = [] // Mock.js#25 改变了非函数属性的顺序，查找起来不方便
      for (const key in options.template) {
        const target = typeof options.template[key] === 'function' ? fnKeys : keys
        target.push(key)
      }
      keys = keys.concat(fnKeys)
      
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        let parsedKey = key.replace(constant.RE_KEY, '$1')
        const transferTypeCtor = handler.getTransferTypeCtor(key)
        if (transferTypeCtor) {
          parsedKey = parsedKey.replace(constant.RE_TRANSFER_TYPE, '')
        }
        options.context.path.push(parsedKey)
        options.context.templatePath.push(key)
        const generatedValue = handler.gen(options.template[key], key, {
          path: options.context.path,
          templatePath: options.context.templatePath,
          currentContext: result,
          templateCurrentContext: options.template,
          root: options.context.root || result,
          templateRoot: options.context.templateRoot || options.template
        })
        result[parsedKey] = transferTypeCtor(generatedValue)
        options.context.path.pop()
        options.context.templatePath.pop()
        // 'id|+1': 1
        const inc = key.match(constant.RE_KEY)
        if (inc && inc[2] && utils.type(options.template[key]) === 'number') {
          options.template[key] += parseInt(inc[2], 10)
        }
      }
    }
    return result
  },
  
  number: function (options: GenerateOptions) {
    let result
    let parts
    if (options.rule.decimal) {
      // float
      options.template += ''
      parts = options.template.split('.')
      // 'float1|.1-10': 10,
      // 'float2|1-100.1-10': 1,
      // 'float3|999.1-10': 1,
      // 'float4|.3-10': 123.123,
      parts[0] = options.rule.range ? options.rule.count : parts[0]
      parts[1] = (parts[1] || '').slice(0, options.rule.dcount)
      while (parts[1].length < options.rule.dcount!) {
        // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
        parts[1] += parts[1].length < options.rule.dcount! - 1 
          ? random.character('number')
          : random.character('123456789')
      }
      result = parseFloat(parts.join('.'))
    } else {
      // integer
      // 'grade1|1-100': 1,
      result = options.rule.range && !options.rule.parameters![2] ? options.rule.count : options.template
    }
    return result
  },
  
  boolean: function (options: GenerateOptions) {
    // 'prop|multiple': false, 当前值是相反值的概率倍数
    // 'prop|probability-probability': false, 当前值与相反值的概率
    const result = options.rule.parameters 
      ? random.bool(Number(options.rule.min), Number(options.rule.max), options.template) 
      : options.template
    return result
  },
  
  string: function (options) {
    let source = ''
    let result = ''
    let match
    let lastIndex = 0

    if (options.template.length) {
      // 'foo': '★',
      if (options.rule.count === undefined) {
        source += options.template
      } else {
        // 'star|1-5': '★',
        for (let i = 0; i < options.rule.count; i++) {
          source += options.template
        }
      }
      // 'email|1-10': '@EMAIL, ',
      constant.RE_PLACEHOLDER.exec('')
      while (match = constant.RE_PLACEHOLDER.exec(source)) {
        const index = match.index
        const input = match[0]
        if (index >= lastIndex) {
          // 遇到转义斜杠，不需要解析占位符
          if (/^\\/.test(input)) {
            result += source.slice(lastIndex, index) + input.slice(1)
            lastIndex = index + input.length
            continue
          }
          // console.log(input, options.context.currentContext, options.context.templateCurrentContext, options)
          const replaced = handler.placeholder(input, options.context.currentContext, options.context.templateCurrentContext, options)
          // 只有一个占位符，并且没有其他字符，例如：'name': '@EMAIL'
          if (index === 0 && input.length === source.length) {
            result = replaced
          } else {
            result += source.slice(lastIndex, index) + replaced
          }
          
          lastIndex = index + input.length
        }
      }

      if (lastIndex < source.length) {
        result += source.slice(lastIndex)
      }
    } else {
      // 'ASCII|1-10': '',
      // 'ASCII': '',
      result = options.rule.range ? random.string(options.rule.count) : options.template
    }
    return result
  },
  
  function: function (options: GenerateOptions) {
    // ( context, options )
    return options.template.call(options.context.currentContext, options)
  },
  
  regexp: function (options: GenerateOptions) {
    let source = ''
    
    // 'name': /regexp/,
    if (options.rule.count === undefined) {
      source += options.template.source // regexp.source
    } else {
      // 'name|1-5': /regexp/,
      for (let i = 0; i < options.rule.count; i++) {
        source += options.template.source
      }
    }
    
    return RE.Handler.gen(RE.Parser.parse(source))
  },
  
  _all: function (): any {
    const re = {}
    for (const key in random) {
      re[key.toLowerCase()] = key
    }
    return re
  },
  
  // 处理占位符，转换为最终值
  placeholder: function (placeholder: string, obj, templateContext, options) {
    // 1 key, 2 params
    // regexp init
    constant.RE_PLACEHOLDER.exec('')
    const parts = constant.RE_PLACEHOLDER.exec(placeholder)!
    const key = parts && parts[1]
    const lkey = key && key.toLowerCase()
    const okey = handler._all()[lkey!]
    const paramsInput: string = (parts && parts[2]) || ''
    const pathParts = handler.splitPathToArray(key)
    let params: string[] = []
    
    // 解析占位符的参数
    try {
      // 1. 尝试保持参数的类型
      // #24 [Window Firefox 30.0 引用 占位符 抛错](https://github.com/nuysoft/Mock/issues/24)
      // [BX9056: 各浏览器下 window.eval 方法的执行上下文存在差异](http://www.w3help.org/zh-cn/causes/BX9056)
      // 应该属于 Window Firefox 30.0 的 BUG
      params = eval('(function(){ return [].splice.call(arguments, 0 ) })(' + paramsInput + ')')
    } catch (error) {
      // 2. 如果失败，先使用 `[]` 包裹，用 JSON.parse 尝试解析
      try {
        const paramsString = paramsInput.replace(/'/g, '"')
        params = JSON.parse(`[${paramsString}]`)
      } catch (e) {
        // 3. 逗号 split 方案兜底
        params = paramsInput.split(/,\s*/)
      }
    }
    
    // 占位符优先引用数据模板中的属性
    // { first: '@EMAIL', full: '@first' } =>  { first: 'dsa@163.com', full: 'dsa@163.com' }
    if (obj && key! in obj) {
      return obj[key!]
    }
    
    // 绝对路径 or 相对路径
    if (key!.charAt(0) === '/' || pathParts.length > 1) {
      return handler.getValueByKeyPath(key, options)
    }
    
    // 递归引用数据模板中的属性
    // fix Mock.js#15 避免自己依赖自己)
    if (templateContext && typeof templateContext === 'object' && key! in templateContext && placeholder !== templateContext[key!]) {
      // 先计算被引用的属性值
      templateContext[key!] = handler.gen(templateContext[key!], key, {
        currentContext: obj, templateCurrentContext: templateContext
      })
      return templateContext[key!]
    }
    
    // 如果未找到，则原样返回
    if (!(key! in random) && !(lkey! in random) && !(okey in random)) {
      return placeholder
    }
    
    // 递归解析参数中的占位符
    for (let i = 0; i < params.length; i++) {
      constant.RE_PLACEHOLDER.exec('')
      if (constant.RE_PLACEHOLDER.test(params[i])) {
        params[i] = handler.placeholder(params[i], obj, templateContext, options)
      }
    }
    
    const handle = random[key!] || random[lkey!] || random[okey]
    if (utils.isFunction(handle)) {
      // 执行占位符方法（大多数情况）
      handle.options = options
      let ret = handle.apply(random, params)
      // 因为是在字符串中，所以默认为空字符串。
      if (ret === undefined) {
        ret = ''
      }
      delete handle.options
      return ret
    }
    return ''
  },
  
  getValueByKeyPath: function (key: string, options) {
    const originalKey = key
    const keyPathParts: string[] = handler.splitPathToArray(key)
    let absolutePathParts: any[] = []
    
    // 绝对路径
    if (key.charAt(0) === '/') {
      absolutePathParts = [options.context.path[0]].concat(handler.normalizePath(keyPathParts))
    } else {
      // 相对路径
      if (keyPathParts.length > 1) {
        absolutePathParts = options.context.path.slice(0)
        absolutePathParts.pop()
        absolutePathParts = handler.normalizePath(absolutePathParts.concat(keyPathParts))
      }
    }
    
    try {
      key = keyPathParts[keyPathParts.length - 1]
      let currentContext = options.context.root
      let templateCurrentContext = options.context.templateRoot
      for (let i = 1; i < absolutePathParts.length - 1; i++) {
        currentContext = currentContext[absolutePathParts[i]]
        templateCurrentContext = templateCurrentContext[absolutePathParts[i]]
      }
      // 引用的值已经计算好
      if (currentContext && key in currentContext) {
        return currentContext[key]
      }

      // 尚未计算，递归引用数据模板中的属性
      // fix #15 避免自己依赖自己
      if (templateCurrentContext && 
        typeof templateCurrentContext === 'object' && 
        key in templateCurrentContext && 
        originalKey !== templateCurrentContext[key]
      ) {
        // 先计算被引用的属性值
        templateCurrentContext[key] = handler.gen(templateCurrentContext[key], key, {
          currentContext: currentContext,
          templateCurrentContext: templateCurrentContext
        })
        return templateCurrentContext[key]
      }
    } catch (e) {}
    
    return '@' + keyPathParts.join('/')
  },
  
  // https://github.com/kissyteam/kissy/blob/master/src/path/src/path.js
  normalizePath: function (pathParts: string[]): string[] {
    const newPathParts: string[] = []
    for (let i = 0; i < pathParts.length; i++) {
      switch (pathParts[i]) {
        case '..':
          newPathParts.pop()
          break
        case '.':
          break
        default:
          newPathParts.push(pathParts[i])
      }
    }
    return newPathParts
  },
  
  splitPathToArray: function (path: string): string[] {
    return path.split(/\/+/).filter(_ => _)
  },

  getTransferTypeCtor (key: string) { 
    const matched = key.match(constant.RE_TRANSFER_TYPE)
    const type = matched && matched[1]
    if (type && transfer.hasOwnProperty(type) && type !== 'extend') {
      return transfer[type]
    }
    return (value) => value
  }
}

export default handler

interface GenerateContext {
  path: Array<string | number>;
  templatePath: Array<string | number>;
  currentContext: any;
  templateCurrentContext: any;
  root: any;
  templateRoot: any;
}

interface GenerateOptions {
  type: string;
  template: any;
  name: string;
  rule: ReturnType<typeof parse>;
  context: GenerateContext;
  parsedName: string;
}
