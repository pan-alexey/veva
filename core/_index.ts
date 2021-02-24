// import { getIps } from './utils/neworks';
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const $require = require('./scripts/require.js');

// console.log(getIps());

// class Veva {
//   constructor() {};

//   compiler() {
//     // load
//   }
// }

import { Builder } from './utils/builder';
import { Terminal } from './utils/terminal';

const DEBUG_ONLY = true;
const terminal = new Terminal();

const buildPath = '';

const builder = new Builder(DEBUG_ONLY, buildPath);


// builder.on('start', ()=>{
// });

// builder.on('progress', ()=>{
// });

// builder.on('success', ()=>{
// });

// builder.on('error', ()=>{
// });


// Если указан debug_only, то билд сервера не требуется
if (!DEBUG_ONLY) {
  // builder.server('start', () => {
  //   terminal.server('debug');
  // });

  // builder.client('finish', (hash) => {
  //   terminal.client('debug');
  // });

  // builder.once();
};


// const builder = new Builder();
// builder.debug();

// console.log(builder);
