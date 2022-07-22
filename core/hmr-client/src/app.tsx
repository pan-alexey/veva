import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from "preact/hooks";
import styles from './styles.css';
import { Navbar } from './app/navbar';
import { Content } from './app/content';
import { cssClassName } from '~/utils';

import type { Types } from "webpack-hmr-server";
import appConsole from '~/app/console';
import { processErrors, Items } from '@veva/utils/webpackHmrStats'

interface InitState {
  errors: Items[],
  warnings: Items[]
}

// Use init state for testing
const App: FunctionalComponent<{ initState?: InitState}> = ({ initState = { errors: [], warnings: [] } } ) => {
    const [open, setOpen] = useState(true);
    const [state, setState] = useState<InitState>(initState);

    const onClose = () => {
      setOpen(false)
    }

    useEffect(() => {
        document.addEventListener("__webpack_hmr_sever__", (e) => {
          const { detail } = e as unknown as { detail: unknown };

          const event = detail as Types.Event;
          appConsole(event);
        
          const errors = processErrors({
            client: event.state?.client?.errors || [],
            server: event.state?.server?.errors || [],
          })
        
          const warnings = processErrors({
            client: event.state?.client?.warnings || [],
            server: event.state?.server?.warnings || [],
          })

          setState({ errors, warnings })
        });
    }, []);

    return open && state.errors.length > 0 ? (
        <div className={cssClassName(styles, ['overlay'])}>
            <Navbar onClose={onClose}/>
            <div className={cssClassName(styles, ['content'])}>
                <Content state={state}/>
            </div>
        </div>
    ) : null;
};

export default App;
