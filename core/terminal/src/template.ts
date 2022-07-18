import chalk from 'chalk';
import Handlebars from 'handlebars';

// not use global instance
const render = Handlebars.create()

render.registerHelper('chalk', function() {
  const args = Array.prototype.slice.apply(arguments);
  const options = args.pop();
  const chalkFn = args.reduce((result: Record<number, string>, i: number) => {
    return result[i]
  }, chalk);
  return chalkFn(options.fn(this));
});

render.registerHelper('progressbar', function (progress = 0, succes = '#44bb97', fill="#CCCC", length = 50) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += i < (length * progress / 100) ? chalk.bgHex('#44bb97')(' ') : chalk.bgHex(fill)(' ');
  }
  return result;
});

render.registerHelper('nolinebreaks', function (options) {
  return options.fn(this).replace( /[\r\n]+/gm, "" );
});

render.registerHelper('isEqual', (value1, value2, options) => {
  return value1 === value2;
});

// frame
const toFrame = (template: string): string => {
  return '';
}