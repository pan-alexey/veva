import webpack from 'webpack';
export declare type CompilingStatus = 'created' | 'stoped' | 'start' | 'compiling' | 'building' | 'emit' | 'done';
export declare type CompilerEvents = 'start' | 'progress' | 'done';
export interface CompilerState {
    status: CompilingStatus;
    progress: number;
    stats: webpack.Stats | null;
    err: Error | null;
    progressTime: number;
}
export declare type CompilerCallback = (state: CompilerState) => void;
export declare class BaseCompiler {
    protected compiler: webpack.Compiler;
    private callbacks;
    protected state: CompilerState;
    constructor(compiler: webpack.Compiler);
    protected compilerHandler: (err?: Error | null, stats?: webpack.Stats) => void;
    private progressHooks;
    private emitStart;
    private emitProgress;
    private emitDone;
    inProgress: () => boolean;
    getState: () => CompilerState;
    on: (event: CompilerEvents, callback: CompilerCallback) => this;
}
