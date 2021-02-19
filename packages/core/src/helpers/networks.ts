import * as os from 'os';
const ifaces = os.networkInterfaces();

export default Object.keys(ifaces).reduce((ips, ifname) => {
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return ips;
    }

    ips.push(iface.address);
    return ips
  });
}, ['127.0.0.1']);