"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const Base_1 = require("./Base");
class Compiler extends Base_1.BaseCompiler {
    constructor(compiler) {
        super(compiler);
    }
    watch = (watchOption) => {
        const options = Object.assign({
            aggregateTimeout: 10,
            poll: 10,
        }, watchOption || {});
        this.compiler.watch(options, (err, stats) => {
            this.compilerHandler(err, stats);
        });
    };
    emitStop = () => {
        this.state.stats = null;
        this.state.err = null;
        this.state.progressTime = -1;
        this.state.status = 'stoped';
    };
    stop = (callback) => {
        this.compiler.watching.close(() => {
            if (callback) {
                callback(this.state);
            }
            this.emitStop();
        });
    };
}
exports.Compiler = Compiler;
