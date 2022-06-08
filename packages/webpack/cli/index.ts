import { cliApp } from '@veva/core-app';
import { processConfig } from '@veva/utils';
import packageJson from '../package.json';

(async () => {
  console.log(`INFO: Starting config compilling...`);
  const appConfig = processConfig.getAppConfigPath();
  await cliApp({
    appConfig,
    packageName: packageJson.name
  })
})()
