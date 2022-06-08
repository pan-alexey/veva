"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCompiler = void 0;
const webpack_1 = __importDefault(require("webpack"));
class BaseCompiler {
    compiler;
    callbacks = {
        start: [],
        progress: [],
        done: [],
    };
    state = {
        progress: -1,
        status: 'created',
        stats: null,
        err: null,
        progressTime: -1,
    };
    constructor(compiler) {
        this.compiler = compiler;
        this.progressHooks();
    }
    compilerHandler = (err, stats) => {
        this.state.stats = stats || null;
        this.state.err = err || null;
        this.emitDone();
    };
    progressHooks = () => {
        let startTime = new Date().getTime();
        let step = 0;
        const compiler = this.compiler;
        return new webpack_1.default.ProgressPlugin((progress) => {
            this.state.progress = Math.round(progress * 100);
            if (step === 0) {
                this.state.stats = null;
                this.state.err = null;
                this.state.progressTime = -1;
                this.state.status = 'start';
                startTime = new Date().getTime();
                this.emitStart();
            }
            if (progress >= 0 && progress < 0.1) {
                if (step > 1) {
                    return;
                }
                step = 1;
                this.state.status = 'compiling';
                this.emitProgress();
            }
            if (progress >= 0.1 && progress <= 0.7) {
                if (step > 2) {
                    return;
                }
                step = 2;
                this.state.status = 'building';
            }
            if (progress >= 0.95 && progress < 1) {
                step = 4;
                this.state.status = 'emit';
                this.emitProgress();
            }
            if (progress === 1) {
                this.state.status = 'done';
                const finishTime = new Date().getTime();
                this.state.progressTime = (finishTime - startTime) / 1000;
                this.emitDone();
                step = 0;
            }
        }).apply(compiler);
    };
    emitStart = () => {
        this.callbacks.start.forEach((fn) => fn(this.state));
    };
    emitProgress = () => {
        this.callbacks.progress.forEach((fn) => fn(this.state));
    };
    emitDone = () => {
        if ((this.state.stats || this.state.err) && this.state.status === 'done') {
            this.callbacks.done.forEach((fn) => fn(this.state));
        }
    };
    inProgress = () => {
        switch (this.state.status) {
            case 'start':
            case 'compiling':
            case 'building':
            case 'emit':
                return true;
            default:
                return false;
        }
    };
    getState = () => {
        return this.state;
    };
    on = (event, callback) => {
        this.callbacks[event].push(callback);
        return this;
    };
}
exports.BaseCompiler = BaseCompiler;
