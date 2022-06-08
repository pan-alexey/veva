"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIp = void 0;
const os_1 = require("os");
const getIp = () => {
    var interfaces = (0, os_1.networkInterfaces)();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        if (!iface) {
            return null;
        }
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }
    return null;
};
exports.getIp = getIp;
