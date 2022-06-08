"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const Base_1 = require("./Base");
class Compiler extends Base_1.BaseCompiler {
    constructor(compiler) {
        super(compiler);
    }
    run = () => {
        this.compiler.run((err, stats) => {
            this.compilerHandler(err, stats);
        });
    };
}
exports.Compiler = Compiler;
