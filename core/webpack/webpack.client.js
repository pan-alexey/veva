const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = false;

const mode = isProd ? 'production' : 'development';

module.exports = {
  mode,
  devtool: isProd ? false : 'source-map',
  entry: path.resolve(__dirname, '../render/$client.tsx'), // isProd ? path.resolve(__dirname, 'src', 'index.js') : [path.resolve(__dirname, 'src', 'index.js')],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../../src')
    },
    extensions: ['.scss', '.js', 'jsx', '.ts', '.tsx']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
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
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-object-rest-spread']
            }
          },
          { loader: 'ts-loader', options: { onlyCompileBundledFiles: true } }
        ]
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: ['babel-loader'],
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         [
      //           '@babel/preset-env',
      //           {
      //             targets: {
      //               esmodules: true
      //             }
      //           }
      //         ],
      //         '@babel/preset-react'
      //       ],
      //       plugins: ['@babel/plugin-proposal-class-properties']
      //     }
      //   }
      // }
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
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor/${packageName.replace('@', '')}`;
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
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
