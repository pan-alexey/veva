export default (options: {
  appConfig: string,
  packageName: string,
}) => `
// @ts-ignore
import vevaConfig from '${options.appConfig}';
import { cli } from '${options.packageName}';

const compile = async (): Promise<void> => {
  await cli(vevaConfig);
};

export default compile;
module.exports = compile;
`;
