"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombineEvents = void 0;
class CombineEvents {
    status = 'created';
    compilers = {};
    callbacks = {
        start: [],
        progress: [],
        done: [],
    };
    constructor(compilers) {
        this.compilers = compilers;
        this.register();
    }
    getStatus = () => {
        return this.status;
    };
    getState = () => {
        const state = {};
        Object.keys(this.compilers).forEach((name) => {
            state[name] = this.compilers[name].getState();
        });
        return state;
    };
    on = (event, callback) => {
        this.callbacks[event].push(callback);
        return this;
    };
    register = () => {
        Object.keys(this.compilers).forEach(name => {
            const compiler = this.compilers[name];
            compiler
                .on('start', this.processEvent)
                .on('progress', this.processEvent)
                .on('done', this.processEvent);
        });
    };
    processEvent = () => {
        const state = this.getState();
        let statuses = Object.keys(state).map((name) => {
            return state[name].status;
        });
        statuses = statuses.filter(status => status !== 'created' && status !== 'stoped');
        if (statuses.length === 0) {
            this.status = 'done';
            this.emit('done');
            return;
        }
        const withoutDone = statuses.filter(status => status !== 'done');
        if (withoutDone.length === 0) {
            this.status = 'done';
            this.emit('done');
            return;
        }
        if (this.status !== 'progress') {
            this.emit('start');
            return;
        }
        this.status = 'progress';
        this.emit('progress');
    };
    emit = (event) => {
        this.callbacks[event].forEach((callback) => {
            callback(this.getState());
        });
    };
}
exports.CombineEvents = CombineEvents;
