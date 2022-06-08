import { BaseApp } from '@veva/core-app';
import { OptionCallback, DevConfig } from './index';
export interface AppOption {
    optionCallback: OptionCallback;
    devConfig: DevConfig;
}
export declare class App extends BaseApp {
    private options;
    constructor(options: AppOption);
    run: () => Promise<void>;
}
