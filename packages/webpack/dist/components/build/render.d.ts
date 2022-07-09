import webpack from 'webpack';
export declare const buildTable: (assets: Array<{
    name: any;
    size: any;
}>, type: string) => string;
export declare const renderAssets: (stats: webpack.Stats) => void;
export declare const formatSize: (size: number) => string;
