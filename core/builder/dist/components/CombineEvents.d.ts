import { CompilerEvents, CompilerState } from './Base';
import * as Build from './Build';
import * as Watch from './Watch';
export interface Compilers {
    [name: string]: Build.Compiler | Watch.Compiler;
}
export interface CombaineState {
    [name: string]: CompilerState;
}
export declare type CombineCallback = (state: CombaineState) => void;
export declare class CombineEvents {
    private status;
    protected compilers: Compilers;
    private callbacks;
    constructor(compilers: Compilers);
    getStatus: () => 'created' | 'progress' | 'done';
    getState: () => CombaineState;
    on: (event: CompilerEvents, callback: CombineCallback) => this;
    private register;
    private processEvent;
    private emit;
}
