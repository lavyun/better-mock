export default {
  GUID: 1,
  RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
  RE_TRANSFER_TYPE: /#(.*)$/,
  RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
  RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g
}
