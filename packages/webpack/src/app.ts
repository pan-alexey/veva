import path from 'path';
import { BaseApp } from '@veva/core-app';
import { getConfigs } from '@veva/utils/processConfig';
import { OptionCallback, WebpackConfig, DevConfig } from './index';

import appDev from './components/dev';
import appBuild from './components/build';

export interface AppOption {
  optionCallback: OptionCallback,
  devConfig: DevConfig
}

export class App extends BaseApp {
  private options: AppOption;
  constructor(options: AppOption) {
    super();
    this.options = options
  }

  public run = async () => {
    // 1. build config
    const configs = getConfigs();
    const appConfig = await this.options.optionCallback({
      isProd: configs.config.envType === 'production',
      processCwd: configs.config.processCwd,
      env: configs.env,
    });

    // Assign default config
    // set default context
    appConfig.context = appConfig.context ? appConfig.context : configs.config.processCwd;
    const defaultDevConfig: Required<DevConfig> = {
      port: 8000,
      hot: true,
      static: appConfig.output.path || path.resolve(configs.config.processCwd, 'public')
    }
    const devConfig: Required<DevConfig> = Object.assign({}, defaultDevConfig, this.options.devConfig);

    // todo fix isTruethly
    const { warnings = 'true' } = configs.config.argv;
    const showWarnings =  warnings === 'true';

    // 2. run by action type
    switch (configs.config.actionType) {
      case 'dev':
        await appDev({
          devConfig: devConfig,
          appConfig,
          showWarnings,
        });
        break;
      case 'build':
        await appBuild({
          appConfig,
          showWarnings,
        });
        break;
      default:
        console.log("Dont detect action type");
        process.exit(1);
    }
  }
};
