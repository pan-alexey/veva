import type webpack from 'webpack';
import { uniqString } from './helpers'

export interface MapError {
  [title: string]: {
    message: string;
  }
}

export interface ErrorOptions {
  client?: Array<webpack.StatsError>
  server?: Array<webpack.StatsError>
}

export interface ResultItems {
  title: string,
  message: {
    client?: string,
    server?: string,
  }
}

export interface Result {
  types: Array<keyof ErrorOptions>
  items: Array<ResultItems>
}

const getTitle = (error: webpack.StatsError): string => {
  const moduleName = error.moduleName || error.file; 
  if (moduleName) {
    const loc = error.loc? `(${error.loc })` : '';
    return `${moduleName}${loc}`;
  }
  return error.message.split('\n')[0];
}

const convertStatsError = (statErrors: Array<webpack.StatsError>): MapError => {
  const result: MapError = {};
  for (let i = 0; i < statErrors.length; i++) {
    const error = statErrors[i];
    const title = getTitle(error);
    result[title] = {
      message: error.message,
    }
  }
  return result;
}

export const processErrors = (options: ErrorOptions): Result => {
  const client = options.client || [];
  const server = options.server || [];

  const clientItems = convertStatsError(options.client || []);
  const serverItems = convertStatsError(options.server || []);

  // For sorting
  const allKeys: Array<string> = uniqString([...Object.keys(clientItems), ...Object.keys(serverItems)]) ;
  const commonKeys = [];
  const clientOnlyKeys = [];
  const serverOnlyKeys = [];
  for (let i = 0; i < allKeys.length; i++) {
    const key = allKeys[i];
    if (clientItems[key] || serverItems[key]) {
      commonKeys.push(key);
    }
    else if (clientItems[key]) {
      clientOnlyKeys.push(key);
    }
    else if (serverItems[key]) {
      serverOnlyKeys.push(key);
    }
  }

  // make itens
  const items: Array<ResultItems> = [];
  [...commonKeys, ...clientOnlyKeys, ...serverOnlyKeys].forEach((key) => {
    items.push({
      title: key,
      message: {
        client: clientItems[key]?.message,
        server: serverItems[key]?.message,
      }
    });
  })

  // make types
  const types: Array<keyof ErrorOptions> = []
  if (client.length > 0) {
    types.push('client');
  }
  if (server.length > 0) {
    types.push('server');
  }

  const result: Result = {
    types,
    items,
  }
  return result;
}
