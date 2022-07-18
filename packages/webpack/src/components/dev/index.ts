import { Configuration } from 'webpack';
import webpackHmrServer, {createHotServer, statsToData} from 'webpack-hmr-server';
import { packageName, packageVersion } from '../../config';
import webpack from 'webpack';
import * as templates from './templates';
import chalk from 'chalk';
import * as fs from 'fs';

import {
  applyPluginHMR,
  applyAdditionalEntries,
  applyNoEmitOnErrorsPlugin
} from '@veva/core-builder';

import { Watch } from '@veva/core-builder';
import { createServer } from '@veva/core-server';

import { DevConfig } from '../../index';
import { terminal } from '@veva/utils';

export interface Options {
  devConfig: DevConfig;
  appConfig: Configuration;
  showWarnings: boolean;
}

export default async function (options: Options) {
  const { devConfig, appConfig } = options;

  // 1. start server
  const server = await createServer(devConfig.port);
  const hotServer = createHotServer(server.server);

  // 2. register middlewares
  if (Array.isArray(devConfig.static)) {
    devConfig.static.forEach(root => {
      server.static(root)
    })
  } else {
    server.static(devConfig.static)
  }

  // 3. create compiler and apply plugins
  const compiler = webpack(appConfig);
  if (devConfig.hot) {
    applyPluginHMR(compiler);
    applyNoEmitOnErrorsPlugin(compiler);
    applyAdditionalEntries(compiler, ["webpack-hmr-server/client.legacy.js", "@veva/core-hmr-client"]);
  }

  // 4. create builder and prcessing steps
  const builder = new Watch.Compiler(compiler)
  builder
    .on('start', (state) => {
      terminal.clear();
      console.log(templates.start())
    })
    .on('progress', (state) => {
      terminal.clear();
      console.log(templates.progress({
        packageName,
        packageVersion,
        progress: state.progress,
        progressStatus: state.status,
        hot: devConfig.hot,
      }))
    })
    .on('done', async (state) => {
      terminal.clear();
      if (state.err) {
        console.log(state.err);
        process.exit(1);
      }

      let compileStatus: 'success' | 'warning' | 'failed' = 'success';
      if (state.stats.hasErrors()) {
        compileStatus = 'failed';
      } else if (state.stats.hasWarnings()) {
        compileStatus = 'warning'
      }

      const statJson = state.stats.toJson({
        cached: true,
        // children: true,
        // modules: true,
        timings: true,
        hash: true,
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      });

      if (compileStatus !=='failed' ) {
        server.static(statJson.outputPath); // default static webpack
        server.setReady(true);
      }

      const statsData = statsToData(state.stats);
      if (statsData.warnings && options.showWarnings) {
        for (let i = 0; i < statsData.warnings.length; i++) {
          const warning = statsData.warnings[i];
          let file = warning.moduleName || warning.file ? warning._name_ : '';
          file = file && warning.loc ? `${file}:${parseInt(warning.loc)}` : file;

          let title = `🟡 ${chalk.yellow.bold('Warning [client & server]')}`;
          title += file ? ` in ${file}` : ':';

          console.log(title)
          console.log(warning.message);
          console.log('')
        }
      }

      if (statsData.errors) {
        for (let i = 0; i < statsData.errors.length; i++) {
          const error = statsData.errors[i];
          let file = error.moduleName || error.file ? error._name_ : '';
          file = file && error.loc ? `${file}:${parseInt(error.loc)}` : file;

          let title = `❌ ${chalk.red.bold('Error [client]')}`;
          title += file ? ` in ${file}` : ':';

          console.log(title)
          console.log(error.message);
          console.log('')
        }
      }

      console.log(templates.done({
        packageName,
        packageVersion,
        hot: devConfig.hot,
        serverReady: server.isReady(),
        port: devConfig.port,
        compileStatus
      }));

      // Hot module replacement
      hotServer.reloadModules({ client: state.stats })
    });

  // start wathc
  builder.watch({
    aggregateTimeout: 10,
    poll: 10,
  })
}
