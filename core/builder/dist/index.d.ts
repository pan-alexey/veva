import webpack from 'webpack';
import * as Combine from './components/CombineEvents';
import * as Build from './components/Build';
import * as Watch from './components/Watch';
declare const isExistPluginHMR: (compiler: webpack.Compiler) => boolean;
declare const isExistPluginNoEmitOnErrors: (compiler: webpack.Compiler) => boolean;
declare const applyNoEmitOnErrorsPlugin: (compiler: webpack.Compiler) => void;
declare const applyPluginHMR: (compiler: webpack.Compiler) => void;
declare const applyAdditionalEntries: (compiler: webpack.Compiler, entries: Array<string>) => void;
declare const buildFactory: (webpackCompiler: Record<string, webpack.Compiler>) => {
    compilers: Record<string, Build.Compiler>;
    combineEvents: Combine.CombineEvents;
    run: () => void;
};
declare const watchFactory: (webpackCompiler: Record<string, webpack.Compiler>, watchOptions?: Watch.WatchOptions) => {
    getState: () => Combine.CombaineState;
    on: (event: import("./components/Base").CompilerEvents, callback: Combine.CombineCallback) => Combine.CombineEvents;
    run: () => void;
    stop: () => void;
};
export declare const groupErrors: () => void;
export { isExistPluginNoEmitOnErrors, isExistPluginHMR, applyPluginHMR, applyAdditionalEntries, applyNoEmitOnErrorsPlugin, Combine, Build, Watch, buildFactory, watchFactory, };
