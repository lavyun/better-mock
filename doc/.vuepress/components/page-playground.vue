<template>
  <div class="page-playground-box">
    <div id="container">
      <div class="run-button" @click="runCode">Run >></div>
    </div>
    <div class="console-panel-desc">
      <span @click="messages = []">clear</span>
      <p>
        可以在编辑器中使用 better-mock 和 axios 的所有方法, console.log 后会在下方打印结果, 也可以F12打开控制台查看
      </p>
    </div>
    <div class="console-panel">
      <pre v-for="(message, index) in messages">{{ message.value }}</pre>
    </div>
  </div>
</template>

<script>
import betterMockDTS from 'raw-loader!../../../typings/index.d.ts'
import axiosDTS from 'raw-loader!../public/dts/axios.d.ts'
import axios from 'axios'
import Mock from '../../../dist/mock.browser';

const BM_BACKGROUND_CODE = 'BM_BACKGROUND_CODE'

const DEFAULT_CODE =
`Mock.mock('http://example.com/path/to', {
    'list|1-10': [{
        'id|+1': 1
    }]
})

axios.get('http://example.com/path/to').then(res => {
    console.log(res.data)
})
`

export default {
  name: 'page-background',
  data () {
    return {
      editor: null,
      messages: []
    }
  },
  methods: {
    runCode () {
      const codes = this.editor.getValue()
      localStorage.setItem(BM_BACKGROUND_CODE, codes)
      const fun = new Function(codes)

      fun()
    },
    createMessage (value) {
      const type = this.valueType(value)
      if (type === 'object') {
        try {
          value = JSON.stringify(value, null, 2)
        } catch (_) {}
      } else if (['array', 'number', 'string', 'null', 'boolean'].includes(type)) {
        try {
          value = JSON.stringify(value)
        } catch (_) {}
      } else {
        value = String(value)
      }
      return {
        value,
        type
      }
    },
    valueType (value) {
      return value !== undefined && value !== null
        ? Object.prototype.toString.call(value).match(/\[object (\w+)\]/)[1].toLowerCase() 
        : String(value)
    },
    overrideConsole () {
      const originLog = console.log
      console.log = (...args) => {
        args.forEach(arg => {
          this.messages.push(this.createMessage(arg))
        })
        originLog.call(null, ...args)
      }
    }
  },
  mounted() {
    const monaco = require('monaco-editor/esm/vs/editor/editor.main')

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      betterMockDTS.replace('export = Mock;', '')
    )

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      axiosDTS
    )

    const queryCode = this.$route.query.code
    const cacheCode = localStorage.getItem(BM_BACKGROUND_CODE)
    const editor = monaco.editor.create(document.getElementById('container'), {
      language: 'typescript',
      theme: 'vs-dark',
      value: queryCode || cacheCode || DEFAULT_CODE,
      minimap: {
        enabled: false
      }
    })

    this.editor = editor
    
    this.overrideConsole()

    window.axios = axios
    window.Mock = Mock
  }
}
</script>

<style lang="stylus">
.page-playground
  .page-playground-box
    #container
      width 100%;
      height 360px;
      position relative;
      .monaco-editor
        padding-top 0.5em;

      .run-button
        padding 2px 8px;
        border-radius 4px;
        background-color rgb(76, 188, 137);
        position absolute;
        font-size 14px;
        z-index 100;
        right 20px;
        bottom 0;
        cursor pointer;
        color #FFFFFF;
        width fit-content;

    .console-panel-desc
      display flex;
      margin-top 20px;
      align-items flex-end;
      span
        height 21px;
        border-bottom: 0;
        padding: 0 8px;
        background #E4E5E6;
        cursor pointer;
      p
        margin 0;
        flex 1;
        color orangered;
        margin-left 10px;
        font-size 14px;

    .console-panel
      min-height 200px;
      max-height 600px;
      overflow-y auto;
      position relative;
      border 1px solid #E4E5E6;
      pre
        background-color #FFF !important;
        padding 0 10px;
        margin 0;
        border-bottom 1px solid #E4E5E6;
        border-radius 0;
        font-size 12px;


  .page-edit
    display none;

  .theme-default-content
    padding: 20px 0;
    

  .theme-default-content:not(.custom)
    max-width 1200px;

  .page
    padding-bottom 0;
  
</style>