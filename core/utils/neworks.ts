import os from 'os';

export const getIps = (): Array<string> => {
  const ips: Array<string> = ['127.0.0.1'];

  const inrefaces = os.networkInterfaces() || [];

  for (const name in inrefaces) {
    const network = inrefaces[name];
    if (!network) continue;

    network.forEach((e) => {
      const { family, internal, address } = e;
      if (family === 'IPv4' && !internal) {
        ips.push(address);
      }
    });
  }

  return ips;
};
