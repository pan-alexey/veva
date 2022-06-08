import type webpack from 'webpack';
export interface MapError {
    [title: string]: {
        message: string;
    };
}
export interface ErrorOptions {
    client?: Array<webpack.StatsError>;
    server?: Array<webpack.StatsError>;
}
export interface ResultItems {
    title: string;
    message: {
        client?: string;
        server?: string;
    };
}
export interface Result {
    types: Array<keyof ErrorOptions>;
    items: Array<ResultItems>;
}
export declare const processErrors: (options: ErrorOptions) => Result;
