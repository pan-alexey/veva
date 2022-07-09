import minimist from 'minimist';
import path from 'path';
import dotenv from 'dotenv';

export enum ActionEnv {
  dev = 'development',
  build = 'production',
  test = 'testing',
}

export interface Config {
  argv: minimist.ParsedArgs;
  processCwd: string;
  appConfig: string;
  envConfig: string;
  actionType: ActionType;
  envType: EnvType;
}

export type ActionType = null | keyof typeof ActionEnv;
export type EnvType = `${ActionEnv}` | null;

export const getActionType = (value: string): ActionType => {
  if (Object.keys(ActionEnv).includes(value)) {
    return value as ActionType;
  }
  return null;
};

export const getEnvType = (actionType?: ActionType): EnvType => {
  return actionType ? ActionEnv[actionType] : null;
};

export const getArgvValue = <T>(value: unknown, general: T): string | T => {
  if (Array.isArray(value) && value.length > 0) {
    return getArgvValue(value[0], general);
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  return general;
};

const getProcessConfig = (): Config => {
  const argv = minimist(process.argv.slice(2));
  const processCwd = process.cwd();
  const envConfig = getArgvValue(argv.env, '');
  const appConfig = getArgvValue(argv.config, '');
  const actionType: ActionType = getActionType(argv._[0]);
  const envType: EnvType = getEnvType(actionType);

  return {
    actionType,
    envType,
    appConfig,
    envConfig,
    argv,
    processCwd,
  };
};

export const getAppConfigPath = (): string => {
  const { processCwd, appConfig } = getProcessConfig();
  return path.resolve(processCwd, appConfig);
};

export const getConfigs = () => {
  const config = getProcessConfig();

  // Auto assign env values
  dotenv.config({
    path: path.resolve(config.processCwd, config.envConfig),
  });

  // Override process env
  if (config.envType === 'production') {
    process.env.NODE_ENV = 'production';
  }

  return {
    config,
    env: process.env,
  };
};
