import ips from '../helpers/networks';

/*
------------------------------------
Server: [xxxxxxxxxx] | [xxxxxxxxxx]
Debug: [xxxxxxxxxx] | [xxxxxxxxxx]

Debug was start:
http://127.0.0.1:8080;
http://192.168.100.255:8080;
------------------------------------
Try start server:
*/

class Terminal {
  //
  constructor(names:Array<string>) {
  }

  public start(name:string) {}
  public error(name:string) {}
  public success(name: string, hash: string) {}

  public server(port: string) {
    // ips
  }

  private clear() {
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
  }
  private output() {}
}