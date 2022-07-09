"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashCode = exports.uniqString = void 0;
const uniqString = (arr) => {
    const keys = {};
    arr.forEach((key) => {
        keys[key] = true;
    });
    return Object.keys(keys);
};
exports.uniqString = uniqString;
const hashCode = (str) => {
    return str.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);
};
exports.hashCode = hashCode;
