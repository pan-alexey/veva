import webpack from 'webpack';
import { BaseCompiler } from './Base';
export declare class Compiler extends BaseCompiler {
    constructor(compiler: webpack.Compiler);
    run: () => void;
}
