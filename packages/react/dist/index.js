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

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
class App {
    run() {
        console.log('run veva@react');
    }
}
exports.App = App;
;


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

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@veva/react","version":"1.1.0","main":"dist/index.js","types":"./dist/index.d.ts","bin":{"veva.react":"./bin/index.js"},"publishConfig":{"access":"public"},"files":["bin","dist"],"scripts":{"build":"npm run clear && npm run build:src && npm run build:cli","build:src":"webpack","build:cli":"webpack --config ./cli/webpack.config.js && chmod +x bin/index.js","clear":"rimraf dist && rimraf bin","test":"jest --config jest.config.json","lint":"eslint ./ --ext .js --ext .ts","lint:fix":"eslint ./ --ext .js --ext .ts --fix"},"devDependencies":{"jest":"^27.1.4","ts-jest":"^27.1.4","ts-loader":"^9.2.7","typescript":"^4.6.2","webpack":"^5.65.0","webpack-cli":"^4.9.2","webpack-node-externals":"^3.0.0","@types/webpack-env":"^1.16.4","@types/node":"^17.0.1"},"dependencies":{"@veva/core-app":"^1.1.0","@veva/utils":"^1.1.0"}}');

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
const app_1 = __webpack_require__(/*! ./app */ "./src/app/index.ts");
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
            console.log("Error:", error?.message || 'unknown');
        }
    }
    console.log(`export default must be config ${config_1.packageName} v${config_1.packageVersion}`);
    process.exit(1);
};
exports.cli = cli;
exports["default"] = (options) => {
    return new app_1.App();
};

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map