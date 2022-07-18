"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processErrors = void 0;
const processErrors = (options) => {
    const server = options.server || [];
    const client = options.client || [];
    const itemMap = {};
    server.forEach((dataError) => {
        itemMap[dataError._hash_] = Object.assign(itemMap[dataError._hash_] || {}, {
            name: dataError._name_,
            message: dataError.message,
            isServer: true,
        });
    });
    client.forEach((dataError) => {
        itemMap[dataError._hash_] = Object.assign(itemMap[dataError._hash_] || {}, {
            name: dataError._name_,
            message: dataError.message,
            isClinet: true,
        });
    });
    const multiItems = [];
    const serverItems = [];
    const clientItems = [];
    Object.keys(itemMap).forEach((key) => {
        const item = itemMap[key];
        if (item.isClinet && item.isServer) {
            multiItems.push(Object.assign(Object.assign({}, item), { key, isServer: true, isClinet: true }));
        }
        else if (item.isServer) {
            serverItems.push(Object.assign(Object.assign({}, item), { key, isServer: true, isClinet: false }));
        }
        else if (item.isClinet) {
            clientItems.push(Object.assign(Object.assign({}, item), { key, isServer: false, isClinet: true }));
        }
    });
    return [...multiItems, ...serverItems, ...clientItems];
};
exports.processErrors = processErrors;
