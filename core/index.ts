import * as $$path from './utils/path';
import { Builder } from './utils/builder';
import webpcackConfig, { IConfig } from './webpack/webpack.react';
import webpack from 'webpack';
const webackClient = require('./webpack/webpack.client.js');
// import ssr from './render/ssr';

// import { Terminal } from './utils/terminal';

const serverConfig = webpcackConfig({
  isProd: false,
  isServer: true,
  input: './core/render/$server.tsx',
  output: $$path.resolvePath('./build/render')
});

const clientConfig = webpcackConfig({
  isProd: false,
  isServer: false,
  input: './core/render/$client.tsx',
  output: $$path.resolvePath('./build/client')
});



console.log(webackClient);
webpack(webackClient, (err, stats) => {
  console.log(err, stats?.toString());
})
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
