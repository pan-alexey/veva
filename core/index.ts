import { getIps } from './utils/neworks';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const req = require('./scripts/requireUncached.js');

console.log(getIps());
