import { App } from './app'
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

export type Options = () => Promise<{
  test: string
}>;

export default (options: Options) => {
  return new App()
}
