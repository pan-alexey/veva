import { stdout } from "process";
import type { Types } from "webpack-hmr-server";

const HEX = {
  red: '#c62828',
  blue: '#1976d2',
  green: '#00695c',
  grey: '#546e7a',
}

type Color = keyof typeof HEX;

export class ConsoleEngine {
  private groupLevel = 0;
  private groupStartCallback: (...args: Array<string|number>) => void;
  private groupEndCallback: () => void;
  private consoleCallback: (...args: Array<string|number>) => void;

  constructor({consoleCallback, groupStartCallback, groupEndCallback}: {
    groupStartCallback: (...args: Array<string|number>) => void;
    consoleCallback: (...args: Array<string|number>) => void;
    groupEndCallback: () => void;
  }) {
    this.groupStartCallback = groupStartCallback;
    this.groupEndCallback = groupEndCallback;
    this.consoleCallback = consoleCallback
  }

  public colorOut = (message: string, color: Color) => {
    this.consoleCallback(
      `%c VEVA %c ${message} `,
      "background: #1565c0; color: white; border-radius: 2px 0 0 2px",
      `background: ${HEX[color]}; color: white; border-radius: 0 2px 2px 0`,
    );
  }

  public out = (...args: Array<string|number>) => {
    this.consoleCallback(...args);
  }

  public groupStart = (message: string, color: Color) => {
    this.groupLevel++;
    this.groupStartCallback(
      `%c VEVA %c ${message} `,
      "background: #1565c0; color: white; border-radius: 2px 0 0 2px",
      `background: ${HEX[color]}; color: white; border-radius: 0 2px 2px 0`,
    );

  }

  public groupEnd = (endAll = false) => {
    if (!endAll) {
      this.groupEndCallback()
      this.groupLevel--;
      return;
    }

    for (let i = 0; i < this.groupLevel; i++) {
      this.groupEndCallback()
    }
    this.groupLevel = 0;
  }
}

export const eventConsole = function (consoleEngine: ConsoleEngine) {
  let status: "connnect" | "disconect" | null = null;
  return (event: Types.Event) => {
    if (status !== "connnect" && ["init", "check"].includes(event.action)) {
      status = "connnect";
      consoleEngine.colorOut('Connected', 'green')
  
      if (event.state?.client?.errors?.length || event.state?.server?.errors?.length) {
        consoleEngine.colorOut('Build with error', 'red')
      }
      return;
    }

    if (status !== "disconect" && event.action === "disconect") {
      status = "disconect";
      consoleEngine.colorOut('Disconect', 'red')
      return;
    }

    if (event.message === 'Build with error') {
      consoleEngine.colorOut('Build with error', 'red')
      return
    }

    if (event.message === 'Modules updated') {
      consoleEngine.groupStart('Modules updated', 'grey');
      event.modules?.forEach(moduleId => {
        consoleEngine.out(moduleId)
      })
      consoleEngine.groupEnd(true)
      return
    }

  }
}

export default eventConsole(new ConsoleEngine({
  groupStartCallback: console.groupCollapsed,
  consoleCallback: console.log,
  groupEndCallback: console.groupEnd,
}));
