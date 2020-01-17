import { Settings } from '../types/index'

class Setting {
  private _setting: Settings = {
    timeout: '10-100'
  }

  setup (setting: Partial<Settings>) {
    Object.assign(this._setting, setting)
  }

  parseTimeout (timeout: Settings['timeout'] = this._setting.timeout): number {
    if (typeof timeout === 'number') {
      return timeout
    }
    if (typeof timeout === 'string' && timeout.indexOf('-') === -1) {
      return parseInt(timeout, 10)
    }
    if (typeof timeout === 'string' && timeout.indexOf('-') !== -1) {
      const tmp = timeout.split('-')
      const min = parseInt(tmp[0], 10)
      const max = parseInt(tmp[1], 10)
      return Math.round(Math.random() * (max - min)) + min
    }
    return 0
  }
}

export default new Setting()