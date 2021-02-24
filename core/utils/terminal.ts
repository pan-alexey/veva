import { getIps } from './neworks';

// EXAMPLE []
// ----------------------------------
// Debug:
//   render[xxxxxxxxxxxxx]
//   client[xxxxxxxxxxxxx];

// Debug server:
//   http://127.0.0.1:8080
//   http://192.168.1.1:8080
// ----------------------------------
// Application:
//   render[xxxxxxxxxxxxx]
//   client[xxxxxxxxxxxxx];
// ----------------------------------

export class Terminal {
  private ips: Array<string>;
  private debugPort: string;

  constructor() {
    this.ips = getIps();
  }

  errorsMrge(){};

  public debug(port?: string): void {
    if (port) {
      this.debugPort = port;
    }
  }

  start(name: string, part: string):void {
  }

  progress(name: string, part: string):void {
  }

  sucess(name: string, part: string, hash:string):void {
  }

  error(name: string, part: string, hash:string):void {
  }
}
