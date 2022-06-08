import webpack from 'webpack';
import { BaseCompiler, CompilerCallback } from './Base';
export interface WatchOptions {
    aggregateTimeout?: number;
    followSymlinks?: boolean;
    ignored?: string | RegExp | string[];
    poll?: number | boolean;
}
export declare class Compiler extends BaseCompiler {
    constructor(compiler: webpack.Compiler);
    watch: (watchOption?: WatchOptions) => void;
    private emitStop;
    stop: (callback?: CompilerCallback) => void;
}
