"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqString = void 0;
const uniqString = (arr) => {
    const keys = {};
    arr.forEach(key => {
        keys[key] = true;
    });
    return Object.keys(keys);
};
exports.uniqString = uniqString;
