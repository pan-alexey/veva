const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isProd = true;

const mode = isProd ? 'production' : 'development';

const rootPath = fs.realpathSync(process.cwd());

module.exports = {
  mode,
  devtool: isProd ? false : 'source-map',
  entry: {
    app: path.resolve(rootPath, 'src', 'index.tsx')
  },
  output: {
    path: path.resolve(rootPath, './dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: 'js/[name].([contenthash:8]).js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', 'jsx', 'json']
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
      { test: /\.tsx?$/, loader: 'ts-loader'},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
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
          name(module) {
            // const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            // return `vendor/${packageName.replace('@', '')}`;
            const moduleMatch = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            let version = '';
            try {
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              const packageJson = require(path.resolve(rootPath, './node_modules/' + moduleMatch[1] + '/package.json'));
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
