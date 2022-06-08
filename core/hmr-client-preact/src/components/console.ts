import type { Types } from "webpack-hmr-server";

const HEX = {
  red: '#c62828',
  blue: '#1976d2',
  green: '#00695c',
  grey: '#546e7a',
}

const colorConsole = (message: string, color: keyof typeof HEX, group = false) => {
  const fn = group ? console.groupCollapsed : console.log;
  fn(
    `%c VEVA %c ${message} `,
    "background: #1565c0; color: white; border-radius: 2px 0 0 2px",
    `background: ${HEX[color]}; color: white; border-radius: 0 2px 2px 0`,
  );
}

let status: "connnect" | "disconect" | null = null;
export const processConsole = (event: Types.Event) => {
  if (status !== "connnect" && ["init", "check"].includes(event.action)) {
    status = "connnect";
    colorConsole('Connected', 'green')

    if (event.state?.client?.errors?.length || event.state?.server?.errors?.length) {
      colorConsole('Build with error', 'red')
    }
    return;
  }
  if (status !== "disconect" && event.action === "disconect") {
    status = "disconect";
    colorConsole('Disconect', 'red')
    return;
  }

  if (event.message === 'Build with error') {
    colorConsole('Build with error', 'red')
    return
  }

  if (event.message === 'Modules updated') {
    colorConsole('Modules updated', 'grey', true);
    event.modules.forEach(moduleId => {
      console.log(moduleId)
    })
    console.groupEnd()
    return
  }
};
