import { Configuration } from 'webpack';
import webpack from 'webpack';
import { Build } from '@veva/core-builder';
import { renderAssets } from './render';
import chalk from 'chalk';

import {
  isExistPluginHMR
} from '@veva/core-builder';

export interface Options {
  appConfig: Configuration;
  showWarnings: boolean;
}

const log = (message?: any, ...optionalParams: any[]) => {
  const timestamp = '[' + new Date().toUTCString() + '] ';
  console.log(timestamp, message, ...optionalParams);
}

const progressbar = (progress = 0) => {
  const length = 32;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += i < (length * progress / 100) ? '#' : '.';
  }
  return `[${result}] (${progress}%)`;
}

export default async function (options: Options) {
  const { appConfig } = options;

  const compiler = webpack(appConfig);
  const errors = []
  if (isExistPluginHMR(compiler)) {
    const errMsg = 'Detect HotModuleReplacementPlugin in production build'
    errors.push(errMsg);
    log(errMsg)
  }

  const builder = new Build.Compiler(compiler);

  builder.on('start', () => {
    console.log('#########################################################################')
    log('Start compilling...');
  }).on('progress', (state) => {
    log(progressbar(state.progress))
  }).on('done', (state) => {
    console.log('#########################################################################')
    if (state.err) {
      console.log(state.err);
      process.exit(1);
    }
    if (state.stats.hasErrors()) {
      console.log(chalk.red.bold('Build with error'));
      console.log('');
      console.log(state.stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        stats: 'errors-only',
      }));
      process.exit(1);
    }
    renderAssets(state.stats);
    console.log(chalk.green.bold('Build success'));
  })

  builder.run()
}
