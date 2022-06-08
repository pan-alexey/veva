"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJson = exports.isPackage = void 0;
const isPackage = (name) => {
    if (!name)
        return false;
    try {
        const resolvePackage = require.resolve(name);
        return !!resolvePackage;
    }
    catch (error) {
        return false;
    }
};
exports.isPackage = isPackage;
const getPackageJson = (name) => {
    if (!name)
        return {};
    try {
        const resolvePackage = require(`${name}/package.json`);
        return resolvePackage || {};
    }
    catch (error) {
        return {};
    }
};
exports.getPackageJson = getPackageJson;
