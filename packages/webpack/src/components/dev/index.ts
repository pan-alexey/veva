import { Configuration } from 'webpack';
import webpackHmrServer, {createHotServer} from 'webpack-hmr-server';
import { packageName, packageVersion } from '../../config';
import webpack from 'webpack';
import * as templates from './templates';
import processStats from './stats/index';

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
    applyAdditionalEntries(compiler, ["webpack-hmr-server/client.legacy.js", "@veva/core-hmr-client-preact"]);
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
    .on('done', (state) => {
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
        children: true,
        modules: true,
        timings: true,
        hash: true,
      });

      if (compileStatus!=='failed') {
        server.static(statJson.outputPath); // default static webpack
        server.setReady(true);
      }
      if (statJson.warnings && options.showWarnings) {
        processStats(statJson.warnings, 'warnings');
      }
      if (statJson.errors) {
        processStats(statJson.errors, 'errors');
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
