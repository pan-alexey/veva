import { CompilerEvents, CompilerState } from './Base';
import * as Build from './Build';
import * as Watch from './Watch';

export interface Compilers {
  [name: string]: Build.Compiler | Watch.Compiler;
}

export interface CombaineState {
  [name: string]: CompilerState;
}

export type CombineCallback = (state: CombaineState) => void;

export class CombineEvents {
  private status: 'created' | 'progress' | 'done' = 'created';

  protected compilers: Compilers = {};

  private callbacks: {
    [name in CompilerEvents]: Array<CombineCallback>;
  } = {
    start: [],
    progress: [],
    done: [],
  };

  constructor(compilers: Compilers) {
    this.compilers = compilers
    this.register();
  }

  public getStatus = (): 'created' | 'progress' | 'done' => {
    return this.status;
  }

  public getState = (): CombaineState => {
    const state: CombaineState = {};
  
    Object.keys(this.compilers).forEach((name) => {
      state[name] = this.compilers[name].getState();
    });

    return state;
  }

  public on = (event: CompilerEvents, callback: CombineCallback) => {
    this.callbacks[event].push(callback);
    return this;
  }

  private register = (): void => {
    Object.keys(this.compilers).forEach(name => {
      const compiler = this.compilers[name];
      compiler
        .on('start', this.processEvent)
        .on('progress', this.processEvent)
        .on('done', this.processEvent)
    })
  }

  private processEvent = () => {
    const state = this.getState()
    let statuses = Object.keys(state).map((name) => {
      return state[name].status;
    });

    statuses = statuses.filter(status => status !=='created' && status !=='stoped')

    if (statuses.length === 0) {
      // all compilers stoped or dont run
      this.status = 'done';
      this.emit('done');
      return;
    }

    const withoutDone = statuses.filter(status => status !== 'done');
    if (withoutDone.length === 0) {
      // all compilers is done
      this.status = 'done';
      this.emit('done');
      return;
    }

    if (this.status !== 'progress') {
      this.emit('start');
      return;
    }

    this.status = 'progress';
    this.emit('progress');
  }

  private emit = (event: CompilerEvents): void => {
    this.callbacks[event].forEach((callback) => {
      callback(this.getState())
    })
  }
}