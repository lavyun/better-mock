// Type definitions for better-mock
// Project: http://github.com/lavyun/better-mock
// Definitions by: lavyun <https://github.com/lavyun>

declare namespace Mock {
  // Interface for global namespace 'betterMock'
  interface BetterMock {
    mock: Mock;
    setup: Setup;
    Random: Random;
    valid: Valid;
    toJSONSchema: ToJSONSchema;
    version: number;
  }

  interface MockCbOptions {
    url: string;
    type: string;
    body: string | null;
  }

  // Mock.mock()
  interface Mock {
    (rurl: string | RegExp, rtype: string, template: ((options: MockCbOptions) => any) | any): BetterMock;

    (rurl: string | RegExp, template: ((options: MockCbOptions) => any) | any): BetterMock;

    (template: any): any;
  }

  interface SetupSettings {
    timeout?: number | string;
  }

  // Mock.setup()
  type Setup = (settings: SetupSettings) => void;

  type StringPool = 'lower' | 'upper' | 'number' | 'symbol';

  /**
   * Mock.Random - Basic
   */
  interface RandomBasic {
    /**
     * 返回一个随机的布尔值
     * @param min 指示参数 current 出现的概率
     * @param max 指示参数 current 的相反值 !current 出现的概率
     * @param current 可选值为布尔值 true 或 false
     */
    boolean(min?: number, max?: number, current?: boolean): boolean;

    /**
     * 返回一个随机的自然数
     * @param min 指示随机自然数的最小值。默认值为 0
     * @param max 指示随机自然数的最大值。默认值为 9007199254740992
     */
    natural(min?: number, max?: number): number;

    /**
     * 返回一个随机的整数
     * @param min 指示随机整数的最小值。默认值为 -9007199254740992
     * @param max 指示随机整数的最大值。默认值为 9007199254740992
     */
    integer(min?: number, max?: number): number;

    /**
     * 返回一个随机的浮点数
     * @param min 整数部分的最小值。默认值为 -9007199254740992
     * @param max 整数部分的最大值。默认值为 9007199254740992
     * @param dmin 小数部分位数的最小值。默认值为 0
     * @param dmax 小数部分位数的最大值。默认值为 17
     */
    float(min?: number, max?: number, dmin?: number, dmax?: number): number;

    /**
     * 返回一个随机字符
     * @param pool - 字符池，如果传入了 'lower'、'upper'、'number'、'symbol'，将从内置的字符池从选取
     */
    character(pool?: StringPool | string): string;

    /**
     * 返回一个随机字符串
     * @param pool 字符池，如果传入了 'lower'、'upper'、'number'、'symbol'，将从内置的字符池从选取
     * @param min 随机字符串的最小长度。默认值为 3
     * @param max 随机字符串的最大长度。默认值为 7
     */
    string(pool: StringPool | string, min: number, max: number): string;

    /**
     * 返回一个随机字符串
     * @param min 随机字符串的最小长度。默认值为 3
     * @param max 随机字符串的最大长度。默认值为 7
     */
    string(min: number, max: number): string;

    /**
     * 返回一个随机字符串
     * @param pool 字符池，如果传入了 'lower'、'upper'、'number'、'symbol'，将从内置的字符池从选取
     * @param length 字符串长度
     */
    string(pool: StringPool | string, length: number): string;

    /**
     * 返回一个随机字符串
     * @param pool 字符池，如果传入了 'lower'、'upper'、'number'、'symbol'，将从内置的字符池从选取
     */
    string(pool: StringPool | string): string;

    /**
     * 返回一个随机字符串
     * @param length 字符串长度
     */
    string(length: number): string;

    /**
     * 返回一个随机字符串
     */
    string(): string;

    /**
     * 返回一个整型数组
     * @param start 数组中整数的起始值
     * @param stop 数组中整数的结束值（不包含在返回值中）
     * @param step 数组中整数之间的步长。默认值为 1
     */
    range(start: number, stop: number, step: number): number;

    /**
     * 返回一个整型数组
     * @param start 数组中整数的起始值
     * @param stop 数组中整数的结束值（不包含在返回值中）
     */
    range(start: number, stop: number): number;

    /**
     * 返回一个整型数组
     * @param stop 数组中整数的结束值（不包含在返回值中）
     */
    range(stop: number): number;
  }

  // Mock.Random - Date
  type RandomDateUtilString = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'week';
  interface RandomDate {
    /**
     * 返回一个随机的日期字符串
     * @param format 生成的日期字符串的格式，默认值为 yyyy-MM-dd
     */
    date(format?: string): string;

    /**
     * 返回一个随机的时间字符串
     * @param format 生成的时间字符串的格式，默认值为 HH:mm:ss
     */
    time(format?: string): string;

    /**
     * 返回一个随机的日期和时间字符串
     * @param format 生成的日期和时间字符串的格式，默认值为 yyyy-MM-dd HH:mm:ss
     */
    datetime(format?: string): string;

    /**
     * 返回当前的日期和时间字符串
     * @param util 时间单位，可选值有：year、month、week、day、hour、minute、second、week
     * @param format 生成的日期和时间字符串的格式，默认值为 yyyy-MM-dd HH:mm:ss
     */
    now(util?: RandomDateUtilString | string, format?: string): string;

    /**
     * 随机生成一个时间戳
     */
    timestamp(): number;
  }

  // Mock.Random - Image
  interface RandomImage {
    /**
     * 随机生成一个随机的图片地址
     * @param size 图片的宽高，格式为 '宽x高'
     * @param background 图片的背景色。默认值为 '#000000'
     * @param foreground 图片的前景色（文字）。默认值为 '#FFFFFF'
     * @param format 片的格式。默认值为 'png'，可选值包括：'png'、'gif'、'jpg'
     * @param text 指示图片上的文字。默认值为参数 size
     */
    image(size: string, background: string, foreground: string, format: 'png' | 'gif' | 'jpg', text: string): string;
    
    /**
     * 随机生成一个随机的图片地址
     * @param size 图片的宽高，格式为 '宽x高'
     * @param background 图片的背景色。默认值为 '#000000'
     * @param foreground 图片的前景色（文字）。默认值为 '#FFFFFF'
     * @param text 指示图片上的文字。默认值为参数 size
     */
    image(size: string, background: string, foreground: string, text: string): string;
    
    /**
     * 随机生成一个随机的图片地址
     * @param size 图片的宽高，格式为 '宽x高'
     * @param background 图片的背景色。默认值为 '#000000'
     * @param text 指示图片上的文字。默认值为参数 size
     */
    image(size: string, background: string, text: string): string;
    
    /**
     * 随机生成一个随机的图片地址
     * @param size 图片的宽高，格式为 '宽x高'
     * @param text 指示图片上的文字。默认值为参数 size
     */
    image(size: string, text: string): string;
    
    /**
     * 随机生成一个随机的图片地址
     */
    image(): string;

    /**
     * 随机生成一段随机的 Base64 图片编码
     * @param size 图片的宽高
     * @param text 图片上的文字
     */
    dataImage(size?: string, text?: string): string;
  }

  // Mock.Random - Color
  interface RandomColor {
    /**
     * 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'
     */
    color(): string;

    /**
     * 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'
     */
    hex(): string;

    /**
     * 随机生成一个有吸引力的颜色，格式为 'rgb(r, g, b)'
     */
    rgb(): string;

    /**
     * 随机生成一个有吸引力的颜色，格式为 'rgba(r, g, b, a)'
     */
    rgba(): string;

    /**
     * 随机生成一个有吸引力的颜色，格式为 'hsl(h, s, l)'
     */
    hsl(): string;
  }

  // Mock.Random - Text
  interface RandomText {
    /**
     * 随机生成一段文本
     * @param min 指示文本中句子的最小个数。默认值为 3
     * @param max 指示文本中句子的最大个数。默认值为 7
     */
    paragraph(min?: number, max?: number): string;

    /**
     * 随机生成一段中文文本
     * @param min 指示文本中句子的最小个数。默认值为 3
     * @param max 指示文本中句子的最大个数。默认值为 7
     */
    cparagraph(min?: number, max?: number): string;

    /**
     * 随机生成一个句子，第一个单词的首字母大写
     * @param min 指示句子中单词的最小个数。默认值为 12
     * @param max 指示句子中单词的最大个数。默认值为 18
     */
    sentence(min?: number, max?: number): string;

    /**
     * 随机生成一段中文句子
     * @param min 句子中汉字的最小个数。默认值为 12
     * @param max 句子中汉字的最大个数。默认值为 18
     */
    csentence(min?: number, max?: number): string;

    /**
     * 随机生成一个单词
     * @param min 单词中字符的最小个数。默认值为 3
     * @param max 单词中字符的最大个数。默认值为 10
     */
    word(min?: number, max?: number): string;

    /**
     * 随机生成一个汉字
     * @param pool 汉字字符串。表示汉字字符池
     * @param min 随机汉字字符串的最小长度。默认值为 1
     * @param max 随机汉字字符串的最大长度。默认值为 1
     */
    cword(pool?: string | number, min?: number, max?: number): string;

    /**
     * 随机生成一句标题，其中每个单词的首字母大写
     * @param min 单词中字符的最小个数。默认值为 3
     * @param max 单词中字符的最大个数。默认值为 7
     */
    title(min?: number, max?: number): string;

    /**
     * 随机生成一句中文标题
     * @param min 单词中字符的最小个数。默认值为 3
     * @param max 单词中字符的最大个数。默认值为 7
     */
    ctitle(min?: number, max?: number): string;
  }

  // Mock.Random - Name
  interface RandomName {
    /**
     * 随机生成一个常见的英文名
     */
    first(): string;

    /**
     * 随机生成一个常见的英文姓
     */
    last(): string;

    /**
     * 随机生成一个常见的英文姓名
     * @param middle 是否生成中间名
     */
    name(middle?: boolean): string;

    /**
     * 随机生成一个常见的中文名
     */
    cfirst(): string;

    /**
     * 随机生成一个常见的中文姓
     */
    clast(): string;

    /**
     * 随机生成一个常见的中文姓名
     */
    cname(): string;
  }

  // Mock.Random - Web
  type RandomWebProtocol = 'http' | 'ftp' | 'gopher' | 'mailto' | 'mid' | 'cid' | 'news' | 'nntp' | 'prospero' | 'telnet' | 'rlogin' | 'tn3270' | 'wais';
  interface RandomWeb {
    /**
     * 随机生成一个 URL
     * @param protocol URL 协议。例如 http
     * @param host URL 域名和端口号。例如 baidu.com
     */
    url(protocol?: string, host?: string): string;

    /**
     * 随机生成一个 URL 协议
     */
    protocol(): RandomWebProtocol;

    /**
     * 随机生成一个域名
     */
    domain(): string;

    /**
     * 随机生成一个顶级域名
     */
    dtl(): string;

    /**
     * 随机生成一个邮件地址
     * @param domain 邮件地址的域名。例如 nuysoft.com
     */
    email(domain?: string): string;

    /**
     * 随机生成一个 IP 地址
     */
    ip(): string;
  }

  // Mock.Random - Address
  interface RandomAddress {
    /**
     * 随机生成一个（中国）大区
     */
    region(): string;

    /**
     * 随机生成一个（中国）省（或直辖市、自治区、特别行政区）
     */
    province(): string;

    /**
     * 随机生成一个（中国）市
     * @param prefix 是否生成所属的省
     */
    city(prefix?: boolean): string;

    /**
     * 随机生成一个（中国）县
     * @param prefix 否生成所属的省、市
     */
    country(prefix?: boolean): string;

    /**
     * 随机生成一个邮政编码（六位数字）
     */
    zip(): string;
  }

  // Mock.Random - Helper
  interface RandomHelper {
    /**
     * 把字符串的第一个字母转换为大写
     * @param word 字符串
     */
    capitalize(word: string): string;

    /**
     * 把字符串转换为大写
     * @param str 字符串
     */
    upper(str: string): string;

    /**
     * 把字符串转换为小写
     * @param str 字符串
     */
    lower(str: string): string;

    /**
     * 从数组中随机选取一个元素
     * @param arr 数组
     * @param min 返回的数组的最小长度
     * @param max 返回的数组的最大长度
     */
    pick<T = any>(arr: T[], min?: number, max?: number): T;

    /**
     * 打乱数组中元素的顺序，并返回
     * @param arr 数组
     * @param min 返回的数组的最小长度
     * @param max 返回的数组的最大长度
     */
    shuffle<T = any>(arr: T[], min?: number, max?: number): T[];
  }

  // Mock.Random - Miscellaneous
  interface RandomMiscellaneous {
    /**
     * 随机生成一个 GUID
     */
    guid(): string;

    /**
     * 随机生成一个 18 位身份证
     */
    id(): string;

    /**
     * 生成一个全局的自增整数
     * @param step 整数自增的步长。默认值为 1
     */
    increment(step?: number): number;

    /**
     * 随机生成一个版本号，每一位的最大值不超过10
     * @param step 版本号的层级，默认为 3
     */
    version(depth?: number): string;

    /**
     * 生成一个中国的手机号
     */
    phone(): string;
  }

  type RandomExtendSource = {
    [prop: string]: Function
  }
  // Mock.Random
  interface Random extends RandomBasic, RandomDate,
    RandomImage, RandomColor, RandomAddress,
    RandomHelper, RandomMiscellaneous, RandomName,
    RandomText, RandomWeb {
      extend(source: RandomExtendSource): Random
    }

  interface ValidRsItem {
    action: string;
    actual: string;
    expected: string;
    message: string;
    path: string[];
    type: string;
  }

  // Mock.valid()
  type Valid = (template: any, data: any) => ValidRsItem[];

  interface ToJSONSchemaRs {
    name: string | undefined;
    template: any;
    type: string;
    rule: object;
    path: string[];
    properties?: ToJSONSchemaRs[];
    items?: ToJSONSchemaRs[];
  }

  // Mock.toJSONSchema()
  type ToJSONSchema = (template: any) => ToJSONSchemaRs;

  let mock: Mock;
  let setup: Setup;
  let Random: Random;
  let valid: Valid;
  let toJSONSchema: ToJSONSchema;
  let version: number;
}

export = Mock;
