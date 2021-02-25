import * as $$path from './utils/path';
import { Builder } from './utils/builder';
import webpcackConfig, { IConfig } from './webpack/webpack.react';
import webpack from 'webpack';

// import ssr from './render/ssr';

// import { Terminal } from './utils/terminal';

// const builderConfig = {
//   render: webpcackConfig({
//     input,
//     output:
//     IOutput,
//     isProd: boolean, isServer: boolean})
// };

// const renderConfig: IConfig = {
//   isProd: false,
//   isServer: true,
//   input: $$path.resolve('./render/ssr.ts'),
//   output: $$path.resolvePath('./build/render')
// };

// const builder = new Builder({
//   render: renderConfig
// });

const serverConfig = webpcackConfig({
  isProd: false,
  isServer: true,
  input: './core/render/server.tsx', // $$path.resolve('./core/render/ssr.ts'),
  output: $$path.resolvePath('./build/render')
});

console.log(serverConfig);

webpack(serverConfig, (err, stats) => {
  // [Stats Object](#stats-object)
  // if (err || stats.hasErrors()) {
  //   // [Handle errors here](#error-handling)
  // }

  console.log(err, stats?.toString());
  // Done processing
});
