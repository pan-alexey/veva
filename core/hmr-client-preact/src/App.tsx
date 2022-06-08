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

      const eventError = processErrors({
        client: event.state?.client?.errors,
        server: event.state?.server?.errors,
      });
      const eventWarnings = processErrors({
        client: event.state?.client?.warnings,
        server: event.state?.server?.warnings,
      });

      if (eventError.items.length) {
        setOpen(true);
      }
      setErrors(eventError.items);
      setWarnings(eventWarnings.items);
      processConsole(event);
    });
  }, []);

  return open && errors.length > 0 ? (
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
