/// <reference types="node" />
import minimist from 'minimist';
export declare enum ActionEnv {
    dev = "development",
    build = "production",
    test = "testing"
}
export interface Config {
    argv: minimist.ParsedArgs;
    processCwd: string;
    appConfig: string;
    envConfig: string;
    actionType: ActionType;
    envType: EnvType;
}
export declare type ActionType = null | keyof typeof ActionEnv;
export declare type EnvType = `${ActionEnv}` | null;
export declare const getActionType: (value: string) => ActionType;
export declare const getEnvType: (actionType?: ActionType) => EnvType;
export declare const getArgvValue: <T>(value: unknown, general: T) => string | T;
export declare const getAppConfigPath: () => string;
export declare const getConfigs: () => {
    config: Config;
    env: NodeJS.ProcessEnv;
};
