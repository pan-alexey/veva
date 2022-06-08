"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = exports.newLine = exports.breakLine = void 0;
const os_1 = __importDefault(require("os"));
const breakLine = () => {
    (0, exports.newLine)();
    (0, exports.newLine)();
};
exports.breakLine = breakLine;
const newLine = () => {
    process.stdout.write(os_1.default.EOL);
};
exports.newLine = newLine;
const clear = () => {
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
};
exports.clear = clear;
