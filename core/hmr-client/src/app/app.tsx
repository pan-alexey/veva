import { FunctionalComponent, h } from 'preact';
import { useState } from "preact/hooks";
import style from './styles/app.css';
import { Navbar } from '../components/navbar';
import { cssClassName } from '~/utils';

const App: FunctionalComponent = () => {
    const [open, setOpen] = useState(true);
    const onClose = () => {
        setOpen(false)
    }
    return open ? (
        <div className={style.overlay}>
            <Navbar onClose={onClose}/>
            <div className={cssClassName(style, ['navbar'])}></div>
        </div>
    ) : null;
};

export default App;
