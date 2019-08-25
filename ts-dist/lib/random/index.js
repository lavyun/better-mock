var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Mock.Random
import * as basic from './basic';
import * as date from './date';
import * as image from './image';
import * as color from './color';
import * as text from './text';
import * as name from './name';
import * as web from './web';
import * as address from './address';
import * as helper from './helper';
import * as misc from './misc';
export default __assign({}, basic, date, image, color, text, name, web, address, helper, misc);
