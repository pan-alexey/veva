import { networkInterfaces } from 'os';

export const getIp = (): string | null => {
  const interfaces = networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    // Unlikely that the interface will be null
    /* istanbul ignore next */
    if (!iface) {
      return null;
    }
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) return alias.address;
    }
  }
  return null;
};
