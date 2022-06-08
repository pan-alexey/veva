import config, { WebpackConfig, DevConfig } from "@veva/webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MiniCssExtractPlugin, {loader as CssExtractLoader}  from 'mini-css-extract-plugin';
import webpack from "webpack";
import sass from 'sass';
import path from "path";

const devConfig: DevConfig = {
  hot: true,
  port: 9001
};

export default config(async (props) => {
  return {
    mode: props.isProd ? "production" : 'development',
    entry: {
      main: "./src/index.tsx",
    },
    target: "web",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                plugins: [
                  "@babel/plugin-proposal-class-properties",
                  !props.isProd && "react-refresh/babel",
                ].filter(Boolean),
              },
            },
            {
              loader: "ts-loader",
              options: {
                // transpileOnly: true // No check type
              },
            },
          ],
        }
        // -------------------------------------------------------- //
        // style
        ,{
          test: /\.(css|sass|scss)$/,
          use: [
            {
              loader: CssExtractLoader,
              // options: { hot: !props.isProd }
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: "[path]_[name]_[local]__[hash]",
                },
              } 
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                implementation: sass,
              },
            },
          ].filter(Boolean)
        }
        // -------------------------------------------------------- //
        ,{
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        }
        // -------------------------------------------------------- //
        ,{
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(props.processCwd, "./.build"),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[id].[contenthash:8].css",
      }),
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(props.processCwd, "./public/index.html"),
      }),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
             // @ts-ignore
            name(module) {
              // @ts-ignore
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `./chunks/npm.${packageName.replace('@', '')}`
            },
          },
        },
      },
    },
  };
}, devConfig);
