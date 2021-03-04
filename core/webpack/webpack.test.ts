import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import * as $$path from '../utils/path';

const isProd = true;

const mode = isProd ? 'production' : 'development';

// const rootPath = fs.realpathSync(process.cwd());

export default {
  mode,
  devtool: isProd ? false : 'source-map',
  entry: {
    app: $$path.resolveRoot('./core/render/$client.tsx') //  path.resolve(rootPath, 'src', 'index.tsx')
  },

  resolve: {
    alias: {
      '@src': $$path.resolveRoot('./src')
    },
    extensions: ['.ts', '.js', '.tsx', 'jsx', 'json']
  },
  output: {
    path: $$path.resolveRoot('./dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: 'js/[name].([contenthash:8]).js',
    libraryTarget: 'umd'
  },
  // resolve: {
  //   extensions: ['.ts', '.js', '.tsx', 'jsx', 'json']
  // },
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
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
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
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
          name(module): string {
            // const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            // return `vendor/${packageName.replace('@', '')}`;
            const moduleMatch = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            let version = '';
            try {
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              const packageJson = require($$path.resolve('./node_modules/' + moduleMatch[1] + '/package.json'));
              version = packageJson ? '.(v' + packageJson.version + ')' : '';
            } catch (error) {}

            return `externals/${moduleMatch[1].replace('@', '')}${version}`;
          }
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
