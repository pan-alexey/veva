const path = require('path');
const vevaUtils = require('@veva/utils');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  target: 'node',
  externalsPresets: {
    node: true,
  },
  output: {
    libraryTarget: 'umd',
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.json', '.ts', '.tsx', '.js', '.txt', '.hbs'],
    modules: [
      'node_modules'
    ],
  },
  externals: [
    function ({ context, request }, callback) {
      const symbol = request[0];

      const hasNodeModules = request.split('/').find(dir => dir === 'node_modules')
      if (!hasNodeModules && (symbol === '/' || symbol === '.' )) {
        return callback();
      }

      if (vevaUtils.nodePackage.isPackage(request)) {
        return callback(undefined, 'commonjs ' + request);
      }
      return callback();
    },
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
      },
      {
        test: /\.hbs$/i,
        use: 'raw-loader',
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
};
