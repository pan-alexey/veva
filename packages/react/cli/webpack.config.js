/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable filenames/match-regex */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './cli/index.ts',
  mode: 'development',
  devtool: 'source-map',
  target: 'node',
  output: {
    libraryTarget: 'umd',
    path: path.resolve(process.cwd(), 'bin'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  externals: [
    nodeExternals({
      modulesFromFile: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
      },
    ],
  },
  plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],
};
