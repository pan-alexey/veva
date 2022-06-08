import webpack from 'webpack';
import { BaseCompiler } from './Base';

export class Compiler extends BaseCompiler {
  constructor(compiler: webpack.Compiler) {
    super(compiler);
  }

  public run = (): void => {
    this.compiler.run((err, stats) => {
      this.compilerHandler(err, stats)
    });
  }
}