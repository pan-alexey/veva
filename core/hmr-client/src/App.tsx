import { h, JSX } from "preact";
import { useState, useEffect } from "preact/hooks";
import { processErrors } from '@veva/utils/webpackStats'
import { Types } from "webpack-hmr-server";
import { Navbar } from "./components/Navbar";
import { Panel } from "./components/Panel";
import { processConsole } from "./components/console";

import styles from "./App.module.css";

export const App = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("__webpack_hmr_sever__", (e) => {
      const { detail } = e as unknown as { detail: unknown };
      const event = detail as Types.Event;

      console.log({
        type: 'warnings',
        client: event.state?.client?.warnings,
        server: event.state?.server?.warnings,
      })

      console.log({
        type: 'errors',
        client: event.state?.client?.errors,
        server: event.state?.server?.errors,
      })
  
      const eventError = processErrors({
        client: event.state?.client?.errors,
        server: event.state?.server?.errors,
      });
      const eventWarnings = processErrors({
        client: event.state?.client?.warnings,
        server: event.state?.server?.warnings,
      });

      // setErrors(eventError.items);
      // setWarnings(eventWarnings.items);
      // processConsole(event);

      // if (eventError.items.length > 0 || eventWarnings.items.length > 0) {
      //   setOpen(true);
      // }
    });
  }, []);

  return open && (errors.length > 0 || warnings.length > 0) ? (
    <div className={styles["overlay"]}>
      <div className={styles["overlay-content"]}>
        <Navbar onClose={onClose} errorCount={errors.length}/>
        <div className={styles["container"]}>
          <Panel warnings={warnings} errors={errors} />
        </div>
      </div>
    </div>
  ) : null;
};
