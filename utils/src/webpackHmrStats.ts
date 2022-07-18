import type { Types } from 'webpack-hmr-server';

export interface ErrorOptions {
  client?: Array<Types.DataStatsError>;
  server?: Array<Types.DataStatsError>;
}

export interface Items {
  key: string;
  name: string;
  message: string;
  isServer: boolean;
  isClinet: boolean;
}

export const processErrors = (options: ErrorOptions) => {
  const server = options.server || [];
  const client = options.client || [];

  const itemMap: Record<
    string,
    {
      name: string;
      message: string;
      isServer?: boolean;
      isClinet?: boolean;
    }
  > = {};

  server.forEach((dataError) => {
    itemMap[dataError._hash_] = Object.assign(itemMap[dataError._hash_] || {}, {
      name: dataError._name_,
      message: dataError.message,
      isServer: true,
    });
  });

  client.forEach((dataError) => {
    itemMap[dataError._hash_] = Object.assign(itemMap[dataError._hash_] || {}, {
      name: dataError._name_,
      message: dataError.message,
      isClinet: true,
    });
  });

  const multiItems: Array<Items> = [];
  const serverItems: Array<Items> = [];
  const clientItems: Array<Items> = [];

  Object.keys(itemMap).forEach((key) => {
    const item = itemMap[key];
    if (item.isClinet && item.isServer) {
      multiItems.push({ ...item, key, isServer: true, isClinet: true });
    } else if (item.isServer) {
      serverItems.push({ ...item, key, isServer: true, isClinet: false });
    } else if (item.isClinet) {
      clientItems.push({ ...item, key, isServer: false, isClinet: true });
    }
  });

  return [...multiItems, ...serverItems, ...clientItems];
};
