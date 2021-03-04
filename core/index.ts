/* eslint-disable @typescript-eslint/no-unused-vars */
// import * as $$path from './utils/path';
// import { Builder } from './utils/builder';
// import webpackServer, { IConfig } from './webpack/webpack.server';
// import webpackClient from './webpack/webpack.client';
import webpack from 'webpack';

import webpackTest from './webpack/webpack.test';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
webpack(webpackTest, (err, stats) => {
  console.log(stats?.toString());
});

// const webackClient = require('./webpack/webpack.client.js');
// import ssr from './render/ssr';
// import { Terminal } from './utils/terminal';

// const serverConfig = webpcackConfig({
//   isProd: false,
//   isServer: true,
//   input: './core/render/$server.tsx',
//   output: $$path.resolvePath('./build/render')
// });

// const clientConfig = webpcackConfig({
//   isProd: false,
//   isServer: false,
//   input: './core/render/$client.tsx',
//   output: $$path.resolvePath('./build/client')
// });

// const clientConfig = webackClient({
//   input: './core/render/$client.tsx',
//   output: $$path.resolvePath('./build/client')
// });

// console.log(clientConfig);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// webpack(clientConfig, (err, stats) => {
//   console.log(stats?.toString());
// });

// webpack(serverConfig, (err, stats) => {
//   // [Stats Object](#stats-object)
//   // if (err || stats.hasErrors()) {
//   //   // [Handle errors here](#error-handling)
//   // }
//   console.log(err, stats?.toString());
//   // Done processing
// });

// webpack(clientConfig, (err, stats) => {
//   // [Stats Object](#stats-object)
//   // if (err || stats.hasErrors()) {
//   //   // [Handle errors here](#error-handling)
//   // }
//   console.log(err, stats?.toString());
//   // Done processing
// });
