/// <reference types="node" />
import minimist from 'minimist';
declare enum ActionEnv {
    dev = "development",
    build = "production",
    test = "testing"
}
export declare type ActionType = null | keyof typeof ActionEnv;
export declare type EnvType = `${ActionEnv}` | null;
export interface Config {
    argv: minimist.ParsedArgs;
    processCwd: string;
    appConfig: string;
    envConfig: string;
    actionType: ActionType;
    envType: EnvType;
}
export declare const getAppConfigPath: () => string;
export declare const getConfigs: () => {
    config: Config;
    env: NodeJS.ProcessEnv;
};
export {};
