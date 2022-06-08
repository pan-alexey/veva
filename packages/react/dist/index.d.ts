import { App } from './app';
export { App };
export declare const cli: (config: unknown) => Promise<void>;
export declare type Options = () => Promise<{
    test: string;
}>;
declare const _default: (options: Options) => App;
export default _default;
