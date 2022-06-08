import webpack, { web } from 'webpack';
import { BaseCompiler, CompilerCallback } from './Base';

export interface WatchOptions {
  aggregateTimeout?: number;
  followSymlinks?: boolean;
  ignored?: string | RegExp | string[];
  poll?: number | boolean;
}

export class Compiler extends BaseCompiler {
  constructor(compiler: webpack.Compiler) {
    super(compiler);
  }

  public watch = (watchOption?: WatchOptions): void => {
    const options: WatchOptions = Object.assign(
      {
        aggregateTimeout: 10,
        poll: 10,
      },
      watchOption || {},
    );
    this.compiler.watch(options, (err, stats) => {
      this.compilerHandler(err, stats);
    });
  }

  private emitStop = () => {
    this.state.stats = null;
    this.state.err = null;
    this.state.progressTime = -1;
    this.state.status = 'stoped';
  }

  public stop = (callback?: CompilerCallback): void => {
    this.compiler.watching.close(() => {
      if (callback) {
        callback(this.state);
      }

      this.emitStop();
    });
  }
}