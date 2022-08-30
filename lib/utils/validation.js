"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidArray = exports.isArray = void 0;
var isArray = function (array) {
    return Object.prototype.toString.call(array) === "[object Array]";
};
exports.isArray = isArray;
var isValidArray = function (array) {
    return (0, exports.isArray)(array) && !!array.length;
};
exports.isValidArray = isValidArray;
