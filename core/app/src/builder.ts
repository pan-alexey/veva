import webpack from 'webpack';
import ciInfo from 'ci-info';
import path from 'path';
import chalk from 'chalk';
import { isPackage } from '@veva/utils/nodePackage';

export interface builderOptions {
  rootPath: string;
  config: string;
  tsConfig: string;
  entry: string;
  outputPath: string;
  sourcePath: string;
}

// Builder source files
export const configBuilder = (options: builderOptions): Promise<string> => {
  return new Promise((resolve) => {

    const ouputModule = path.resolve(options.outputPath, 'index.js');
    webpack({
      entry: options.entry,
      mode: 'production',
      devtool: 'source-map',
      target: 'node',
      context: options.rootPath,
      externalsPresets: {
        node: true,
      },
      output: {
        libraryTarget: 'umd',
        path: options.outputPath,
        filename: 'index.js',
      },
      externals: [
        function ({ context, request }, callback) {
          if (request === options.entry || request === options.config) {
            return callback();
          }

          // check if local file import
          if (request && context === process.cwd()) {
            const symbol = request[0];
            if (symbol === '/' || symbol === '.') {
              return callback();
            }
          }

          if (isPackage(request)) {
            return callback(undefined, 'commonjs ' + request);
          }

          return callback();
        },
      ],
      resolve: {
        extensions: ['.json', '.ts', '.js', '.tsx'],
        modules: ['node_modules'],
      },
      node: {
        global: true,
        __filename: true,
        __dirname: true,
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
              allowTsInNodeModules: true,
              onlyCompileBundledFiles: true,
              configFile: options.tsConfig,
            },
          },
        ],
      },
    }, (err, stats) => {
      if (err || stats?.hasErrors()) {
        // if is ci disable color
        const msg = ciInfo.isCI ? chalk.bgRed.white('ERROR: compile config') : 'ERROR: compile config'
        console.log(msg)
        
        if (stats) {
          const statJson = stats.toJson({
            colors: !ciInfo.isCI
          });
          statJson.errors?.forEach((error) => {
            console.log(error.message);
          });
        }
        process.exit(1);
      }
      resolve(ouputModule);
    },)
  })
}
