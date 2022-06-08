import webpack from 'webpack';
import { App } from './app';
export { App };
export declare const cli: (config: unknown) => Promise<void>;
export interface WebpackConfig extends webpack.Configuration {
}
export declare type OptionCallback = (props: {
    isProd: boolean;
    processCwd: string;
    env: Record<string, string>;
}) => (WebpackConfig) | (Promise<WebpackConfig>);
export declare type DevConfig = Partial<{
    port: number;
    hot: boolean;
    static: string | Array<string>;
}>;
declare const _default: (optionCallback: OptionCallback, devConfig?: DevConfig) => App;
export default _default;
