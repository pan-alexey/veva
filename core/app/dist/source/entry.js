"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (options) => `
// @ts-ignore
import vevaConfig from '${options.appConfig}';
import { cli } from '${options.packageName}';

const compile = async (): Promise<void> => {
  await cli(vevaConfig);
};

export default compile;
module.exports = compile;
`;
