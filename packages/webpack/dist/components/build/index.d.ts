import { Configuration } from 'webpack';
export interface Options {
    appConfig: Configuration;
    showWarnings: boolean;
}
export default function (options: Options): Promise<void>;
