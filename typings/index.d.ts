// Type definitions for better-mock
// Project: http://github.com/lavyun/better-mock
// Definitions by: lavyun <https://github.com/lavyun>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

declare namespace betterMock {
  type N = number;
  type S = string;
  type B = boolean;

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
    url: S;
    type: S;
    body: S | null;
  }

  // Mock.mock()
  interface Mock {
    (rurl: S | RegExp, rtype: S, template: ((options: MockCbOptions) => any) | any): BetterMock;

    (rurl: S | RegExp, template: ((options: MockCbOptions) => any) | any): BetterMock;

    (template: any): any;
  }

  interface SetupSettings {
    timeout?: number | S;
  }

  // Mock.setup()
  type Setup = (settings: SetupSettings) => void;

  // Mock.Random - Basic
  interface RandomBasic {
    // Random.boolean
    boolean(min: N, max: N, current: B): B;
    boolean(): B;

    // Random.natural
    natural(min?: N, max?: N): N;

    // Random.integer
    integer(min?: N, max?: N): N;

    // Random.float
    float(min?: N, max?: N, dmin?: N, dmax?: N): N;

    // Random.character
    character(pool: 'lower' | 'upper' | 'number' | 'symbol'): S;
    character(pool?: S): S;

    // Random.string
    string(pool: S | N, min?: N, max?: N): S;

    // Random.range
    range(start?: N, stop?: N, step?: N): N;
  }

  // Mock.Random - Date
  type RandomDateUtilString = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'week';
  interface RandomDate {
    // Random.date
    date(format?: S): S;

    // Random.time
    time(format?: S): S;

    // Random.datetime
    datetime(format?: S): S;

    // Random.now
    now(util: RandomDateUtilString, format?: S): S;
    now(format?: S): S;

    // Random.timestamp
    timestamp(): N;
  }

  // Mock.Random - Image
  type RandomImageFormatString = 'png' | 'gif' | 'jpg';
  interface RandomImage {
    // Random.image
    image(size?: S, background?: S, foreground?: S, format?: RandomImageFormatString | S, text?: S): S;

    // Random.dataImage
    dataImage(size?: S, text?: S): S;
  }

  // Mock.Random - Color
  interface RandomColor {
    // Random.color
    color(): S;

    // Random.hex
    hex(): S;

    // Random.rgb
    rgb(): S;

    // Random.rgba
    rgba(): S;

    // Random.hsl
    hsl(): S;
  }

  // Mock.Random - Text
  interface RandomText {
    // Random.paragraph
    paragraph(min?: N, max?: N): S;

    // Random.cparagraph
    cparagraph(min?: N, max?: N): S;

    // Random.sentence
    sentence(min?: N, max?: N): S;

    // Random.csentence
    csentence(min?: N, max?: N): S;

    // Random.word
    word(min?: N, max?: N): S;

    // Random.cword
    cword(pool?: S | N, min?: N, max?: N): S;

    // Random.title
    title(min?: N, max?: N): S;

    // Random.ctitle
    ctitle(min?: N, max?: N): S;
  }

  // Mock.Random - Name
  interface RandomName {
    // Random.first
    first(): S;

    // Random.last
    last(): S;

    // Random.name
    name(middle?: B): S;

    // Random.cfirst
    cfirst(): S;

    // Random.clast
    clast(): S;

    // Random.cname
    cname(): S;
  }

  // Mock.Random - Web
  type RandomWebProtocol = 'http' | 'ftp' | 'gopher' | 'mailto' | 'mid' | 'cid' | 'news' | 'nntp' | 'prospero' | 'telnet' | 'rlogin' | 'tn3270' | 'wais';
  interface RandomWeb {
    // Random.url
    url(protocol?: S, host?: S): S;

    // Random.protocol
    protocol(): RandomWebProtocol;

    // Random.domain
    domain(): S;

    // Random.tld
    dtl(): S;

    // Random.email
    email(domain?: S): S;

    // Random.ip
    ip(): S;
  }

  // Mock.Random - Address
  interface RandomAddress {
    // Random.region
    region(): S;

    // Random.province
    province(): S;

    // Random.city
    city(prefix?: B): S;

    // Random.county
    country(prefix?: B): S;

    // Random.zip
    zip(prefix?: B): S;
  }

  // Mock.Random - Helper
  interface RandomHelper {
    // Random.capitalize
    capitalize(word: S): S;

    // Random.upper
    upper(str: S): S;

    // Random.lower
    lower(str: S): S;

    // Random.pick
    pick(arr: any[]): any;

    // Random.shuffle
    shuffle(arr: any[]): any[];
  }

  // Mock.Random - Miscellaneous
  interface RandomMiscellaneous {
    // Random.guid
    guid(): S;

    // Random.id
    id(): S;

    // Random.increment
    increment(step?: N): N;

    // Random.version
    version(depth?: N): S;

    // Random.phone
    phone(): S;
  }

  // Mock.Random
  interface Random extends RandomBasic, RandomDate,
    RandomImage, RandomColor, RandomAddress,
    RandomHelper, RandomMiscellaneous, RandomName,
    RandomText, RandomWeb { }

  interface ValidRsItem {
    action: S;
    actual: S;
    expected: S;
    message: S;
    path: S[];
    type: S;
  }

  // Mock.valid()
  type Valid = (template: any, data: any) => ValidRsItem[];

  interface ToJSONSchemaRs {
    name: S | undefined;
    template: any;
    type: S;
    rule: object;
    path: S[];
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

export = betterMock;
