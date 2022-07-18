import webpack from 'webpack';

import { App } from './app';
import { packageVersion, packageName } from './config';

export { App };

// cli - methot will exec in @veva/core-app after config build
// props unknown, for validation instance
export const cli = async (config: unknown) => {
  if (config instanceof App) {
    try {
      await config.run();
      return;
    } catch (error) {
      console.log("Error:", error?.message || 'unknown')
    }
  }
  console.log(`export default must be config ${packageName} v${packageVersion}`);
  process.exit(1);
}

// For IDE highlight type
export interface WebpackConfig extends webpack.Configuration {}

export type OptionCallback = (
  props: {
    isProd: boolean;
    processCwd: string;
    env: Record<string, string>
  }
) => (WebpackConfig) | (Promise<WebpackConfig>);

export type DevConfig = Partial<{
  port: number;
  hot: boolean;
  static: string | Array<string>;
}>

// default config
export default (
  optionCallback: OptionCallback,
  devConfig: DevConfig = {}
) => new App({
  optionCallback,
  devConfig,
})
