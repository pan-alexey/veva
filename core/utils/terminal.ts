import { getIps } from './neworks';

// EXAMPLE []
// ----------------------------------
// Application:
//   server[xxxxxxxxxxxxx]
//   client[xxxxxxxxxxxxx];

// Debug:
//   server[xxxxxxxxxxxxx]
//   client[xxxxxxxxxxxxx];

// Debug server:
//   http://127.0.0.1:8080
//   http://192.168.1.1:8080
// ----------------------------------

export class Terminal {
  private ips: Array<string>;
  private debugPort: string;

  constructor() {
    this.ips = getIps();
  }

  public debug(port?: string): void {
    if (port) {
      this.debugPort = port;
    }
  }


  compile('name')
}
