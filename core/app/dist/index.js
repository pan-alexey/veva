"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliApp = exports.BaseApp = exports.PATH = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const builder_1 = require("./builder");
const tsconfig_1 = __importDefault(require("./source/tsconfig"));
const entry_1 = __importDefault(require("./source/entry"));
const ROOT = process.cwd();
const VEVA_ROOT = path_1.default.resolve(ROOT, './node_modules/.veva');
const VEVA_CLI_SOURCE = path_1.default.resolve(VEVA_ROOT, './source');
const VEVA_CLI_REQUIRE = path_1.default.resolve(VEVA_ROOT, './require');
exports.PATH = {
    ROOT,
    VEVA_ROOT,
    VEVA_CLI_SOURCE,
    VEVA_CLI_REQUIRE,
};
class BaseApp {
}
exports.BaseApp = BaseApp;
const cliApp = async (options) => {
    const configExist = await fs_extra_1.default.pathExists(options.appConfig);
    if (!configExist) {
        console.log(chalk_1.default.bgRed.white(` ERROR: config not exist `));
        process.exit(1);
    }
    const rootPath = exports.PATH.ROOT;
    const entry = path_1.default.resolve(exports.PATH.VEVA_CLI_SOURCE, './index.ts');
    const tsConfig = path_1.default.resolve(exports.PATH.VEVA_CLI_SOURCE, './tsconfig.json');
    const appConfig = options.appConfig.split('.').slice(0, -1).join('.');
    await fs_extra_1.default.remove(exports.PATH.VEVA_CLI_SOURCE);
    await fs_extra_1.default.ensureDir(exports.PATH.VEVA_CLI_SOURCE);
    await fs_extra_1.default.writeFile(tsConfig, JSON.stringify(tsconfig_1.default));
    await fs_extra_1.default.writeFile(entry, (0, entry_1.default)({
        appConfig,
        packageName: options.packageName
    }));
    const build = await (0, builder_1.configBuilder)({
        rootPath,
        entry,
        tsConfig,
        config: appConfig,
        outputPath: exports.PATH.VEVA_CLI_REQUIRE,
        sourcePath: exports.PATH.VEVA_CLI_SOURCE,
    });
    const compilerPackage = require(build);
    await compilerPackage();
};
exports.cliApp = cliApp;
