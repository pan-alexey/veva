
import webpack, { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from 'webpack';

import * as Combine from './components/CombineEvents';
import * as Build from './components/Build';
import * as Watch from './components/Watch';

// HotModuleReplacementPlugin
const isExistPluginHMR = (compiler: webpack.Compiler) => {
  return !!compiler.options.plugins.find(
    (plugin) => plugin instanceof HotModuleReplacementPlugin
  );
}

// NoEmitOnErrorsPlugin
const isExistPluginNoEmitOnErrors = (compiler: webpack.Compiler) => {
  return !!compiler.options.plugins.find(
    (plugin) => plugin instanceof NoEmitOnErrorsPlugin
  );
}

const applyNoEmitOnErrorsPlugin = (compiler: webpack.Compiler) => {
  if (!isExistPluginNoEmitOnErrors(compiler)) {
    const plugin = new webpack.NoEmitOnErrorsPlugin();
    plugin.apply(compiler);
  }
}

const applyPluginHMR = (compiler: webpack.Compiler) => {
  if (!isExistPluginHMR(compiler)) {
    // Apply the HMR plugin
    const plugin = new webpack.HotModuleReplacementPlugin();
    plugin.apply(compiler);
  }
}

const applyAdditionalEntries = (compiler: webpack.Compiler, entries: Array<string>): void => {
  entries.forEach(entry => {
    new webpack.EntryPlugin(compiler.context, entry, {
      name: undefined,
    }).apply(compiler);
  })
}


const buildFactory = (webpackCompiler: Record<string, webpack.Compiler>) => {
  const compilers: Record<string, Build.Compiler> = {}

  Object.keys(webpackCompiler).forEach(key => {
    compilers[key] = new Build.Compiler(webpackCompiler[key]);
  })
  const combineEvents = new Combine.CombineEvents(compilers)

  const run = () => {
    Object.keys(compilers).forEach(key => {
      compilers[key].run()
    })
  }

  return {
    compilers,
    combineEvents,
    run
  }
}

const watchFactory = (webpackCompiler: Record<string, webpack.Compiler>, watchOptions?: Watch.WatchOptions) => {
  const compilers: Record<string, Watch.Compiler> = {}

  Object.keys(webpackCompiler).forEach(key => {
    compilers[key] = new Watch.Compiler(webpackCompiler[key]);
  })
  const combineEvents = new Combine.CombineEvents(compilers)

  const run = () => {
    Object.keys(compilers).forEach(key => {
      compilers[key].watch(watchOptions)
    })
  }

  const stop = () => {
    Object.keys(compilers).forEach(key => {
      compilers[key].stop()
    })
  }

  return {
    getState: combineEvents.getState,
    on: combineEvents.on,
    run,
    stop,
  }
}

export const groupErrors = () => {}

export {
  // helpers
  isExistPluginNoEmitOnErrors,
  isExistPluginHMR,
  // apply
  applyPluginHMR,
  applyAdditionalEntries,
  applyNoEmitOnErrorsPlugin,
  // Compiller class
  Combine,
  Build,
  Watch,
  // Factory
  buildFactory,
  watchFactory,
}