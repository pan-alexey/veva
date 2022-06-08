"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const http = __importStar(require("http"));
const express_1 = __importDefault(require("express"));
const createHttpServer = (listener, port) => {
    const server = http.createServer(listener);
    return new Promise((resolve) => {
        server.listen(port, () => resolve(server));
    });
};
const createServer = async (port) => {
    const app = (0, express_1.default)();
    let isReady = false;
    app.use((req, res, next) => {
        if (isReady) {
            return next();
        }
        const timer = setInterval(() => {
            if (isReady) {
                clearInterval(timer);
                next();
            }
        }, 100);
        req.on("close", () => {
            clearInterval(timer);
        });
    });
    const server = await createHttpServer(app, port);
    return {
        app,
        server,
        isReady: () => isReady,
        static: (root) => {
            app.use(express_1.default.static(root));
        },
        setReady: (status = true) => {
            isReady = status;
        },
    };
};
exports.createServer = createServer;
