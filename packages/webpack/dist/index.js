(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/dev/templates/common/footer.hbs":
/*!********************************************************!*\
  !*** ./src/components/dev/templates/common/footer.hbs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("Note that the development build is not optimized.\nTo create a production build, run {{#chalk 'blue' 'bold'}}{{ packageName }}{{/chalk}} with {{#chalk 'green' 'bold'}}build{{/chalk}} options.");

/***/ }),

/***/ "./src/components/dev/templates/common/header.hbs":
/*!********************************************************!*\
  !*** ./src/components/dev/templates/common/header.hbs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("{{#nolinebreaks}}\n{{#chalk \"bgBlueBright\" \"white\"}} {{ appName }} {{/chalk}}{{#chalk \"bgBlue\" \"white\"}} {{ appVersion }} {{/chalk}}\n\n{{#if (isEqual compileStatus 'success')}}\n{{#chalk 'green'}} Compiled successfully! {{/chalk}}\n{{/if}}\n\n{{#if (isEqual compileStatus 'warning')}}\n{{#chalk 'yellow'}} Compiled with warnings! {{/chalk}}\n{{/if}}\n\n{{#if (isEqual compileStatus 'failed')}}\n{{#chalk 'red' 'bold'}} Failed to compile! {{/chalk}}\n{{/if}}\n\n{{/nolinebreaks}}\n{{!-- Compiled successfully! --}}\n{{!-- Failed to compile. --}}\n\n  🚀 Node: {{ nodeVersion }} \n  📦 Webpack: {{ webpackVersion }}\n  🔥 HMR: {{#if hot}}Enable{{else}}{{#chalk 'red' 'bold'}}Disable{{/chalk}}{{/if}}\n");

/***/ }),

/***/ "./src/components/dev/templates/done.hbs":
/*!***********************************************!*\
  !*** ./src/components/dev/templates/done.hbs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("═══════════════════════════════════════════════════════════════════\n{{> header }}\n\n{{#if serverReady}}\n  App running at:\n  💻 Local:    {{#chalk 'blueBright'}}http://127.0.0.1:{{ port }}{{/chalk}}\n  🌐 Network:  {{#chalk 'blueBright'}}http://{{ ip }}:{{ port }}{{/chalk}}\n{{else}}\n  ❌ {{#chalk 'red' 'bold'}}Server is start but not ready{{/chalk}}, first compile {{#chalk 'red' 'bold'}}is failed{{/chalk}}\n{{/if}}\n\n{{> footer }}\n\n═══════════════════════════════════════════════════════════════════\n");

/***/ }),

/***/ "./src/components/dev/templates/progress.hbs":
/*!***************************************************!*\
  !*** ./src/components/dev/templates/progress.hbs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("═══════════════════════════════════════════════════════════════════\n{{> header }}\n\n  💻 Client: {{progressbar progress '#44bb97' '#2b2b2b' 35}} [{{#chalk 'grey'}}{{ progressStatus }}{{/chalk}}]\n\n{{> footer }}\n\n═══════════════════════════════════════════════════════════════════\n\n");

/***/ }),

/***/ "./src/components/dev/templates/start.hbs":
/*!************************************************!*\
  !*** ./src/components/dev/templates/start.hbs ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\nStart compilling...\n");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const core_app_1 = __webpack_require__(/*! @veva/core-app */ "@veva/core-app");
const processConfig_1 = __webpack_require__(/*! @veva/utils/processConfig */ "@veva/utils/processConfig");
const dev_1 = __importDefault(__webpack_require__(/*! ./components/dev */ "./src/components/dev/index.ts"));
const build_1 = __importDefault(__webpack_require__(/*! ./components/build */ "./src/components/build/index.ts"));
class App extends core_app_1.BaseApp {
    constructor(options) {
        super();
        this.run = async () => {
            // 1. build config
            const configs = (0, processConfig_1.getConfigs)();
            const appConfig = await this.options.optionCallback({
                isProd: configs.config.envType === 'production',
                processCwd: configs.config.processCwd,
                env: configs.env,
            });
            // Assign default config
            // set default context
            appConfig.context = appConfig.context ? appConfig.context : configs.config.processCwd;
            const defaultDevConfig = {
                port: 8000,
                hot: true,
                static: appConfig.output.path || path_1.default.resolve(configs.config.processCwd, 'public')
            };
            const devConfig = Object.assign({}, defaultDevConfig, this.options.devConfig);
            // todo fix isTruethly
            const { warnings = 'true' } = configs.config.argv;
            const showWarnings = warnings === 'true';
            // 2. run by action type
            switch (configs.config.actionType) {
                case 'dev':
                    await (0, dev_1.default)({
                        devConfig: devConfig,
                        appConfig,
                        showWarnings,
                    });
                    break;
                case 'build':
                    await (0, build_1.default)({
                        appConfig,
                        showWarnings,
                    });
                    break;
                default:
                    console.log("Dont detect action type");
                    process.exit(1);
            }
        };
        this.options = options;
    }
}
exports.App = App;
;


/***/ }),

/***/ "./src/components/build/index.ts":
/*!***************************************!*\
  !*** ./src/components/build/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const webpack_1 = __importDefault(__webpack_require__(/*! webpack */ "webpack"));
const core_builder_1 = __webpack_require__(/*! @veva/core-builder */ "@veva/core-builder");
const render_1 = __webpack_require__(/*! ./render */ "./src/components/build/render.ts");
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
const core_builder_2 = __webpack_require__(/*! @veva/core-builder */ "@veva/core-builder");
const log = (message, ...optionalParams) => {
    const timestamp = '[' + new Date().toUTCString() + '] ';
    console.log(timestamp, message, ...optionalParams);
};
const progressbar = (progress = 0) => {
    const length = 32;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += i < (length * progress / 100) ? '#' : '.';
    }
    return `[${result}] (${progress}%)`;
};
async function default_1(options) {
    const { appConfig } = options;
    const compiler = (0, webpack_1.default)(appConfig);
    const errors = [];
    if ((0, core_builder_2.isExistPluginHMR)(compiler)) {
        const errMsg = 'Detect HotModuleReplacementPlugin in production build';
        errors.push(errMsg);
        log(errMsg);
    }
    const builder = new core_builder_1.Build.Compiler(compiler);
    builder.on('start', () => {
        console.log('#########################################################################');
        log('Start compilling...');
    }).on('progress', (state) => {
        log(progressbar(state.progress));
    }).on('done', (state) => {
        console.log('#########################################################################');
        if (state.err) {
            console.log(state.err);
            process.exit(1);
        }
        if (state.stats.hasErrors()) {
            console.log(chalk_1.default.red.bold('Build with error'));
            console.log('');
            console.log(state.stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
                stats: 'errors-only',
            }));
            process.exit(1);
        }
        (0, render_1.renderAssets)(state.stats);
        console.log(chalk_1.default.green.bold('Build success'));
    });
    builder.run();
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/components/build/render.ts":
/*!****************************************!*\
  !*** ./src/components/build/render.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatSize = exports.renderAssets = exports.buildTable = void 0;
const cli_table_1 = __importDefault(__webpack_require__(/*! cli-table */ "cli-table"));
const isJS = (val) => /\.js$/.test(val);
const isCSS = (val) => /\.css$/.test(val);
const buildTable = (assets, type) => {
    const table = new cli_table_1.default({
        head: ['', 'Size', 'File'],
        colAligns: ['middle', 'right', 'left'],
        colWidths: [5, 15, 50]
    });
    assets.forEach(file => {
        table.push([type, (0, exports.formatSize)(file.size), file.name]);
    });
    return table.toString();
};
exports.buildTable = buildTable;
const renderAssets = (stats) => {
    const json = stats.toJson({
        hash: false,
        modules: false,
        chunks: false
    });
    const assets = json.assets
        ? json.assets
        : json.children.reduce((acc, child) => acc.concat(child.assets), []);
    const jsMap = new Map();
    const cssMap = new Map();
    assets.forEach((asset) => {
        const name = asset.name.split('?')[0];
        const size = asset.size;
        if (isJS(name)) {
            jsMap.set(name, size);
        }
        if (isCSS(name)) {
            cssMap.set(name, size);
        }
    });
    if (cssMap.size) {
        const cssAssets = [...cssMap]
            .map(([name, size]) => ({ name, size }))
            .sort((a, b) => b.size - a.size);
        console.log((0, exports.buildTable)(cssAssets, 'css'));
    }
    if (jsMap.size) {
        const jsAssets = [...jsMap]
            .map(([name, size]) => ({ name, size }))
            .sort((a, b) => b.size - a.size);
        console.log((0, exports.buildTable)(jsAssets, 'js'));
    }
};
exports.renderAssets = renderAssets;
const formatSize = (size) => {
    return (size / 1024).toFixed(2) + ' KiB';
};
exports.formatSize = formatSize;


/***/ }),

/***/ "./src/components/dev/index.ts":
/*!*************************************!*\
  !*** ./src/components/dev/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const webpack_hmr_server_1 = __webpack_require__(/*! webpack-hmr-server */ "webpack-hmr-server");
const config_1 = __webpack_require__(/*! ../../config */ "./src/config/index.ts");
const webpack_1 = __importDefault(__webpack_require__(/*! webpack */ "webpack"));
const templates = __importStar(__webpack_require__(/*! ./templates */ "./src/components/dev/templates/index.ts"));
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
const core_builder_1 = __webpack_require__(/*! @veva/core-builder */ "@veva/core-builder");
const core_builder_2 = __webpack_require__(/*! @veva/core-builder */ "@veva/core-builder");
const core_server_1 = __webpack_require__(/*! @veva/core-server */ "@veva/core-server");
const utils_1 = __webpack_require__(/*! @veva/utils */ "@veva/utils");
async function default_1(options) {
    const { devConfig, appConfig } = options;
    // 1. start server
    const server = await (0, core_server_1.createServer)(devConfig.port);
    const hotServer = (0, webpack_hmr_server_1.createHotServer)(server.server);
    // 2. register middlewares
    if (Array.isArray(devConfig.static)) {
        devConfig.static.forEach(root => {
            server.static(root);
        });
    }
    else {
        server.static(devConfig.static);
    }
    // 3. create compiler and apply plugins
    const compiler = (0, webpack_1.default)(appConfig);
    if (devConfig.hot) {
        (0, core_builder_1.applyPluginHMR)(compiler);
        (0, core_builder_1.applyNoEmitOnErrorsPlugin)(compiler);
        (0, core_builder_1.applyAdditionalEntries)(compiler, ["webpack-hmr-server/client.legacy.js", "@veva/core-hmr-client"]);
    }
    // 4. create builder and prcessing steps
    const builder = new core_builder_2.Watch.Compiler(compiler);
    builder
        .on('start', (state) => {
        utils_1.terminal.clear();
        console.log(templates.start());
    })
        .on('progress', (state) => {
        utils_1.terminal.clear();
        console.log(templates.progress({
            packageName: config_1.packageName,
            packageVersion: config_1.packageVersion,
            progress: state.progress,
            progressStatus: state.status,
            hot: devConfig.hot,
        }));
    })
        .on('done', async (state) => {
        utils_1.terminal.clear();
        if (state.err) {
            console.log(state.err);
            process.exit(1);
        }
        let compileStatus = 'success';
        if (state.stats.hasErrors()) {
            compileStatus = 'failed';
        }
        else if (state.stats.hasWarnings()) {
            compileStatus = 'warning';
        }
        const statJson = state.stats.toJson({
            cached: true,
            // children: true,
            // modules: true,
            timings: true,
            hash: true,
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        });
        if (compileStatus !== 'failed') {
            server.static(statJson.outputPath); // default static webpack
            server.setReady(true);
        }
        const statsData = (0, webpack_hmr_server_1.statsToData)(state.stats);
        if (statsData.warnings && options.showWarnings) {
            for (let i = 0; i < statsData.warnings.length; i++) {
                const warning = statsData.warnings[i];
                let file = warning.moduleName || warning.file ? warning._name_ : '';
                file = file && warning.loc ? `${file}:${parseInt(warning.loc)}` : file;
                let title = `🟡 ${chalk_1.default.yellow.bold('Warning [client & server]')}`;
                title += file ? ` in ${file}` : ':';
                console.log(title);
                console.log(warning.message);
                console.log('');
            }
        }
        if (statsData.errors) {
            for (let i = 0; i < statsData.errors.length; i++) {
                const error = statsData.errors[i];
                let file = error.moduleName || error.file ? error._name_ : '';
                file = file && error.loc ? `${file}:${parseInt(error.loc)}` : file;
                let title = `❌ ${chalk_1.default.red.bold('Error [client]')}`;
                title += file ? ` in ${file}` : ':';
                console.log(title);
                console.log(error.message);
                console.log('');
            }
        }
        console.log(templates.done({
            packageName: config_1.packageName,
            packageVersion: config_1.packageVersion,
            hot: devConfig.hot,
            serverReady: server.isReady(),
            port: devConfig.port,
            compileStatus
        }));
        // Hot module replacement
        hotServer.reloadModules({ client: state.stats });
    });
    // start wathc
    builder.watch({
        aggregateTimeout: 10,
        poll: 10,
    });
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/components/dev/templates/index.ts":
/*!***********************************************!*\
  !*** ./src/components/dev/templates/index.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.done = exports.progress = exports.start = void 0;
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
const handlebars_1 = __importDefault(__webpack_require__(/*! handlebars */ "handlebars"));
const nodePackage_1 = __webpack_require__(/*! @veva/utils/nodePackage */ "@veva/utils/nodePackage");
const network_1 = __webpack_require__(/*! @veva/utils/network */ "@veva/utils/network");
const header_hbs_1 = __importDefault(__webpack_require__(/*! ./common/header.hbs */ "./src/components/dev/templates/common/header.hbs"));
const footer_hbs_1 = __importDefault(__webpack_require__(/*! ./common/footer.hbs */ "./src/components/dev/templates/common/footer.hbs"));
const progress_hbs_1 = __importDefault(__webpack_require__(/*! ./progress.hbs */ "./src/components/dev/templates/progress.hbs"));
const done_hbs_1 = __importDefault(__webpack_require__(/*! ./done.hbs */ "./src/components/dev/templates/done.hbs"));
const start_hbs_1 = __importDefault(__webpack_require__(/*! ./start.hbs */ "./src/components/dev/templates/start.hbs"));
//---------------------------------------------------------//
handlebars_1.default.registerHelper('chalk', function () {
    const args = Array.prototype.slice.apply(arguments);
    const options = args.pop();
    const chalkFn = args.reduce((result, i) => {
        return result[i];
    }, chalk_1.default);
    return chalkFn(options.fn(this));
});
//---------------------------------------------------------//
// color progressbar
handlebars_1.default.registerHelper('progressbar', function (progress = 0, succes = '#44bb97', fill = "#CCCC", length = 50) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += i < (length * progress / 100) ? chalk_1.default.bgHex('#44bb97')(' ') : chalk_1.default.bgHex(fill)(' ');
    }
    return result;
});
handlebars_1.default.registerHelper('nolinebreaks', function (options) {
    return options.fn(this).replace(/[\r\n]+/gm, "");
});
handlebars_1.default.registerHelper('isEqual', (value1, value2, options) => {
    return value1 === value2;
});
//---------------------------------------------------------//
handlebars_1.default.registerPartial("header", header_hbs_1.default);
handlebars_1.default.registerPartial("footer", footer_hbs_1.default);
//---------------------------------------------------------//
const start = () => {
    return handlebars_1.default.compile(start_hbs_1.default)({});
};
exports.start = start;
const progress = (options) => {
    return handlebars_1.default.compile(progress_hbs_1.default)({
        ...{
            appName: (0, nodePackage_1.getPackageJson)(process.cwd()).name,
            appVersion: (0, nodePackage_1.getPackageJson)(process.cwd()).version,
            nodeVersion: process.versions.node,
            webpackVersion: (0, nodePackage_1.getPackageJson)('webpack').version,
        },
        ...options
    });
};
exports.progress = progress;
const done = (options) => {
    return handlebars_1.default.compile(done_hbs_1.default)({
        ...{
            appName: (0, nodePackage_1.getPackageJson)(process.cwd()).name,
            appVersion: (0, nodePackage_1.getPackageJson)(process.cwd()).version,
            nodeVersion: process.versions.node,
            webpackVersion: (0, nodePackage_1.getPackageJson)('webpack').version,
            ip: (0, network_1.getIp)(),
        },
        ...options
    });
};
exports.done = done;


/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.packageVersion = exports.packageName = void 0;
const packageJson = __webpack_require__(/*! ../../package.json */ "./package.json");
exports.packageName = packageJson.name;
exports.packageVersion = packageJson.version;


/***/ }),

/***/ "@veva/core-app":
/*!*********************************!*\
  !*** external "@veva/core-app" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@veva/core-app");

/***/ }),

/***/ "@veva/core-builder":
/*!*************************************!*\
  !*** external "@veva/core-builder" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@veva/core-builder");

/***/ }),

/***/ "@veva/core-server":
/*!************************************!*\
  !*** external "@veva/core-server" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@veva/core-server");

/***/ }),

/***/ "@veva/utils":
/*!******************************!*\
  !*** external "@veva/utils" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@veva/utils");

/***/ }),

/***/ "@veva/utils/network":
/*!**************************************!*\
  !*** external "@veva/utils/network" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@veva/utils/network");

/***/ }),

/***/ "@veva/utils/nodePackage":
/*!******************************************!*\
  !*** external "@veva/utils/nodePackage" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@veva/utils/nodePackage");

/***/ }),

/***/ "@veva/utils/processConfig":
/*!********************************************!*\
  !*** external "@veva/utils/processConfig" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@veva/utils/processConfig");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/***/ ((module) => {

module.exports = require("chalk");

/***/ }),

/***/ "cli-table":
/*!****************************!*\
  !*** external "cli-table" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("cli-table");

/***/ }),

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("webpack");

/***/ }),

/***/ "webpack-hmr-server":
/*!*************************************!*\
  !*** external "webpack-hmr-server" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("webpack-hmr-server");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@veva/webpack","version":"1.1.1","main":"dist/index.js","types":"./dist/index.d.ts","bin":{"veva.webpack":"./bin/index.js"},"publishConfig":{"access":"public"},"files":["bin","dist"],"scripts":{"build":"npm run clear && npm run build:src && npm run build:cli","build:src":"webpack","build:cli":"webpack --config ./cli/webpack.config.js && chmod +x bin/index.js","clear":"rimraf dist && rimraf bin","test":"jest --config jest.config.json","lint":"eslint ./ --ext .js --ext .ts","lint:fix":"eslint ./ --ext .js --ext .ts --fix"},"devDependencies":{"jest":"^27.1.4","ts-jest":"^27.1.4","ts-loader":"^9.2.7","typescript":"^4.6.2","webpack-cli":"^4.9.2","webpack-node-externals":"^3.0.0","@types/webpack-env":"^1.16.4","@types/node":"^17.0.1","@types/cli-table":"^0.3.0","raw-loader":"^4.0.2"},"dependencies":{"cli-table":"^0.3.11","chalk":"^4.1.2","handlebars":"^4.7.7","webpack":"^5.72.1","webpack-hmr-server":"^1.1.5","@veva/core-server":"^1.1.0","@veva/core-app":"^1.1.0","@veva/core-builder":"^1.1.0","@veva/utils":"^1.1.0","@veva/core-hmr-client":"^1.1.0"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cli = exports.App = void 0;
const app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
Object.defineProperty(exports, "App", ({ enumerable: true, get: function () { return app_1.App; } }));
const config_1 = __webpack_require__(/*! ./config */ "./src/config/index.ts");
// cli - methot will exec in @veva/core-app after config build
// props unknown, for validation instance
const cli = async (config) => {
    if (config instanceof app_1.App) {
        try {
            await config.run();
            return;
        }
        catch (error) {
            console.log("Error:", (error === null || error === void 0 ? void 0 : error.message) || 'unknown');
        }
    }
    console.log(`export default must be config ${config_1.packageName} v${config_1.packageVersion}`);
    process.exit(1);
};
exports.cli = cli;
// default config
exports["default"] = (optionCallback, devConfig = {}) => new app_1.App({
    optionCallback,
    devConfig,
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map