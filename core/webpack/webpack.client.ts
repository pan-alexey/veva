/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import webpack from 'webpack';
import * as $$path from '../utils/path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

const isProd = false;
const mode = isProd ? 'production' : 'development';

export default (conf: any): unknown => {
  return {
    mode,
    devtool: isProd ? false : 'source-map',
    entry: conf.input, // ++++++++++++++++++
    resolve: {
      alias: {
        '@src': $$path.resolvePath('./src')
      },
      extensions: ['.scss', '.js', 'jsx', '.ts', '.tsx']
    },
    output: {
      filename: '[name].js',
      path: conf.output, // ++++++++++++++++++
      chunkFilename: 'js/[name].[contenthash:8].js',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline'
        },
        {
          test: /\.css$/,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        esmodules: true
                      }
                    }
                  ],
                  '@babel/preset-react'
                ],
                plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-object-rest-spread']
              }
            },
            { loader: 'ts-loader', options: { onlyCompileBundledFiles: true } }
          ]
        }
      ]
    },
    optimization: {
      minChunks: Infinity,
      // runtimeChunk: 'single',
      splitChunks: {

        chunks: 'all',
        cacheGroups: {
          vendor: {
            // reuseExistingChunk: true,
            test: /[\\/]node_modules[\\/]/,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            name(module) {
              const moduleMatch = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              let version = '';
              try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const packageJson = require($$path.resolvePath('./node_modules/' + moduleMatch[1] + '/package.json'));
                version = packageJson ? '~' + packageJson.version : '';
              } catch (error) {}

              return `externals/${moduleMatch[1].replace('@', '')}${version}`;
            }
          }
        }
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }),
      new CleanWebpackPlugin(),
      // new WebpackManifestPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
