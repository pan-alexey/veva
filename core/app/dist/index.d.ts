export declare const PATH: {
    ROOT: string;
    VEVA_ROOT: string;
    VEVA_CLI_SOURCE: string;
    VEVA_CLI_REQUIRE: string;
};
export interface Options {
    packageName: string;
    appConfig: string;
}
export declare abstract class BaseApp {
    abstract run(): Promise<void>;
}
export declare const cliApp: (options: Options) => Promise<void>;
