"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processErrors = exports.simpleHash = void 0;
const simpleHash = function (s) {
    let h = 0;
    let i = 0;
    if (s.length > 0)
        while (i < s.length)
            h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
    return h;
};
exports.simpleHash = simpleHash;
const getTitle = (error) => {
    const moduleName = error.moduleName || error.file;
    if (moduleName) {
        const loc = error.loc ? `(${error.loc})` : '';
        return `${moduleName}${loc}`;
    }
    return error.message.split('\n')[0];
};
const convertToMessage = (error) => {
    const title = getTitle(error);
    const message = error.message;
    const hash = JSON.stringify([title, message]);
    return {
        hash,
        title,
        message,
    };
};
const processErrors = (options) => {
    const client = options.client || [];
    const server = options.server || [];
    for (let i = 0; i < client.length; i++) {
        const error = convertToMessage(client[i]);
        console.log(error);
    }
    for (let i = 0; i < server.length; i++) {
        const error = convertToMessage(client[i]);
        console.log(error);
    }
};
exports.processErrors = processErrors;
