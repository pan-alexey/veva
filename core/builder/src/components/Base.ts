import webpack from 'webpack';

export type CompilingStatus = 'created' | 'stoped' | 'start' | 'compiling' | 'building' | 'emit' | 'done';
export type CompilerEvents = 'start' | 'progress' | 'done';

export interface CompilerState {
  status: CompilingStatus;
  progress: number;
  stats: webpack.Stats | null;
  err: Error | null;
  progressTime: number;
}

export type CompilerCallback = (state: CompilerState) => void;

export class BaseCompiler {
  protected compiler: webpack.Compiler;
  private callbacks: {
    [name in CompilerEvents]: Array<CompilerCallback>;
  } = {
    start: [],
    progress: [],
    done: [],
  };

  protected state: CompilerState = {
    progress: -1,
    status: 'created',
    stats: null,
    err: null,
    progressTime: -1,
  };

  constructor(compiler: webpack.Compiler) {
    this.compiler = compiler;
    this.progressHooks();
  }

  protected compilerHandler = (err?: Error | null, stats?: webpack.Stats): void => {
    this.state.stats = stats || null;
    this.state.err = err || null;

    this.emitDone();
  };

  private progressHooks = () => {
    let startTime = new Date().getTime();
    let step = 0;
    const compiler = this.compiler;

    return new webpack.ProgressPlugin((progress) => {
      // update progress
      this.state.progress = Math.round(progress * 100);

      if (step === 0) {
        this.state.stats = null;
        this.state.err = null;
        this.state.progressTime = -1;
        this.state.status = 'start';

        startTime = new Date().getTime();
        this.emitStart();
      }

      // STEP 1: COMPILATION
      if (progress >= 0 && progress < 0.1) {
        // Skip if we jumped back a step, else update the step counter
        if (step > 1) {
          return;
        }
        step = 1;
        this.state.status = 'compiling';
        this.emitProgress();
      }
      // STEP 2: BUILDING
      if (progress >= 0.1 && progress <= 0.7) {
        if (step > 2) {
          return;
        }
        step = 2;
        this.state.status = 'building';
      }

      if (progress >= 0.95 && progress < 1) {
        step = 4;
        this.state.status = 'emit';
        this.emitProgress();
      }

      if (progress === 1) {
        this.state.status = 'done';
        const finishTime = new Date().getTime();
        this.state.progressTime = (finishTime - startTime) / 1000;
        this.emitDone();
        step = 0;
      }
    }).apply(compiler);
  }

  private emitStart = () => {
    this.callbacks.start.forEach((fn) => fn(this.state));
  }

  private emitProgress = () => {
    this.callbacks.progress.forEach((fn) => fn(this.state));
  }

  private emitDone = () => {
    if ((this.state.stats || this.state.err) && this.state.status === 'done') {
      this.callbacks.done.forEach((fn) => fn(this.state));
    }
  }

  public inProgress = (): boolean => {
    switch (this.state.status) {
      case 'start':
      case 'compiling':
      case 'building':
      case 'emit':
        return true
      default:
        return false;
    }
  }

  public getState = (): CompilerState => {
    return this.state;
  }

  public on = (event: CompilerEvents, callback: CompilerCallback) => {
    this.callbacks[event].push(callback);
    return this;
  }
}
