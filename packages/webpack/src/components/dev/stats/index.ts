import { processErrors } from '@veva/utils/webpackStats';
import { terminal } from '@veva/utils';
import webpack from 'webpack';
import chalk from 'chalk';

export default (errors: Array<webpack.StatsError>, type: 'errors' | 'warnings') => {
  console.log(errors)
  // const { items } = processErrors({
  //   client: errors,
  // });
  // const result = items.reverse();
  // const lable = type === 'errors' ? chalk.bgRed.white(' ERROR: ') : chalk.bgYellow.black(' WARNINGS: ');

  // result.forEach(item => {
  //   console.log(lable);
  //   console.log(item.title);
  //   // console.log(item.message.client);
  //   terminal.breakLine()
  // })
}