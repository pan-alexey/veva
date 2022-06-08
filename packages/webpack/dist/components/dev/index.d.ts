import { Configuration } from 'webpack';
import { DevConfig } from '../../index';
export interface Options {
    devConfig: DevConfig;
    appConfig: Configuration;
    showWarnings: boolean;
}
export default function (options: Options): Promise<void>;
