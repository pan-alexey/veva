"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configBuilder = void 0;
const webpack_1 = __importDefault(require("webpack"));
const ci_info_1 = __importDefault(require("ci-info"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const nodePackage_1 = require("@veva/utils/nodePackage");
const configBuilder = (options) => {
    return new Promise((resolve) => {
        const ouputModule = path_1.default.resolve(options.outputPath, 'index.js');
        (0, webpack_1.default)({
            entry: options.entry,
            mode: 'production',
            devtool: 'source-map',
            target: 'node',
            context: options.rootPath,
            externalsPresets: {
                node: true,
            },
            output: {
                libraryTarget: 'umd',
                path: options.outputPath,
                filename: 'index.js',
            },
            externals: [
                function ({ context, request }, callback) {
                    if (request === options.entry || request === options.config) {
                        return callback();
                    }
                    if (request && context === process.cwd()) {
                        const symbol = request[0];
                        if (symbol === '/' || symbol === '.') {
                            return callback();
                        }
                    }
                    if ((0, nodePackage_1.isPackage)(request)) {
                        return callback(undefined, 'commonjs ' + request);
                    }
                    return callback();
                },
            ],
            resolve: {
                extensions: ['.json', '.ts', '.js', '.tsx'],
                modules: ['node_modules'],
            },
            node: {
                global: true,
                __filename: true,
                __dirname: true,
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader',
                        options: {
                            allowTsInNodeModules: true,
                            onlyCompileBundledFiles: true,
                            configFile: options.tsConfig,
                        },
                    },
                ],
            },
        }, (err, stats) => {
            if (err || stats?.hasErrors()) {
                const msg = ci_info_1.default.isCI ? chalk_1.default.bgRed.white('ERROR: compile config') : 'ERROR: compile config';
                console.log(msg);
                if (stats) {
                    const statJson = stats.toJson({
                        colors: !ci_info_1.default.isCI
                    });
                    statJson.errors?.forEach((error) => {
                        console.log(error.message);
                    });
                }
                process.exit(1);
            }
            resolve(ouputModule);
        });
    });
};
exports.configBuilder = configBuilder;
