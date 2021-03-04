import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
declare const _default: {
    mode: string;
    devtool: string | boolean;
    entry: {
        app: string;
    };
    resolve: {
        alias: {
            '@src': string;
        };
        extensions: string[];
    };
    output: {
        path: string;
        filename: string;
        chunkFilename: string;
        libraryTarget: string;
    };
    module: {
        rules: ({
            test: RegExp;
            type: string;
            use?: undefined;
            loader?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            use: string[];
            type?: undefined;
            loader?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            loader: string;
            type?: undefined;
            use?: undefined;
            exclude?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp;
            use: {
                loader: string;
                options: {
                    presets: (string | (string | {
                        targets: {
                            esmodules: boolean;
                        };
                    })[])[];
                    plugins: string[];
                };
            };
            type?: undefined;
            loader?: undefined;
        })[];
    };
    optimization: {
        splitChunks: {
            chunks: string;
            maxInitialRequests: number;
            minSize: number;
            cacheGroups: {
                vendor: {
                    test: RegExp;
                    name(module: any): string;
                };
            };
        };
    };
    plugins: (MiniCssExtractPlugin | CleanWebpackPlugin | webpack.HotModuleReplacementPlugin)[];
};
export default _default;
