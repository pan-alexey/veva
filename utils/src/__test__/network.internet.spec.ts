import * as network from '../network';

jest.mock('os', () => {
  return {
    networkInterfaces() {
      return {
        en0: [
          {
            address: '192.168.0.100',
            netmask: '255.255.255.0',
            family: 'IPv4',
            mac: 'f4:d4:88:5c:ca:ba',
            internal: false,
            cidr: '192.168.0.105/24',
          },
          {
            address: 'fe80::14e8:2486:4c85:9a8c',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: 'f4:d4:88:5c:ca:ba',
            internal: false,
            cidr: 'fe80::14e8:2486:4c85:9a8c/64',
            scopeid: 14,
          },
        ],
      }
    },
  };
});

describe('network.eth', () => {
  it('ethernet', async () => {
    expect(network.getIp()).toEqual('192.168.0.100');
  });
});
