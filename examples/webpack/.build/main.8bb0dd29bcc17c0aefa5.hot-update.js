/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateveva_example_webpack"]("main",{

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ \"../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js\");\n__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../node_modules/react-refresh/runtime.js */ \"../../node_modules/react-refresh/runtime.js\");\n\n\"use strict\";\n\nvar __assign = this && this.__assign || function () {\n  __assign = Object.assign || function (t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n      s = arguments[i];\n\n      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n    }\n\n    return t;\n  };\n\n  return __assign.apply(this, arguments);\n};\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  var desc = Object.getOwnPropertyDescriptor(m, k);\n\n  if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n    desc = {\n      enumerable: true,\n      get: function () {\n        return m[k];\n      }\n    };\n  }\n\n  Object.defineProperty(o, k2, desc);\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {\n  Object.defineProperty(o, \"default\", {\n    enumerable: true,\n    value: v\n  });\n} : function (o, v) {\n  o[\"default\"] = v;\n});\n\nvar __importStar = this && this.__importStar || function (mod) {\n  if (mod && mod.__esModule) return mod;\n  var result = {};\n  if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n\n  __setModuleDefault(result, mod);\n\n  return result;\n};\n\nvar __importDefault = this && this.__importDefault || function (mod) {\n  return mod && mod.__esModule ? mod : {\n    \"default\": mod\n  };\n};\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\nvar jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"../../node_modules/react/jsx-runtime.js\");\n\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"../../node_modules/react/index.js\"));\n\nvar client_1 = __importDefault(__webpack_require__(/*! react-dom/client */ \"../../node_modules/react-dom/client.js\"));\n\n__webpack_require__(/*! ./index.scss */ \"./src/index.scss\"); // let a: string = 1;\n\n\nfunction App() {\n  var Text = react_1.default.lazy(function () {\n    return Promise.resolve().then(function () {\n      return __importStar(__webpack_require__(/*! ./components/Text */ \"./src/components/Text.tsx\"));\n    });\n  });\n  return (0, jsx_runtime_1.jsxs)(\"div\", {\n    children: [(0, jsx_runtime_1.jsx)(\"div\", {\n      id: 'stars'\n    }), (0, jsx_runtime_1.jsx)(\"div\", {\n      id: 'stars2'\n    }), (0, jsx_runtime_1.jsx)(\"div\", {\n      id: 'stars3'\n    }), (0, jsx_runtime_1.jsxs)(\"div\", __assign({\n      id: 'title'\n    }, {\n      children: [(0, jsx_runtime_1.jsx)(\"span\", {\n        children: \"VEVA BOILERPLATE\"\n      }), (0, jsx_runtime_1.jsx)(\"br\", {}), (0, jsx_runtime_1.jsx)(react_1.Suspense, __assign({\n        fallback: null\n      }, {\n        children: (0, jsx_runtime_1.jsx)(Text, {})\n      }))]\n    }))]\n  });\n}\n\n_c = App;\nvar root = client_1.default.createRoot(document.getElementById('root'));\nroot.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, {\n  children: (0, jsx_runtime_1.jsx)(App, {})\n}));\n\nvar _c;\n\n__webpack_require__.$Refresh$.register(_c, \"App\");\n\nconst $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;\nconst $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(\n\t$ReactRefreshModuleId$\n);\n\nfunction $ReactRefreshModuleRuntime$(exports) {\n\tif (true) {\n\t\tlet errorOverlay;\n\t\tif (true) {\n\t\t\terrorOverlay = false;\n\t\t}\n\t\tlet testMode;\n\t\tif (typeof __react_refresh_test__ !== 'undefined') {\n\t\t\ttestMode = __react_refresh_test__;\n\t\t}\n\t\treturn __react_refresh_utils__.executeRuntime(\n\t\t\texports,\n\t\t\t$ReactRefreshModuleId$,\n\t\t\tmodule.hot,\n\t\t\terrorOverlay,\n\t\t\ttestMode\n\t\t);\n\t}\n}\n\nif (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {\n\t$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);\n} else {\n\t$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);\n}\n\n//# sourceURL=webpack://veva-example-webpack/./src/index.tsx?");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n    if(true) {\n      // 1654674570888\n      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ \"../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js\")(module.id, {\"locals\":false});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack://veva-example-webpack/./src/index.scss?");

/***/ })

});