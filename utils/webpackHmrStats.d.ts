import type { Types } from 'webpack-hmr-server';
export interface ErrorOptions {
    client?: Array<Types.DataStatsError>;
    server?: Array<Types.DataStatsError>;
}
export interface Items {
    key: string;
    name: string;
    message: string;
    isServer: boolean;
    isClinet: boolean;
}
export declare const processErrors: (options: ErrorOptions) => Items[];
