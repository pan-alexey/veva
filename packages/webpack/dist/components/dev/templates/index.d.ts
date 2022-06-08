export declare const start: () => string;
export declare const progress: (options: {
    packageName: string;
    packageVersion: string;
    progress: number;
    progressStatus: string;
    hot: boolean;
}) => string;
export declare const done: (options: {
    packageName: string;
    packageVersion: string;
    port: number;
    hot: boolean;
    serverReady: boolean;
    compileStatus: 'success' | 'warning' | 'failed';
}) => string;
