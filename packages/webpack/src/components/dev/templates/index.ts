import chalk from 'chalk';
import Handlebars from 'handlebars';
import { getPackageJson,  } from '@veva/utils/nodePackage'
import { getIp } from '@veva/utils/network';

import templateHeader from './common/header.hbs';
import templateFooter from './common/footer.hbs';
import templateProgress from './progress.hbs';
import templateDone from './done.hbs';
import templateStart from './start.hbs';
//---------------------------------------------------------//
Handlebars.registerHelper('chalk', function() {
  const args = Array.prototype.slice.apply(arguments);
  const options = args.pop();
  const chalkFn = args.reduce((result: Record<number, string>, i: number) => {
    return result[i]
  }, chalk);
  return chalkFn(options.fn(this));
});
//---------------------------------------------------------//
// color progressbar
Handlebars.registerHelper('progressbar', function (progress = 0, succes = '#44bb97', fill="#CCCC", length = 50) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += i < (length * progress / 100) ? chalk.bgHex('#44bb97')(' ') : chalk.bgHex(fill)(' ');
  }
  return result;
});
Handlebars.registerHelper('nolinebreaks', function (options) {
  return options.fn(this).replace( /[\r\n]+/gm, "" );
});
Handlebars.registerHelper('isEqual', (value1, value2, options) => {
  return value1 === value2;
});
//---------------------------------------------------------//
Handlebars.registerPartial("header", templateHeader);
Handlebars.registerPartial("footer", templateFooter);
//---------------------------------------------------------//

export const start = () => {
  return Handlebars.compile(templateStart)({});
}

export const progress = (options: {
  packageName: string,
  packageVersion: string,
  progress: number;
  progressStatus: string;
  hot: boolean
}) => {
  return Handlebars.compile(templateProgress)({
    ...{
      appName: (getPackageJson(process.cwd()) as {name: string}).name,
      appVersion: (getPackageJson(process.cwd()) as {version: string}).version,
      nodeVersion: process.versions.node,
      webpackVersion: (getPackageJson('webpack') as {version: string}).version,
    },
    ...options
  });
}

export const done = (options: {
  packageName: string,
  packageVersion: string,
  port: number,
  hot: boolean,
  serverReady: boolean,
  compileStatus: 'success' | 'warning' | 'failed'
}) => {
  return Handlebars.compile(templateDone)({
    ...{
      appName: (getPackageJson(process.cwd()) as {name: string}).name,
      appVersion: (getPackageJson(process.cwd()) as {version: string}).version,
      nodeVersion: process.versions.node,
      webpackVersion: (getPackageJson('webpack') as {version: string}).version,
      ip: getIp(),
    },
    ...options
  });
}