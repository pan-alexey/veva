"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigs = exports.getAppConfigPath = exports.getArgvValue = exports.getEnvType = exports.getActionType = exports.ActionEnv = void 0;
const minimist_1 = __importDefault(require("minimist"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
var ActionEnv;
(function (ActionEnv) {
    ActionEnv["dev"] = "development";
    ActionEnv["build"] = "production";
    ActionEnv["test"] = "testing";
})(ActionEnv = exports.ActionEnv || (exports.ActionEnv = {}));
const getActionType = (value) => {
    if (Object.keys(ActionEnv).includes(value)) {
        return value;
    }
    return null;
};
exports.getActionType = getActionType;
const getEnvType = (actionType) => {
    return actionType ? ActionEnv[actionType] : null;
};
exports.getEnvType = getEnvType;
const getArgvValue = (value, general) => {
    if (Array.isArray(value) && value.length > 0) {
        return (0, exports.getArgvValue)(value[0], general);
    }
    if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
    }
    return general;
};
exports.getArgvValue = getArgvValue;
const getProcessConfig = () => {
    const argv = (0, minimist_1.default)(process.argv.slice(2));
    const processCwd = process.cwd();
    const envConfig = (0, exports.getArgvValue)(argv.env, '');
    const appConfig = (0, exports.getArgvValue)(argv.config, '');
    const actionType = (0, exports.getActionType)(argv._[0]);
    const envType = (0, exports.getEnvType)(actionType);
    return {
        actionType,
        envType,
        appConfig,
        envConfig,
        argv,
        processCwd,
    };
};
const getAppConfigPath = () => {
    const { processCwd, appConfig } = getProcessConfig();
    return path_1.default.resolve(processCwd, appConfig);
};
exports.getAppConfigPath = getAppConfigPath;
const getConfigs = () => {
    const config = getProcessConfig();
    dotenv_1.default.config({
        path: path_1.default.resolve(config.processCwd, config.envConfig),
    });
    if (config.envType === 'production') {
        process.env.NODE_ENV = 'production';
    }
    return {
        config,
        env: process.env,
    };
};
exports.getConfigs = getConfigs;
