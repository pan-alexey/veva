import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { configBuilder } from './builder';

// source template file
import tsconfigTemplate from './source/tsconfig';
import entryTemplate from './source/entry';

const ROOT = process.cwd();
const VEVA_ROOT = path.resolve(ROOT, './node_modules/.veva');
const VEVA_CLI_SOURCE = path.resolve(VEVA_ROOT, './source');
const VEVA_CLI_REQUIRE = path.resolve(VEVA_ROOT, './require');

export const PATH = {
  ROOT,
  VEVA_ROOT,
  VEVA_CLI_SOURCE,
  VEVA_CLI_REQUIRE,
};

export interface Options {
  packageName: string;
  appConfig: string;
}

export abstract class BaseApp {
  public abstract run(): Promise<void>;
}

export const cliApp = async (options: Options) => {
  const configExist = await fs.pathExists(options.appConfig);
  if (!configExist) {
    // *******************************************
    console.log(chalk.bgRed.white(` ERROR: config not exist `))
    process.exit(1);
  }

  const rootPath = PATH.ROOT;
  const entry = path.resolve(PATH.VEVA_CLI_SOURCE, './index.ts')
  const tsConfig = path.resolve(PATH.VEVA_CLI_SOURCE, './tsconfig.json')
  const appConfig = options.appConfig.split('.').slice(0, -1).join('.'); // trim extentions (veva.config.ts -> veva.config)

  // clear direcory
  await fs.remove(PATH.VEVA_CLI_SOURCE);
  // Create files (tsconfig.json, index.ts)
  await fs.ensureDir(PATH.VEVA_CLI_SOURCE);
  await fs.writeFile(tsConfig, JSON.stringify(tsconfigTemplate));

  await fs.writeFile(entry, entryTemplate({
    appConfig,
    packageName: options.packageName
  }));

  const build = await configBuilder({
    rootPath,
    entry,
    tsConfig,
    config: appConfig,
    outputPath: PATH.VEVA_CLI_REQUIRE,
    sourcePath: PATH.VEVA_CLI_SOURCE,
  });

  // RUN BUILDED PACKAGE
  const compilerPackage = require(build);
  await compilerPackage()
}
