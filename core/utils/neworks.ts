import os from 'os';

class Network {
  private ips: Array<string> = [];

  constructor() {
    const inrefaces = os.networkInterfaces() || [];

    for (const name in inrefaces) {
      const network = inrefaces[name];
      if (!network) continue;

      network.forEach((e)=>{
        const { family, internal, address } = e;
        if (family === 'IPv4' && !internal) {
          this.ips.push(address);
        }
      });
    }
  }

  public get(): Array<string> {
    return this.ips;
  }
}

export default Network;
