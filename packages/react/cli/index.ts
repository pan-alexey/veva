import { cliApp } from '@veva/core-app';
import config from '@veva/utils/processConfig';
import packageJson from '../package.json';

(async () => {
  console.log(`INFO: Starting config compilling...`);
  const appConfig = config.getAppConfigPath();
  await cliApp({
    appConfig,
    packageName: packageJson.name
  })
})()
