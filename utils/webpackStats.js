"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processErrors = void 0;
const helpers_1 = require("./helpers");
const getTitle = (error) => {
    const moduleName = error.moduleName || error.file;
    if (moduleName) {
        const loc = error.loc ? `(${error.loc})` : '';
        return `${moduleName}${loc}`;
    }
    return error.message.split('\n')[0];
};
const convertStatsError = (statErrors) => {
    const result = {};
    for (let i = 0; i < statErrors.length; i++) {
        const error = statErrors[i];
        const title = getTitle(error);
        result[title] = {
            message: error.message,
        };
    }
    return result;
};
const processErrors = (options) => {
    const client = options.client || [];
    const server = options.server || [];
    const clientItems = convertStatsError(options.client || []);
    const serverItems = convertStatsError(options.server || []);
    const allKeys = (0, helpers_1.uniqString)([...Object.keys(clientItems), ...Object.keys(serverItems)]);
    const commonKeys = [];
    const clientOnlyKeys = [];
    const serverOnlyKeys = [];
    for (let i = 0; i < allKeys.length; i++) {
        const key = allKeys[i];
        if (clientItems[key] || serverItems[key]) {
            commonKeys.push(key);
        }
        else if (clientItems[key]) {
            clientOnlyKeys.push(key);
        }
        else if (serverItems[key]) {
            serverOnlyKeys.push(key);
        }
    }
    const items = [];
    [...commonKeys, ...clientOnlyKeys, ...serverOnlyKeys].forEach((key) => {
        var _a, _b;
        items.push({
            title: key,
            message: {
                client: (_a = clientItems[key]) === null || _a === void 0 ? void 0 : _a.message,
                server: (_b = serverItems[key]) === null || _b === void 0 ? void 0 : _b.message,
            }
        });
    });
    const types = [];
    if (client.length > 0) {
        types.push('client');
    }
    if (server.length > 0) {
        types.push('server');
    }
    const result = {
        types,
        items,
    };
    return result;
};
exports.processErrors = processErrors;
