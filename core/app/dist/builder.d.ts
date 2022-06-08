export interface builderOptions {
    rootPath: string;
    config: string;
    tsConfig: string;
    entry: string;
    outputPath: string;
    sourcePath: string;
}
export declare const configBuilder: (options: builderOptions) => Promise<string>;
