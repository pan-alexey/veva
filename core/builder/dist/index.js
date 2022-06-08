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
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchFactory = exports.buildFactory = exports.Watch = exports.Build = exports.Combine = exports.applyNoEmitOnErrorsPlugin = exports.applyAdditionalEntries = exports.applyPluginHMR = exports.isExistPluginHMR = exports.isExistPluginNoEmitOnErrors = exports.groupErrors = void 0;
const webpack_1 = __importStar(require("webpack"));
const Combine = __importStar(require("./components/CombineEvents"));
exports.Combine = Combine;
const Build = __importStar(require("./components/Build"));
exports.Build = Build;
const Watch = __importStar(require("./components/Watch"));
exports.Watch = Watch;
const isExistPluginHMR = (compiler) => {
    return !!compiler.options.plugins.find((plugin) => plugin instanceof webpack_1.HotModuleReplacementPlugin);
};
exports.isExistPluginHMR = isExistPluginHMR;
const isExistPluginNoEmitOnErrors = (compiler) => {
    return !!compiler.options.plugins.find((plugin) => plugin instanceof webpack_1.NoEmitOnErrorsPlugin);
};
exports.isExistPluginNoEmitOnErrors = isExistPluginNoEmitOnErrors;
const applyNoEmitOnErrorsPlugin = (compiler) => {
    if (!isExistPluginNoEmitOnErrors(compiler)) {
        const plugin = new webpack_1.default.NoEmitOnErrorsPlugin();
        plugin.apply(compiler);
    }
};
exports.applyNoEmitOnErrorsPlugin = applyNoEmitOnErrorsPlugin;
const applyPluginHMR = (compiler) => {
    if (!isExistPluginHMR(compiler)) {
        const plugin = new webpack_1.default.HotModuleReplacementPlugin();
        plugin.apply(compiler);
    }
};
exports.applyPluginHMR = applyPluginHMR;
const applyAdditionalEntries = (compiler, entries) => {
    entries.forEach(entry => {
        new webpack_1.default.EntryPlugin(compiler.context, entry, {
            name: undefined,
        }).apply(compiler);
    });
};
exports.applyAdditionalEntries = applyAdditionalEntries;
const buildFactory = (webpackCompiler) => {
    const compilers = {};
    Object.keys(webpackCompiler).forEach(key => {
        compilers[key] = new Build.Compiler(webpackCompiler[key]);
    });
    const combineEvents = new Combine.CombineEvents(compilers);
    const run = () => {
        Object.keys(compilers).forEach(key => {
            compilers[key].run();
        });
    };
    return {
        compilers,
        combineEvents,
        run
    };
};
exports.buildFactory = buildFactory;
const watchFactory = (webpackCompiler, watchOptions) => {
    const compilers = {};
    Object.keys(webpackCompiler).forEach(key => {
        compilers[key] = new Watch.Compiler(webpackCompiler[key]);
    });
    const combineEvents = new Combine.CombineEvents(compilers);
    const run = () => {
        Object.keys(compilers).forEach(key => {
            compilers[key].watch(watchOptions);
        });
    };
    const stop = () => {
        Object.keys(compilers).forEach(key => {
            compilers[key].stop();
        });
    };
    return {
        getState: combineEvents.getState,
        on: combineEvents.on,
        run,
        stop,
    };
};
exports.watchFactory = watchFactory;
const groupErrors = () => { };
exports.groupErrors = groupErrors;
